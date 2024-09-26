import { AppError } from "../middlewares/errorHandler";

export abstract class DTOBase {
  static expectedKeys: string[] = [];

  static validateKeys(receivedKeys: string[]): void {
    const invalidKeys = receivedKeys.filter(
      (key) => !this.expectedKeys.includes(key)
    );
    if (invalidKeys.length > 0) {
      throw new AppError(
        `Invalid keys in request body: ${invalidKeys.join(", ")}`,
        422
      );
    }
  }
  abstract validate(): Promise<void>;
}
