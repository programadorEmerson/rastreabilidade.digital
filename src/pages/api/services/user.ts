import { NextApiRequest } from 'next';

import { User } from '@pages/api/models/user';

export class ServiceUser {
  createNewUser = async (req: NextApiRequest) => {
    const user = new User(req.body);
    return { status: 200, response: await user.newUser(req) };
  };

  signin = async (req: NextApiRequest) => {
    const user = new User(req.body);
    return { status: 200, response: await user.login(req) };
  };

  checkEmail = async (req: NextApiRequest) => {
    const { email } = req.query as { email: string };
    const user = new User({ email });
    return { status: 200, response: await user.checkEmail() };
  };

  getUserById = async (_id: string) => {
    const user = new User({ _id });
    return { status: 200, response: await user.getUserById(user._id) };
  };
}
