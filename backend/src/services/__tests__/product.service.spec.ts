import { ProductService } from "@services/products.services";
import { Product } from "@entities/products.entity";
import { Repository, ILike } from "typeorm";

describe("ProductService", () => {
  let service: ProductService;
  let mockRepository: Partial<Repository<Product>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),         // importante: mock para findOne()
      delete: jest.fn(),
    };
    service = new ProductService(mockRepository as Repository<Product>);
  });

  test("createProduct should save and return product", async () => {
    const productData = { name: "Banana", price: 100 };
    const expectedProduct = { product_id: 1, ...productData };

    (mockRepository.create as jest.Mock).mockReturnValue(productData);
    (mockRepository.save as jest.Mock).mockResolvedValue(expectedProduct);

    const result = await service.createProduct(productData as any);

    expect(mockRepository.create).toHaveBeenCalledWith(productData);
    expect(mockRepository.save).toHaveBeenCalledWith(productData);
    expect(result).toEqual(expectedProduct);
  });

  test("fetchAllProducts should return products", async () => {
    const mockProducts = [
      { product_id: 1, name: "A" },
      { product_id: 2, name: "B" },
    ];

    (mockRepository.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await service.fetchAllProducts();
    expect(result).toEqual(mockProducts);
  });

  test("fetchProductByPK should return product if found", async () => {
    const mockProduct = { product_id: 1, name: "Banana" };
    (mockRepository.findOne as jest.Mock).mockResolvedValue(mockProduct);

    const result = await service.fetchProductByPK(1);
    expect(result).toEqual(mockProduct);
  });

  test("fetchProductByPK should throw if not found", async () => {
    (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.fetchProductByPK(1)).rejects.toThrow("Product not found.");
  });

  test("updateProduct should update and return updated product", async () => {
    const existingProduct = { product_id: 1, name: "Old" };
    const updatedProduct = { product_id: 1, name: "New" };

    (mockRepository.findOne as jest.Mock).mockResolvedValue(existingProduct);
    (mockRepository.save as jest.Mock).mockResolvedValue(updatedProduct);

    const result = await service.updateProduct(1, { name: "New" });

    expect(result).toEqual(updatedProduct);
  });

  test("deleteProduct should call delete", async () => {
    const existingProduct = { product_id: 1, name: "ToDelete" };
    (mockRepository.findOne as jest.Mock).mockResolvedValue(existingProduct);
    (mockRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

    await service.deleteProduct(1);

    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  test("getProductByName should filter by name using ILike", async () => {
    const mockProducts = [{ product_id: 1, name: "Banana" }];
    (mockRepository.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await service.getProductByName("Banana");

    expect(mockRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          name: expect.any(Object), // operador ILike
        }),
      })
    );

    expect(result).toEqual(mockProducts);
  });
});
