import jwt from "jsonwebtoken";
import dataSource from "@config/ormconfig";
import { TokenBlacklist } from "@entities/tokenBlacklist.entity";
import { Users } from "@entities/users.entity";
import { AppError } from "../middlewares/errorHandler.middleware";

export class JwtService {
  private accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  private refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
  private accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY!;
  private refresthTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY!;

  async generateAccessToken(user: Users): Promise<string> {
    return jwt.sign({ userId: user.user_id }, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    });
  }

  async generateRefreshToken(user: Users): Promise<string> {
    return jwt.sign({ userId: user.user_id }, this.refreshTokenSecret, {
      expiresIn: this.refresthTokenExpiry,
    });
  }

  async verifyAccessToken(token: string): Promise<any> {
    return jwt.verify(token, this.accessTokenSecret);
  }

  async verifyRefreshToken(token: string): Promise<any> {
    return jwt.verify(token, this.refreshTokenSecret);
  }

  async addToBlacklist(token: string): Promise<void> {
    const tokenBlacklistRepo = dataSource.getRepository(TokenBlacklist);
    const blacklistedToken = tokenBlacklistRepo.create({ token });
    try {
        await tokenBlacklistRepo.save(blacklistedToken);
    } catch (error) {
        throw new AppError("Could not add token to blacklist.", 500);
    }
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const tokenBlacklistRepo = dataSource.getRepository(TokenBlacklist);
    const blacklistedToken = await tokenBlacklistRepo.findOneBy({ token });
    return !!blacklistedToken;
  }
}
