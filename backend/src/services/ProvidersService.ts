import dataSource from "../config/ormconfig";
import { Repository, EntityManager, DeleteResult, ILike } from "typeorm";
import { handleDatabaseError } from "../middlewares/databaseErrorHandler";
import { AppError } from "../middlewares/errorHandler";
import { Provider } from "../database/entities/providers.entity";

export class ProvidersService {
    private providerRepository: Repository<Provider>;

    constructor(providerRepository: Repository<Provider>) {
        this.providerRepository = providerRepository;
    }

    async createProvider(providerData: Provider): Promise<Provider> {
        try {
            return await dataSource.manager.transaction(
                async (transactionalEntityManager: EntityManager) => {
                    const newProvider = transactionalEntityManager.create(
                        Provider,
                        providerData
                    );
                    return await transactionalEntityManager.save(newProvider);
                }
            );
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

    async getProviderByPk(providerId: number): Promise<Provider | null> {
        try {
            const provider = await this.providerRepository.findOne({
                where: { provider_id: providerId},
            });
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
    ): Promise<Provider | null> {
        try {
            const provider = await this.providerRepository.findOne({
                where: {provider_id: providerId},
            });

            if ( !provider ) {
                throw handleDatabaseError(provider);
            }

            Object.assign(provider, updates);

            return await this.providerRepository.save(provider);
        } catch (error) {
            throw handleDatabaseError(error);
        }
    }

    async deleteProvider(providerId: number): Promise<DeleteResult | null> {
        try {
            const provider = await this.providerRepository.findOne({
                where: { provider_id: providerId },
            });

            if ( !provider ) {
                throw new AppError("Provider not found.", 400);
            }
            return await this.providerRepository.delete(providerId);
        } catch (error) {
            throw handleDatabaseError(error);
        }
    }
}