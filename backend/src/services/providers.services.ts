import { Repository, ILike, DeleteResult } from "typeorm";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";
import { AppError } from "@middlewares/errorHandler";
import { Provider } from "@entities/providers.entity";

export class ProvidersService {
  private providerRepository: Repository<Provider>;

  constructor(providerRepository: Repository<Provider>) {
    this.providerRepository = providerRepository;
  }

  async createProvider(providerData: Partial<Provider>): Promise<Provider> {
    try {
      const newProvider = this.providerRepository.create(providerData);
      return await this.providerRepository.save(newProvider);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchAllProviders(): Promise<Provider[]> {
    try {
      return await this.providerRepository.find();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getProviderByPk(providerId: number): Promise<Provider> {
    try {
      const provider = await this.providerRepository.findOne({
        where: { provider_id: providerId },
      });

      if (!provider) throw new AppError("Provider not found.", 404);
      return provider;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getProviderByName(providerName: string): Promise<Provider[] | []> {
    try {
      const provider = await this.providerRepository.find({
        where: {
          provider_name: ILike(`%${providerName}%`),
        },
      });
      return provider.length > 0 ? provider : [];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async updateProvider(
    providerId: number,
    updates: Partial<Provider>
  ): Promise<Provider> {
    try {
      const provider = await this.providerRepository.findOne({
        where: { provider_id: providerId },
      });

      if (!provider) throw new AppError("Provider not found.", 404);

      Object.assign(provider, updates);

      return await this.providerRepository.save(provider);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

 async deleteProvider(providerId: number): Promise<DeleteResult> {
  try {
    const provider = await this.providerRepository.findOne({
      where: { provider_id: providerId },
    });

    if (!provider) throw new AppError("Provider not found.", 400);

    const deleteResult: DeleteResult = await this.providerRepository.delete(providerId);
    deleteResult.raw = provider; 

    return deleteResult; 
  } catch (error) {
    throw handleDatabaseError(error);
  }
}
}
