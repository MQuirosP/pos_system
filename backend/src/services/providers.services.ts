import { Repository, ILike } from "typeorm";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";
import { AppError } from "@middlewares/errorHandler";
import { Provider } from "@entities/providers.entity";

export class ProvidersService {
  private providerRepository: Repository<Provider>;

  constructor(providerRepository: Repository<Provider>) {
    this.providerRepository = providerRepository;
  }

  // Método auxiliar para manejar errores
  private async handleDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Método auxiliar para buscar un proveedor por id
  private async findProviderById(providerId: number): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { provider_id: providerId },
    });
    if ( !provider ) throw new AppError("Provider not found.", 404);
    return provider;
  }

  async createProvider(providerData: Partial<Provider>): Promise<Provider> {
    return this.handleDatabaseOperation(async () => {
      const newProvider = this.providerRepository.create(providerData);
      return await this.providerRepository.save(newProvider);
    })
  }

  async fetchAllProviders(): Promise<Provider[]> {
    return this.handleDatabaseOperation(async () => {
      return await this.providerRepository.find();
    });
  }

  async getProviderByPK(providerId: number): Promise<Provider> {
    return this.handleDatabaseOperation(() => this.findProviderById(providerId));
  }

  async getProviderByName(providerName: string): Promise<Provider[]> {
    return this.handleDatabaseOperation(async () => {
      const providers = await this.providerRepository.find({
        where: {
          provider_name: ILike(`%${providerName}%`),
        },
      });
      return providers;
    })
  }

  async updateProvider(
    providerId: number,
    updates: Partial<Provider>
  ): Promise<Provider> {
    return this.handleDatabaseOperation(async () => {
      const provider = await this.findProviderById(providerId);
      Object.assign(provider, updates);
      return await this.providerRepository.save(provider);
    })
  }

  async deleteProvider(providerId: number): Promise<void> {
    return this.handleDatabaseOperation(async () => {
      const provider = await this.findProviderById(providerId);
      await this.providerRepository.delete(provider.provider_id);
    })
  }
}
