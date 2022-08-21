import { NextApiRequest, NextApiResponse } from 'next';

import { ServiceUser } from '@pages/api/services/user';

import { errorEnum } from '@enums/enum.errors';

export class ControllerUser {
  private serviceUser = new ServiceUser();

  createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { status, response } = await this.serviceUser.createNewUser(req);
    res.status(status).json({ response });
  };

  signIn = async (req: NextApiRequest, res: NextApiResponse) => {
    const { status, response } = await this.serviceUser.signin(req);
    res.status(status).json({ response });
  };

  checkEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    const { status } = await this.serviceUser.checkEmail(req);
    res.status(status).json({ message: errorEnum.EMAIL_IS_AVAILABLE });
  };

  me = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idToken } = req.query as { idToken: string };
    const { status, response } = await this.serviceUser.getUserById(idToken);
    res.status(status).json({ response });
  };

  byId = async (req: NextApiRequest, res: NextApiResponse) => {
    const { _id } = req.query as { _id: string };
    const { status, response } = await this.serviceUser.getUserById(_id);
    res.status(status).json({ response });
  };
}
