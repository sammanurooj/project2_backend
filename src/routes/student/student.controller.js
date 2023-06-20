import express from 'express';

import models from '../../models';

import { STATUS_CODES } from '../../utils/constants';
import { BadRequestError, SuccessResponse } from '../../utils/helper';

const { Student } = models;

class UserController {
  static router;

  static getRouter() {
    this.router = express.Router();
    this.router.delete('/delete/:id', this.deleteStudentById);
    this.router.put('/update/:id', this.updateStudentById);
    this.router.post('/addStudent', this.createStudent);
    this.router.get('/students', this.studentList);
    this.router.get('/:id', this.getStudentById);

    return this.router;
  }

  static async studentList(req, res, next) {
    try {
      const users = await Student.findAndCountAll({});
      return SuccessResponse(res, {
        users,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getStudentById(req, res, next) {
    const id = parseInt(req.params.id, 10);
    try {
      if (!id) {
        return BadRequestError(res, new Error(`id is required`), STATUS_CODES.INVALID_INPUT);
      }

      const user = await Student.findOne({ where: { id } });

      if (!user) {
        return BadRequestError(
          res,
          new Error(`student with id ${id} not found`),
          STATUS_CODES.NOT_FOUND
        );
      }

      return SuccessResponse(res, user);
    } catch (e) {
      next(e);
    }
  }

  static async createStudent(req, res, next) {
    const { studentName } = req.body;

    try {
      if (!studentName) {
        BadRequestError(new Error(`please enter data`), STATUS_CODES.INVALID_INPUT);
      }

      const Studentdata = await Student.create({ studentName });

      return SuccessResponse(res, { Studentdata });
    } catch (e) {
      next(e);
    }
  }

  static async deleteStudentById(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id) {
        BadRequestError(new Error(` id is required`), STATUS_CODES.INVALID_INPUT);
      }

      await Student.destroy({ where: { id } });

      return SuccessResponse(res, { message: `student with id ${id} deleted successfully.` });
    } catch (e) {
      next(e);
    }
  }

  static async updateStudentById(req, res, next) {
    const {
      params: { id },
      body: { studentName },
    } = req;

    try {
      if (!id) {
        BadRequestError(new Error(`User id is required`), STATUS_CODES.INVALID_INPUT);
      }

      const userlocation = await Student.findOne({ where: { id } });

      if (!userlocation) {
        BadRequestError(new Error(`student with id ${id} not found`), STATUS_CODES.NOT_FOUND);
      }

      await userlocation.update({ studentName });

      return SuccessResponse(res, { message: `student with id ${id} updated successfully.` });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
