import { productService } from "../services/productService.js";

const productsListStarwars = document.querySelector('.products__section__productsList-starwars');
const productsListConsolas = document.querySelector('.products__section__productsList-consolas');
const productsListDiversos = document.querySelector('.products__section__productsList-diversos');

window.addEventListener('DOMContentLoaded', () => showProductsSections());

const showProductsSections = async () => {
    if(!await createProductsList('Star Wars', productsListStarwars)){
        createErrorMessage(productsListStarwars);
    }

    if(!await createProductsList('Consolas', productsListConsolas)){
        createErrorMessage(productsListConsolas);
    }

    if(!await createProductsList('Diversos', productsListDiversos)){
        createErrorMessage(productsListDiversos);
    }
};

const createProductsList = async (category, productsList) => {
    try {
        let productsResponse = await productService.readAllProductsByCategory(category);
        
        if(productsResponse[1].length != 0){
            let maxProducts = 6;
            
            if(productsResponse[1].length < 6){
                maxProducts = productsResponse[1].length;
            }

            for(let i = 0; i < maxProducts; i++){
                productsList.appendChild(createProduct(productsResponse[1][i]));
            }

            return true;
        }else{
            return false;
        }
    } catch (error) {
        return false;
    }
    
};

const createProduct = (product) => {
    const divProduct = document.createElement('div');
    divProduct.classList.add('product');
    divProduct.innerHTML = `<ul>
                                    <li>
                                        <img class="product__image" src="${product.image}" alt="Imagen De Producto">
                                    </li>
                                    <li class="product__title">${product.name}</li>
                                    <li class="product__price">${product.price}</li>
                                    <li class="product__view">
                                        <a href="./screens/products/viewproduct.html?id=${product.id}">Ver producto</a>
                                    </li>
                                </ul>`;
    return divProduct;
};

const createErrorMessage = (productsList) => {
    const pErrorMessage = document.createElement('p');
    pErrorMessage.classList.add('products__section__productsList__errorMesage');
    pErrorMessage.innerText = 'Ha ocurrido un error, por favor intente mas tarde.';
    productsList.appendChild(pErrorMessage);
};