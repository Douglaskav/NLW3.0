import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import crypto from 'crypto';
import sendEmail from '../middlewares/sendEmail';

export default {
  async sendEmail(req: Request, res: Response) {
    const { email } = req.body;
    
    try {
      const user = await getRepository(User).findOne({ email });

      if (!user) return res.status(400).send({ error: 'User not found' });

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      user.passwordResetToken = token;
      user.passwordResetExpires = now;

      await getRepository(User).save(user);
      await sendEmail({ email, token });

      return res.json({ message: `Ok, email send to ${email}` })
    } catch (error) {
      console.error(error);
    }
  },

  async changePassword(req: Request, res: Response) {
    const { email, token, password } = req.body;

    const user = await getRepository(User).findOne({ email });

    console.log(user);
    if (!user) return res.status(400).send({ error: 'User not found' });

    if (token !== user.passwordResetToken) return res.status(400).send({ error: 'Token invalid'  });

    const now = new Date();

    if (now > user.passwordResetExpires) return res.status(400).send({ error: 'Cannot reset password, try again' });

    user.password = password;

    await getRepository(User).save(user);

    return res.status(400).json({ message: 'Ok', token, password, user });
  }
}
