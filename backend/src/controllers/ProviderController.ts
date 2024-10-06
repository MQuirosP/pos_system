import { Request, Response, NextFunction } from "express";
import dataSource from "../config/ormconfig";
import { Provider } from "../database/entities/providers.entity";
import { ProvidersService } from "../services/ProvidersService";
import { ProviderCreateDTO, ProviderResponseDTO, ProviderUpdateDTO } from "../dtos/providers.dto";

export class ProviderController {
  private readonly providerService: ProvidersService;

  constructor() {
    const providerRepository = dataSource.getRepository(Provider);
    this.providerService = new ProvidersService(providerRepository);
  }

  async createProvider(req: Request, res: Response, next: NextFunction) {
    try {
      const providerData = new ProviderCreateDTO(req.body);
      await providerData.validate();
      const newProvider = await this.providerService.createProvider(
        providerData
      );

      const providerResponseDTO = new ProviderResponseDTO(newProvider);
      return res.success(
        providerResponseDTO,
        "Provider created successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async getProviders(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      let providers: Provider[] | null = null;
      if (name && typeof name === "string" && name.trim() !== "") {
        providers = await this.providerService.getProviderByName(
          name as string
        );
      } else {
        providers = await this.providerService.fetchAllProviders();
      }

      const providerResponseDTOs = providers?.map(
        (provider) => new ProviderResponseDTO(provider)
      );
      const responseMessage =
        providerResponseDTOs?.length === 0
          ? "No providers found."
          : "All providers fetched successfully.";
      return res.success(providerResponseDTOs, responseMessage, 200);
    } catch (error) {
      next(error);
    }
  }

  async getProviderById(req: Request, res: Response, next: NextFunction) {
    try {
      const providerId = parseInt(req.params.id);
      const provider = await this.providerService.getProviderByPk(providerId);

      if (!provider) {
        return res.error({ message: "Customer not found." }, 400);
      }
      const providerResponseDTO = new ProviderResponseDTO(provider);
      return res.success(
        providerResponseDTO,
        "Provider fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProvider(req: Request, res: Response, next: NextFunction) {
    try {
      const providerId = parseInt(req.params.id);
      const providerUpdate = new ProviderUpdateDTO(req.body);
      
      await providerUpdate.validate();
      const updateProvider = await this.providerService.updateProvider(
        providerId,
        providerUpdate
      );

      if ( !updateProvider ) {
        return res.error({ message: "Failed to update provider." }, 400);
      }
        const providerResponseDTO = new ProviderResponseDTO(updateProvider);
      return res.success(providerResponseDTO, "Provider updated successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteProvider(req: Request, res: Response, next: NextFunction) {
    try {
      const providerId = parseInt(req.params.id);
      const providerToDelete = await this.providerService.getProviderByPk(
        providerId
      );

      if ( !providerToDelete ) {
        return res.error({ message: "Provider not found." }, 400);
      }

      const deleteResult = await this.providerService.deleteProvider(
        providerId
      );

      if (!deleteResult || deleteResult.affected === 0) {
        return res.error({ message: "Failed to delete provider." }, 500);
      }
      const providerResponseDTO = new ProviderResponseDTO(providerToDelete);
      return res.success(
        providerResponseDTO,
        "Provider deleted successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
