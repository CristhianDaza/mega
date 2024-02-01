import apiConfig from '@/services/apiConfig';

export const searchProduct = ({
  category,
  characteristic,
  color,
  discount,
  inventory,
  label,
  page,
  perPage,
  search,
  subCategory,
}) => new Promise((resolve, reject) => {
  try {
    const response = apiConfig.request({
      method: 'GET',
      url: 'productos',
      params: {
        caracteristica: characteristic,
        categoria: category,
        color,
        descuento: discount,
        etiqueta: label,
        inventario: inventory,
        page,
        page_size: perPage,
        search,
        subcategoria: subCategory,
      },
    });

    resolve(response);
  } catch (e) {
    console.log(e);
    reject(e);
  }
});

export const getCategories = () => new Promise((resolve, reject) => {
  try {
    const response = apiConfig.request({
      method: 'GET',
      url: 'categorias',
    });

    resolve(response);
  } catch (e) {
    console.log(e);
    reject(e);
  }
});

export const getSubCategories = (id) => new Promise((resolve, reject) => {
  try {
    const response = apiConfig.request({
      method: 'GET',
      url: `categorias/subcategoria/count/${id}`,
    });

    resolve(response);
  } catch (e) {
    console.log(e);
    reject(e);
  }
});

export const searchProductLabel = (label) => new Promise((resolve, reject) => {
  try {
    const response = apiConfig.request({
      method: 'GET',
      url: 'productos',
      params: {
        etiqueta: label,
      },
    });

    resolve(response);
  } catch (e) {
    console.log(e);
    reject(e);
  }
});
