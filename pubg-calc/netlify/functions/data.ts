import { Handler } from '@netlify/functions';
import data from './db.json'

export const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
