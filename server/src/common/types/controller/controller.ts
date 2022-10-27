import { Request } from 'express';
import { Query, ParamsDictionary } from 'express-serve-static-core';

interface TypedRequestFields<T> extends Request {
  body: T;
}

interface TypedRequestQuery<T extends Query> extends Request {
  query: T;
}

interface TypedRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}

interface TypedRequest<T extends ParamsDictionary, U> extends Request {
  body: U;
  params: T;
}

export type {
  TypedRequestFields,
  TypedRequestParams,
  TypedRequestQuery,
  TypedRequest,
};
