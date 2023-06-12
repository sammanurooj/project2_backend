import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import models from '../../models';
import { STATUS_CODES } from '../../utils/constants';
import { BadRequestError, SuccessResponse } from '../../utils/helper';

require('dotenv').config();

const { textsummarie } = models;
class UserController {
  static router;

  static getRouter() {
    this.router = express.Router();
    this.router.post('/addtext', this.UserText);
    return this.router;
  }

  static async UserText(req, res, next) {
    const { userText } = req.body;

    try {
      if (!userText) {
        BadRequestError(new Error(`Text is required`), STATUS_CODES.INVALID_INPUT);
      }

      // // Save the user text in the database
      // await textsummarie.create({
      //   userText,
      // });

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      // Summarize text
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Summarize this for a second-grade student:\n\n${userText}`,
        temperature: 1,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      if (response.data.choices && response.data.choices.length > 0) {
        const summaryText = response.data.choices[0].text.trim();

        const summary = await textsummarie.create({
          userText,
          SummerizeText: summaryText,
        });

        return SuccessResponse(res, summary);
      }
      throw new Error('Failed to generate text summary');
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
