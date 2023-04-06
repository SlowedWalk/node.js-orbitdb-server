import database from "../../database/connection.js";

class ProductRepository {
  constructor() {
    this.db = new Database();
  }

  async getAllProducts() {
    const products = await this.db.query("SELECT * FROM products");
    return products;
  }

  async getProductById({id}) {
    const product = await this.db.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    return product;
  }
}

export default ProductRepository;