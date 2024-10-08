import { productSnackbarMessages } from 'src/constants/snackbarMessages';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { Product } from './interface';
import useSoftDeleteEntity from '../common/useSoftDeleteEntity';

const useDeleteProduct = () => {
  const {
    entityToDelete: productToDelete,
    setEntityToDelete: setProductToDelete,
    mutate,
    isLoading,
  } = useSoftDeleteEntity<Product>({
    entityName: 'products',
    queryKey: API_KEYS.FETCH_PRODUCTS,
    successMessage: productSnackbarMessages.success.delete,
    errorMessage: productSnackbarMessages.errors.delete,
    entityDisplayName: 'Producto',
  });

  return {
    productToDelete,
    setProductToDelete,
    mutate,
    isLoading,
  };
};

export default useDeleteProduct;
