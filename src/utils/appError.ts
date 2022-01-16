import { ErrorInt } from './interfaces/errorInterface';
const ErrorHandler = (status: number, message: string, data: object): ErrorInt => {
  return { status, message, data, success: false };
};
export default ErrorHandler;
