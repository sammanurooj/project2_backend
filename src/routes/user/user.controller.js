import express from 'express';
import models from '../../models';

import { STATUS_CODES } from '../../utils/constants';
import { BadRequestError, SuccessResponse } from '../../utils/helper';

const { ProjectTable } = models;
class UserController {
  static router;

  static getRouter() {
    this.router = express.Router();
    this.router.get('/projecttable', this.list);
    this.router.get('/:id', this.getUserById);
    return this.router;
  }

  static async list(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 10;

      const offset = (page - 1) * pageSize;

      const { rows: users, count } = await ProjectTable.findAndCountAll({
        limit: pageSize,
        offset,
      });

      const totalPages = Math.ceil(count / pageSize);

      return SuccessResponse(res, {
        page,
        pageSize,
        totalPages,
        totalCount: count,
        users,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getUserById(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id) {
        BadRequestError(`User id is required`, STATUS_CODES.INVALID_INPUT);
      }

      const user = await ProjectTable.findOne({ where: { id } });
      UserController.generatePreSignedUrl([user]);
      return SuccessResponse(res, user);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
