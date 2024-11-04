import { Request, Response, NextFunction } from "express";
import dataSource from "@config/ormconfig";
import { Provider } from "@entities/providers.entity";
import { ProvidersService } from "@services/providers.services";
import {
  ProviderCreateDTO,
  ProviderResponseDTO,
  ProviderUpdateDTO,
} from "@dtos/providers.dto";

export class ProviderController {
  private readonly providerService: ProvidersService;

  constructor() {
    const providerRepository = dataSource.getRepository(Provider);
    this.providerService = new ProvidersService(providerRepository);
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
      next(error);
    }
  }

  createProvider(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const providerData = new ProviderCreateDTO(req.body);
      await providerData.validate();
      const newProvider = await this.providerService.createProvider(
        providerData
      );

      return res.success(
        new ProviderResponseDTO(newProvider),
        "Provider created succesfully.",
        201
      );
    });
  }

  getProviders(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const { name } = req.query;
      let providers: Provider[] = [];

      if (name && typeof name === "string" && name.trim() !== "") {
        providers = await this.providerService.getProviderByName(name);
      } else {
        providers = await this.providerService.fetchAllProviders();
      }

      const providerResponseDTOs = providers.map(
        (provider) => new ProviderResponseDTO(provider)
      );
      const responseMessage =
        providerResponseDTOs.length === 0
          ? "No providers found."
          : "All providers fetched successfully.";

      return res.success(providerResponseDTOs, responseMessage, 200);
    });
  }

  getProviderById(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const providerId = parseInt(req.params.id);
      const provider = await this.providerService.getProviderByPK(providerId);

      return res.success(
        new ProviderResponseDTO(provider),
        "Provider fetched succesfully",
        200
      );
    });
  }

  updateProvider(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const providerId = parseInt(req.params.id);
      const providerUpdateDTO = new ProviderUpdateDTO(req.body);

      await providerUpdateDTO.validate();
      const updatedProvider = await this.providerService.updateProvider(
        providerId,
        providerUpdateDTO
      );

      return res.success(
        new ProviderResponseDTO(updatedProvider),
        "Provider updated succesfully."
      );
    });
  }

  deleteProvider(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const providerId = parseInt(req.params.id);
      const providerToDelete = await this.providerService.getProviderByPK(
        providerId
      );
      await this.providerService.deleteProvider(providerId);

      return res.success(
        new ProviderResponseDTO(providerToDelete),
        "Provider deleted successfully.",
        200
      );
    });
  }
}
