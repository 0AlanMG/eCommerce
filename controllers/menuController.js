import { productService } from "../services/productService.js";

const searchInputSearch = document.querySelector('.menu__search__input__inputSearch');
const searchInputBtnSearch = document.querySelector('.menu__search__input__btnSearch');
const searchInputBtnClose = document.querySelector('.menu__search__input__btnClose');
const searchResult = document.querySelector('.menu__search__result');

searchInputSearch.value = '';

window.addEventListener('resize', () => {
    if(window.innerWidth > 500){
        searchInputSearch.style.display = 'block';
        searchInputBtnSearch.style.display = 'block';
        searchInputBtnClose.style.display = 'none';
    }else if(window.innerWidth <= 500) {
        hideSearchMobile();
    }
});

document.querySelectorAll('body >*:not(header)').forEach(element => {
    element.addEventListener('click', () => searchResult.style.display = 'none')
});

searchInputSearch.addEventListener('focus', () => showSearchResult(searchInputSearch.value));
searchInputSearch.addEventListener('input', () => showSearchResult(searchInputSearch.value));
searchInputBtnSearch.addEventListener('click', () => {
    showSearchResult(searchInputSearch.value);

    if(window.innerWidth <= 500){
        showSearchMobile();
    }
});
searchInputBtnClose.addEventListener('click', () => hideSearchMobile());

const showSearchResult = async (productName) => {
    try {
        searchResult.innerHTML = '';
        
        if(productName != ''){
            let response = await productService.readProductByName(productName);

            if(!response[0]){
                showErrorMessage('Error al buscar productos, por favor intente más tarde.');
            }else if(response[0] && response[1].length == 0){
                showErrorMessage('No existe el producto.');
            }else if(response[0] && response[1].length != 0){
                response[1].forEach(product => {
                    const divProduct = document.createElement('div');
                    divProduct.classList.add('menu__search__result__product');
                    divProduct.innerHTML = showProduct(product);
                    searchResult.appendChild(divProduct);
                });
                searchResult.style.display = 'flex';
            }
        }
    } catch (error) {
        showErrorMessage('Error al buscar productos, por favor intente más tarde.');        
    }
};

const showSearchMobile = () => {
    searchInputBtnSearch.style.display = 'none';

    searchInputSearch.style.display = 'block';
    searchInputBtnClose.style.display = 'block';
};

const hideSearchMobile = () => {
    searchInputSearch.style.display = 'none';
    searchResult.style.display = 'none';
    searchInputBtnClose.style.display = 'none';

    searchInputBtnSearch.style.display = 'block';
};

const showErrorMessage = (message) => {
    if(document.querySelector('.menu__search__result__message') == null){
        const pErrorResult = document.createElement('p');
        pErrorResult.classList.add('menu__search__result__message');
        pErrorResult.innerText = message;
        searchResult.appendChild(pErrorResult);
        searchResult.style.display = 'flex';
    }
};

const showProduct = (product) => {
    return `<img class="menu__search__result__product__image" src="${product.image}" alt="Imagen De Producto">
            <ul>
                <li class="menu__search__result__product__title">${product.name}</li>
                <li class="menu__search__result__product__price">$${product.price}</li>
                <li class="menu__search__result__product__view">
                    <a href="./screens/products/viewproduct.html?id=${product.id}">Ver producto</a>
                </li>
            </ul>`;
};