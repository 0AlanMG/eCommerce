import { productRepository } from "../data/repository/productRepository.js";

let successful;

const readProductByName = async (productName) => {
    let productsList = [];

    await productRepository.readAll()
    .then(response => response.json())
    .then(products => {
        successful = true;
        
        products.forEach(product => {
            if(product.name.match(new RegExp(`${productName}`, 'i')) != null){
                productsList.push(product);
            }
        });
    })
    .catch(() => successful = false);

    return [successful, productsList];
};

export const productService = {
    readProductByName
};