import { NextApiRequest, NextApiResponse } from 'next';

import { ServiceElement } from '@pages/api/services/element';

export class ControllerElement {
  private serviceElement = new ServiceElement();

  createElement = async (req: NextApiRequest, res: NextApiResponse) => {
    const { createNewElement } = this.serviceElement;
    const { status, response } = await createNewElement(req);
    res.status(status).json({ response });
  };

  getAllElements = async (req: NextApiRequest, res: NextApiResponse) => {
    const { getAllElements } = this.serviceElement;
    const { status, response } = await getAllElements(req);
    res.status(status).json({ response });
  };

  getElementById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { getElementById } = this.serviceElement;
    const { status, response } = await getElementById(req);
    res.status(status).json({ response });
  };

  getElementWithCode = async (req: NextApiRequest, res: NextApiResponse) => {
    const { getElementByCode } = this.serviceElement;
    const { status, response } = await getElementByCode(req);
    res.status(status).json({ response });
  };
}
