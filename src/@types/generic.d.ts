import { collecionsEnum } from '@enums/enum.colections';

type GenericType = {
  [key: string]: T;
  [collection: 'collection']: collecionsEnum;
};

type GenericElementType = {
  [key: string]: T;
  [key: string]: T;
  [collection: 'collection']: collecionsEnum;
};

type GenericCollectionElementType = {
  [key: string]: T;
  [key: string]: T;
  [collection: 'collection']: collecionsEnum;
};
