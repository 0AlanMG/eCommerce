const readAll = () => fetch("http://localhost:3000/product");

const readAllByCategory = (category) => fetch(`http://localhost:3000/product/?category=${category}`);

export const productRepository = {
    readAll,
    readAllByCategory
};