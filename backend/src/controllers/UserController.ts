// src/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      if (users.length === 0) {
        return res.status(200).json({ success: true, data: "empty"}); // Devuelve un arreglo vacío si no hay usuarios
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
      console.log(error);
    }
  }
}
