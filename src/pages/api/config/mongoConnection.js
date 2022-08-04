import { MongoClient } from 'mongodb';

import { returnEnv } from '@utils/returnEnv';

import { EnvEnum } from '@enums/enum.environments';

let cachedDb = null;

export const connection = () => {
  if (cachedDb) return cachedDb;

  return MongoClient.connect(returnEnv(EnvEnum.DB_URL), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => {
      const connect = conn.db(returnEnv(EnvEnum.DB_NAME));
      cachedDb = connect;
      return connect;
    })
    .catch((err) => {
      console.error('error: ', err);
      process.exit(1);
    });
};

export default connection;
