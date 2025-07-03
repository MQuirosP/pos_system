import { UserController } from "@controllers/users.controller"; 
import { UserService } from "@services/users.services";
import { UserResponseDTO } from "@dtos/users.dto";
import { UserRole } from "@enums/custom.enums";
import { Users } from "@entities/users.entity"; 

describe("UserController", () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;
  let req: any;
  let res: any;
  let next: jest.Mock;

  const createMockUser = (overrides = {}): Users => {
    const user = new Users();
    user.user_id = 1;
    user.username = "mario";
    user.email = "mario@example.com";
    user.password = "hashedpassword";
    user.role = UserRole.User;
    user.is_active = true;
    user.name = "Mario";
    user.lastname = "Quirós";
    user.created_at = new Date();
    user.updated_at = new Date();

    Object.assign(user, overrides);
    return user;
  };

  beforeEach(() => {
    req = { params: {}, body: {}, query: {} };

    res = {
      success: jest.fn(),
    };

    next = jest.fn();

    mockUserService = {
      createUser: jest.fn(),
      fetchUserByPK: jest.fn(),
      fetchAllUsers: jest.fn(),
      getUserByUsername: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      comparePassword: jest.fn(),
    };

    controller = new UserController();
    // @ts-ignore
    controller.userService = mockUserService;
  });

  test("createUser - éxito", async () => {
    req.body = {
      username: "mario",
      email: "mario@example.com",
      password: "123456",
      role: UserRole.User,
      is_active: true,
      name: "Mario",
      lastname: "Quirós",
    };
    const mockUser = createMockUser();
    (mockUserService.createUser as jest.Mock).mockResolvedValue(mockUser);

    await controller.createUser(req, res, next);

    expect(mockUserService.createUser).toHaveBeenCalledWith(req.body);
    expect(res.success).toHaveBeenCalledWith(
      new UserResponseDTO(mockUser),
      "User created successfully.",
      201
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("getUsers - con filtro nombre", async () => {
    const users = [createMockUser()];
    req.query.name = "mario";
    (mockUserService.getUserByUsername as jest.Mock).mockResolvedValue(users);

    await controller.getUsers(req, res, next);

    expect(mockUserService.getUserByUsername).toHaveBeenCalledWith("mario");
    expect(res.success).toHaveBeenCalledWith(
      users.map((u) => new UserResponseDTO(u)),
      "All users fetched successfully.",
      200
    );
  });

  test("getUsers - sin filtro nombre", async () => {
    const users = [createMockUser()];
    req.query = {};
    (mockUserService.fetchAllUsers as jest.Mock).mockResolvedValue(users);

    await controller.getUsers(req, res, next);

    expect(mockUserService.fetchAllUsers).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      users.map((u) => new UserResponseDTO(u)),
      "All users fetched successfully.",
      200
    );
  });

  test("getUserById - éxito", async () => {
    req.params.id = "1";
    const mockUser = createMockUser();
    (mockUserService.fetchUserByPK as jest.Mock).mockResolvedValue(mockUser);

    await controller.getUserById(req, res, next);

    expect(mockUserService.fetchUserByPK).toHaveBeenCalledWith(1);
    expect(res.success).toHaveBeenCalledWith(
      new UserResponseDTO(mockUser),
      "User fetched successfully.",
      200
    );
  });

  test("updateUser - éxito", async () => {
    const updatedUser = createMockUser({ name: "Mario Updated" });
    req.params.id = "1";
    req.body = { name: "Mario Updated" };
    (mockUserService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

    await controller.updateUser(req, res, next);

    expect(mockUserService.updateUser).toHaveBeenCalledWith(1, req.body);
    expect(res.success).toHaveBeenCalledWith(
      new UserResponseDTO(updatedUser),
      "User updated successfully."
    );
  });

  test("deleteUser - éxito", async () => {
    req.params.id = "1";
    const mockUser = createMockUser();
    (mockUserService.fetchUserByPK as jest.Mock).mockResolvedValue(mockUser);
    (mockUserService.deleteUser as jest.Mock).mockResolvedValue(undefined);

    await controller.deleteUser(req, res, next);

    expect(mockUserService.fetchUserByPK).toHaveBeenCalledWith(1);
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
    expect(res.success).toHaveBeenCalledWith(
      new UserResponseDTO(mockUser),
      "User deleted successfully.",
      200
    );
  });

  test("comparePassword - éxito", async () => {
    req.params.id = "1";
    req.body.password = "password123";
    (mockUserService.comparePassword as jest.Mock).mockResolvedValue(undefined);

    await controller.comparePassword(req, res, next);

    expect(mockUserService.comparePassword).toHaveBeenCalledWith(1, "password123");
    expect(res.success).toHaveBeenCalledWith(
      { user_id: 1 },
      "Password is correct.",
      200
    );
  });

  test("maneja errores correctamente", async () => {
    const error = new Error("Algo salió mal");
    (mockUserService.createUser as jest.Mock).mockRejectedValue(error);
    req.body = {
      username: "mario",
      email: "mario@example.com",
      password: "123456",
      role: UserRole.User,
      is_active: true,
      name: "Mario",
      lastname: "Quirós",
    };

    await controller.createUser(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.success).not.toHaveBeenCalled();
  });
});
