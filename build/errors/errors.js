"use strict";
/*
  See this article for details about custom errors:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
// ADD THIS FILE TO A FOLDER errors 
//INFO: This is rewritten, compared to what we did in the class
class ApiError extends Error {
    constructor(msg, eCode) {
        super(msg);
        this.eCode = eCode;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
        this.name = 'ApiError';
        this.errorCode = eCode === undefined ? 500 : eCode;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=errors.js.map