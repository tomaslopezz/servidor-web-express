import fs from "fs"
export default class ProductManager {
  constructor() {
    this.path = "./Products.json";
  }

  getProducts = async () => {
    if (fs.existsSync(`${this.path}`)) {
      const data = await fs.promises.readFile(`${this.path}`, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else return [];
  };

  addProduct = async (newProd) => {
    let products = await this.getProducts();

    const codeRep = products.some((prod) => newProd.code == prod.code);

    if (!codeRep) {
      if (products.length == 0) {
        newProd.id = 1;
      } else {
        newProd.id = products[products.length - 1].id + 1;
      }

      products.push(newProd);
    } else {
      console.error("Codigo repetido el producto no se añadio");
    }

    await fs.promises.writeFile(
      `${this.path}`,
      JSON.stringify(products, null, "\t")
    );
  };

  getProductById = async (idBus) => {
    let products = await this.getProducts();

    return products.find((prod) => prod.id == idBus);
  };

  deleteProduct = async (idDel) => {
    let products = await this.getProducts();
    products = products.filter((prod) => prod.id !== idDel);
    await fs.promises.writeFile(
      `${this.path}`,
      JSON.stringify(products, null, "\t")
    );
  };
}
