export const UNEXPECTED_ERROR = 'An unexpected error has occurred';
import { BAD_REQUEST } from './httpCode';
export class MissingParamAPIError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = BAD_REQUEST;
        this.formattedMessage = message;
    }
}
