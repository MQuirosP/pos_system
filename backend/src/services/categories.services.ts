import { Repository, ILike } from "typeorm";
import { Categories } from "@entities/categories.entity";
import { AppError } from "@middlewares/errorHandler.middleware";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";

export class CategoryServices {
    private categoryRepository: Repository<Categories>;
    
    constructor(categoryRepository: Repository<Categories>) {
        this.categoryRepository = categoryRepository;
    }

    private async handleDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            throw handleDatabaseError(error);
        }
    }

    private async findCategoryById(catId: number): Promise<Categories> {
        const category = await this.categoryRepository.findOne({
            where: {category_id: catId },
        });
        if ( !category ) throw new AppError("Category not found.", 404);
        return category;
    }

    async createCategory(catData: Partial<Categories>): Promise<Categories> {
        return this.handleDatabaseOperation(async () => {
            const newCategory = this.categoryRepository.create(catData);
            return await this.categoryRepository.save(newCategory);
        });
    }

    async fetchAllCategories(): Promise<Categories[]> {
        return this.handleDatabaseOperation(async () => {
            return await this.categoryRepository.find();
        });
    }

    async fetchCategoryByPK(catId: number): Promise<Categories> {
        return this.handleDatabaseOperation(() => this.findCategoryById(catId));
    }

    async getCategoryByName(catName: string): Promise<Categories[]> {
        return this.handleDatabaseOperation(async () => {
            const categories = await this.categoryRepository.find({
                where: { category_name: ILike(`%${catName}%`)}
            });
            return categories;
        });
    }

    async updateCategory(catId: number, updates: Partial<Categories>): Promise<Categories> {
        return this.handleDatabaseOperation(async () => {
            const category = await this.findCategoryById(catId);
            Object.assign(category, updates);
            return await this.categoryRepository.save(category)
        });
    }

    async deleteCategory(catId: number): Promise<void> {
        return this.handleDatabaseOperation(async () => {
            const category = await this.findCategoryById(catId);
            await this.categoryRepository.delete(category.category_id);
        })
    }
}