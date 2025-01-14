import { HTTPError } from '../exceptions/httpError';

export interface IHTTPError {
  toHTTPError: () => HTTPError;
}
