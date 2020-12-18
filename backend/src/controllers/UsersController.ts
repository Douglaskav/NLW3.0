import { Request, Response } from 'express';
import User from '../models/User';
import * as Yup from 'yup';
import { getRepository } from 'typeorm';

export default {
  async index(req: Request, res: Response) {
    return res.json(req.userId);
  },

  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const data = { username, email, password };

    const userRepository = getRepository(User)

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required()
    })

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = userRepository.create(data); 

    await userRepository.save(user);

    return res.status(201).json(user);
  }
}
