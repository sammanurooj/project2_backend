import express from 'express';

import models from '../../models';

import { STATUS_CODES } from '../../utils/constants';
import { BadRequestError, SuccessResponse } from '../../utils/helper';

const { UserLocation } = models;

class UserController {
  static router;

  static getRouter() {
    this.router = express.Router();
    this.router.delete('/delete/:id', this.deleteLocationById);
    this.router.put('/update/:id', this.updateLocationById);
    this.router.post('/addLocation', this.createLocation);
    this.router.get('/userlocations', this.locationlist);
    this.router.get('/:id', this.getUserlocationById);

    return this.router;
  }

  static async locationlist(req, res, next) {
    try {
      const users = await UserLocation.findAndCountAll({});
      return SuccessResponse(res, {
        users,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getUserlocationById(req, res, next) {
    const id = parseInt(req.params.id, 10);
    try {
      if (!id) {
        return BadRequestError(res, new Error(`id is required`), STATUS_CODES.INVALID_INPUT);
      }

      const user = await UserLocation.findOne({ where: { id } });

      if (!user) {
        return BadRequestError(
          res,
          new Error(`location with id ${id} not found`),
          STATUS_CODES.NOT_FOUND
        );
      }

      return SuccessResponse(res, user);
    } catch (e) {
      next(e);
    }
  }

  static async createLocation(req, res, next) {
    const { location } = req.body;
    try {
      if (!location) {
        BadRequestError(new Error(`please enter data`), STATUS_CODES.INVALID_INPUT);
      }

      const userlocation = await UserLocation.create({ location });

      return SuccessResponse(res, { userlocation });
    } catch (e) {
      next(e);
    }
  }

  static async deleteLocationById(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id) {
        BadRequestError(new Error(` id is required`), STATUS_CODES.INVALID_INPUT);
      }

      await UserLocation.destroy({ where: { id } });

      return SuccessResponse(res, { message: `location with id ${id} deleted successfully.` });
    } catch (e) {
      next(e);
    }
  }

  static async updateLocationById(req, res, next) {
    const {
      params: { id },
      body: { location },
    } = req;

    try {
      if (!id) {
        BadRequestError(new Error(`User id is required`), STATUS_CODES.INVALID_INPUT);
      }

      const userlocation = await UserLocation.findOne({ where: { id } });

      if (!userlocation) {
        BadRequestError(new Error(`location with id ${id} not found`), STATUS_CODES.NOT_FOUND);
      }

      await userlocation.update({ location });

      return SuccessResponse(res, { message: `location with id ${id} updated successfully.` });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
