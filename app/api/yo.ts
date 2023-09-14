import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type ResponseData = {
  message: string;
};

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('clgg');

  res.status(200).send({ response: data });
}
