import apiConfig from '@/services/apiConfig';

// eslint-disable-next-line import/prefer-default-export,max-len
export const searchProduct = ({
  search,
  page,
  perPage,
  inventoryInput,
  color,
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
      },
    });

    resolve(response);
  } catch (e) {
    console.log(e);
    reject(e);
  }
});
