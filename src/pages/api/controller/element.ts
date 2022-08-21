import { NextApiRequest, NextApiResponse } from 'next';

import { ServiceElement } from '@pages/api/services/element';

import { errorEnum } from '@enums/enum.errors';

export class ControllerElement {
  private serviceElement = new ServiceElement();

  createElement = async (req: NextApiRequest, res: NextApiResponse) => {
    const { createNewElement } = this.serviceElement;
    const { status, response } = await createNewElement(req);
    if (response) return res.status(status).json({ response });
    res.status(400).json({ error: errorEnum.ELEMENT_ALREADY_IN_USE });
  };

  getAllElements = async (req: NextApiRequest, res: NextApiResponse) => {
    const { getAllElements } = this.serviceElement;
    const { status, response } = await getAllElements(req);
    if (response) return res.status(status).json({ response });
    res.status(200).json({ response: [] });
  };

  getElementById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { getElementInCollectionById } = this.serviceElement;
    const { status, response } = await getElementInCollectionById(req);
    if (response) return res.status(status).json({ response });
    res.status(400).json({ error: errorEnum.ELEMENT_NOT_FOUND });
  };

  getElementWithCode = async (req: NextApiRequest, res: NextApiResponse) => {
    const { getElementByCode } = this.serviceElement;
    const { status, response } = await getElementByCode(req);
    if (response) return res.status(status).json({ response });
    res.status(404).json({ error: errorEnum.ELEMENT_NOT_FOUND });
  };

  findElementWithCode = async (req: NextApiRequest, res: NextApiResponse) => {
    const { findElementByCode } = this.serviceElement;
    const { status, response } = await findElementByCode(req);
    if (response) return res.status(status).json({ response });
    res.status(404).json({ error: errorEnum.ELEMENT_NOT_FOUND });
  };
}
