import { Request, Response, NextFunction } from "express";
import dataSource from "../config/ormconfig";
import { Provider } from "../database/entities/providers.entity";
import { ProvidersService } from "../services/ProvidersService";
import {
  ProviderCreateDTO,
  ProviderResponseDTO,
  ProviderUpdateDTO,
} from "../dtos/providers.dto";

export class ProviderController {
  private readonly providerService: ProvidersService;

  constructor() {
    const providerRepository = dataSource.getRepository(Provider);
    this.providerService = new ProvidersService(providerRepository);
  }

  async createProvider(req: Request, res: Response, next: NextFunction) {
    const providerData = new ProviderCreateDTO(req.body);
    await providerData.validate();
    const newProvider = await this.providerService.createProvider(
      providerData
    );
    
    try {
      return res.success(
        new ProviderResponseDTO(newProvider),
        "Provider created successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async getProviders(req: Request, res: Response, next: NextFunction) {
    const { name } = req.query;
    let providers: Provider[] = [];
    if (name && typeof name === "string" && name.trim() !== "") {
      providers = await this.providerService.getProviderByName(name);
    } else {
      providers = await this.providerService.fetchAllProviders();
    }
    
    try {
      const providerResponseDTOs = providers.map(
        (provider) => new ProviderResponseDTO(provider)
      );
      const responseMessage =
        providerResponseDTOs.length === 0
          ? "No providers found."
          : "All providers fetched successfully.";
      return res.success(providerResponseDTOs, responseMessage, 200);
    } catch (error) {
      next(error);
    }
  }

  async getProviderById(req: Request, res: Response, next: NextFunction) {
    const providerId = parseInt(req.params.id);
    const provider = await this.providerService.getProviderByPk(providerId);
    try {

      return res.success(
        new ProviderResponseDTO(provider),
        "Provider fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProvider(req: Request, res: Response, next: NextFunction) {
    const providerId = parseInt(req.params.id);
    const providerData = new ProviderUpdateDTO(req.body);
    
    await providerData.validate();
    try {
      const updatedProvider = await this.providerService.updateProvider(
        providerId,
        providerData
      );

      return res.success(
        new ProviderResponseDTO(updatedProvider),
        "Provider updated successfully.",
        200
      );
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
      await this.providerService.deleteProvider(providerId)
      return res.success(
        new ProviderResponseDTO(providerToDelete),
        "Provider deleted successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
