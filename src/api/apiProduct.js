import apiConfig from '@/services/apiConfig';

export const searchProduct = () => new Promise((resolve, reject) => {
  try {
    const response = apiConfig.request({
      method: 'GET',
      url: 'materialesAPI',
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

export const getProductId = (id) => new Promise(
  (resolve, reject) => {
    try {
      const response = apiConfig.request({
        method: 'GET',
        url: 'materialesAPIByProducto',
        params: {
          producto: id,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  },
);

export const getTracking = (product) => new Promise(
  (resolve, reject) => {
    try {
      const response = apiConfig.request({
        method: 'GET',
        url: `inventarios/materialesAPIByProducto?producto=${product}`,
      });
      resolve(response);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  },
);

export const getSuggested = (product) => new Promise(
  (resolve, reject) => {
    try {
      const response = apiConfig.request({
        method: 'GET',
        url: `productos/sugeridos?material_origen=${product}`,
      });
      resolve(response);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  },
);

export const getImageZip = (id, code) => new Promise(
  (resolve, reject) => {
    try {
      const response = apiConfig.request({
        method: 'GET',
        url: `/productos/imagenes/${id}?producto=${code}`,
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/zip' });
      resolve(window.URL.createObjectURL(blob));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  },
);
