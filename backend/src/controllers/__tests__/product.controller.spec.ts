import { ProductController } from "../products.controller"; // Ajusta ruta según tu proyecto
import { ProductService } from "@services/products.services";
import { ProductResponseDTO } from "@dtos/products.dto";
import { Product } from "@entities/products.entity";

describe("ProductController", () => {
  let controller: ProductController;
  let mockProductService: Partial<ProductService>;
  let req: any;
  let res: any;
  let next: jest.Mock;

  // Helper para crear instancia válida de Product
  function createValidProduct(overrides = {}): Product {
    const product = new Product();
    product.product_id = 1;
    product.int_code = "ABC123";
    product.name = "Banana";
    product.description = "A tasty banana";
    product.purchase_price = 10.5;
    product.quantity = 100;
    product.sale_price = 15.0;
    product.is_taxed = true;
    product.margin = 4.5;
    product.tax_percentage = 13;
    product.category_id = 1;
    product.created_at = new Date();
    product.updated_at = new Date();
    // Aplica overrides si hay
    Object.assign(product, overrides);
    return product;
  }

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      query: {},
    };

    res = {
      success: jest.fn(),
    };

    next = jest.fn();

    mockProductService = {
      createProduct: jest.fn(),
      fetchProductByPK: jest.fn(),
      fetchAllProducts: jest.fn(),
      getProductByName: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    };

    controller = new ProductController();
    // Reemplaza servicio real con mock (ignore TS para tests)
    // @ts-ignore
    controller.productService = mockProductService;
  });

  test("createProduct - éxito", async () => {
    const newProduct = createValidProduct();
    req.body = {
      int_code: newProduct.int_code,
      name: newProduct.name,
      description: newProduct.description,
      purchase_price: newProduct.purchase_price,
      quantity: newProduct.quantity,
      sale_price: newProduct.sale_price,
      is_taxed: newProduct.is_taxed,
      margin: newProduct.margin,
      tax_percentage: newProduct.tax_percentage,
      category_id: newProduct.category_id,
    };

    (mockProductService.createProduct as jest.Mock).mockResolvedValue(newProduct);

    await controller.createProduct(req, res, next);

    expect(mockProductService.createProduct).toHaveBeenCalledWith(req.body);
    expect(res.success).toHaveBeenCalledWith(
      new ProductResponseDTO(newProduct),
      "Product created successfully.",
      201
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("getProductById - éxito", async () => {
    const product = createValidProduct({ product_id: 1, name: "Apple" });
    req.params.id = "1";
    (mockProductService.fetchProductByPK as jest.Mock).mockResolvedValue(product);

    await controller.getProductById(req, res, next);

    expect(mockProductService.fetchProductByPK).toHaveBeenCalledWith(1);
    expect(res.success).toHaveBeenCalledWith(
      new ProductResponseDTO(product),
      "Product fetched successfully.",
      200
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("getProducts - búsqueda por nombre", async () => {
    const products = [createValidProduct()];
    req.query.name = "Banana";
    (mockProductService.getProductByName as jest.Mock).mockResolvedValue(products);

    await controller.getProducts(req, res, next);

    expect(mockProductService.getProductByName).toHaveBeenCalledWith("Banana");
    expect(res.success).toHaveBeenCalledWith(
      products.map((p) => new ProductResponseDTO(p)),
      "All products fetched successfully.",
      200
    );
  });

  test("getProducts - sin filtro nombre", async () => {
    const products = [createValidProduct(), createValidProduct({ product_id: 2, name: "Apple" })];
    req.query = {};
    (mockProductService.fetchAllProducts as jest.Mock).mockResolvedValue(products);

    await controller.getProducts(req, res, next);

    expect(mockProductService.fetchAllProducts).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      products.map((p) => new ProductResponseDTO(p)),
      "All products fetched successfully.",
      200
    );
  });

  test("updateProduct - éxito", async () => {
    const updatedProduct = createValidProduct({ name: "Pineapple" });
    req.params.id = "1";
    req.body = { name: "Pineapple" };
    (mockProductService.updateProduct as jest.Mock).mockResolvedValue(updatedProduct);

    await controller.updateProduct(req, res, next);

    expect(mockProductService.updateProduct).toHaveBeenCalledWith(1, req.body);
    expect(res.success).toHaveBeenCalledWith(
      new ProductResponseDTO(updatedProduct),
      "Product updated successfully."
    );
  });

  test("maneja errores correctamente", async () => {
    const error = new Error("Algo salió mal");
    (mockProductService.createProduct as jest.Mock).mockRejectedValue(error);
    req.body = { name: "Banana" };

    await controller.createProduct(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.success).not.toHaveBeenCalled();
  });
});
