import { Repository } from "typeorm";
import { Users } from "@entities/users.entity";
import { UserLoginDTO } from "@dtos/auth.dto";
import { HashingService } from "@services/hashService";
import { JwtService } from "@services/jwt.services";
import { AppError } from "@middlewares/errorHandler.middleware";

export class AuthService {
  constructor(
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
    private hashingService: HashingService
  ) {}

  async login(userData: UserLoginDTO) {
    const username = userData.username.trim();
    const password = userData.password.trim();

    const user = await this.userRepository.findOne({
        where: { username },
    });

    if (!user || !(await this.hashingService.comparePassword(password, user.password))) {
        throw new AppError("Invalid credentials.", 400);
    }

    const accessToken = await this.jwtService.generateAccessToken(user);
    const refreshToken = await this.jwtService.generateRefreshToken(user);
    return { accessToken, refreshToken };
}


  async logout(refreshToken: string) {
    await this.jwtService.addToBlacklist(refreshToken);
  }
}
