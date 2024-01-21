import apiConfig from '@/services/apiConfig';

// eslint-disable-next-line import/prefer-default-export,max-len
export const searchProduct = ({
  search,
  page,
  perPage,
  inventoryInput,
  color,
  etiqueta,
  titulo,
}) => new Promise((resolve, reject) => {
  try {
    const response = apiConfig.request({
      method: 'GET',
      url: 'productos',
      params: {
        search,
        page_size: perPage,
        inventario: inventoryInput,
        color,
        page,
        etiqueta,
        titulo,
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
