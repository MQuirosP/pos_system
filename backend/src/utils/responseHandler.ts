import { Response } from "express";

export class ResponseHandler {
  static sendSuccessResponse(res: Response, data: any, message?: string, statusCode: number = 200) {
    if (!res.headersSent) {
      res.status(statusCode).json({
        success: true,
        message: message || "Request successfull",
        data
      });
    }
  }

  static sendErrorResponse(res: Response, error: any, statusCode: number = 500) {
    if (!res.headersSent) {
      res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error"
      });
    }
  }

  // Otros métodos si es necesario
}