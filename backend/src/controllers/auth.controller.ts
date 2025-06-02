import { Request, Response, NextFunction } from "express";
import { JwtService } from "@services/jwt.services";
import dataSource from "@config/ormconfig";
import { AuthService } from "@services/auth.services";
import { Users } from "@entities/users.entity";
import { UserLoginDTO } from "@dtos/auth.dto";
import { HashingService } from "@services/hashService";

export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        const userRepository = dataSource.getRepository(Users);
        const jwtService = new JwtService();
        const hashingService = new HashingService();
        this.authService = new AuthService(userRepository, jwtService, hashingService);
    }

    private async handleControllerOperation(
        req: Request,
        res: Response,
        next: NextFunction,
        operation: () => Promise<any>
    ) {
        try {
            await operation();
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.handleControllerOperation(req, res, next, async () => {
            const userData = new UserLoginDTO(req.body);
            await userData.validate();
            const tokens = await this.authService.login(userData);
            return res.success(tokens, "Login succesful.", 200);
        });
    }

    logout(req: Request, res: Response, next: NextFunction) {
        this.handleControllerOperation(req, res, next, async () => {
            const { refreshToken } = req.body;
            await this.authService.logout(refreshToken);
            return res.success({}, "Logout successful.", 200);
        });
    }
}