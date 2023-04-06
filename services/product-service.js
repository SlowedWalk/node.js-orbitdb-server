import ProductRepository from "../database/repository/product-repository.js";
import Connection from '../database/connection.js';

export const getAllProducts = async (req, res) => {
  const DB = new Connection();
  try {
    const products = DB.getAllProduct();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductRepository.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};