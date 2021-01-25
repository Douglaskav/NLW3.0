import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User'

export default {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await getRepository(User).findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'Esse email não existe.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: 'A senha não está correta.' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 83999 });

    return res.json({
      user,
      token
    })
  },

  async logout(req: Request, res: Response) {
    req.userId = '';
    return res.redirect('/app')
  }
}
