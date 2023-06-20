import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../../models';

import { STATUS_CODES } from '../../utils/constants';
import { BadRequestError, SuccessResponse } from '../../utils/helper';

const { User, UserLocation } = models;

class UserController {
  static router;

  static getRouter() {
    this.router = express.Router();
    this.router.post('/signup', this.signup);
    this.router.post('/signin', this.signin);

    this.router.get('/applicationusers', this.list);
    this.router.get('/:id', this.getUserById);

    return this.router;
  }

  static async list(req, res, next) {
    try {
      const users = await User.findAndCountAll({});
      return SuccessResponse(res, {
        users,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getUserById(req, res, next) {
    const id = parseInt(req.params.id, 10);
    try {
      if (!id) {
        return BadRequestError(res, new Error(`User id is required`), STATUS_CODES.INVALID_INPUT);
      }

      const user = await User.findOne({
        where: { id },
        include: [{ model: UserLocation, as: 'userLocations' }],
      });

      if (!user) {
        return BadRequestError(
          res,
          new Error(`User with id ${id} not found`),
          STATUS_CODES.NOT_FOUND
        );
      }

      return SuccessResponse(res, user);
    } catch (e) {
      next(e);
    }
  }

  static async signin(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        BadRequestError(new Error(`Email and password are required`), STATUS_CODES.INVALID_INPUT);
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error(`Invalid email or password`);
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new Error(`Invalid email or password`);
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        'fsgekjiuyuhuh123345'
      );

      return SuccessResponse(res, { token, userId: user.id });
    } catch (e) {
      next(e);
    }
  }

  static async signup(req, res, next) {
    const { name, email, password, role, locationId } = req.body;

    try {
      if (!name || !email || !password || !role || !locationId) {
        return BadRequestError(
          `Name, email, and password are required`,
          STATUS_CODES.INVALID_INPUT
        );
      }

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        throw new Error(`User with email '${email}' already exists`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        locationId,
      });

      return SuccessResponse(res, { user });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
