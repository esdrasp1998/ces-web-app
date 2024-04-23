import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import Stack from "@mui/material/Stack";
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import useGetProduct from 'src/hooks/products/useGetProduct';
import Loader from 'src/components/atoms/Loader';
import useEditProduct from 'src/hooks/products/useEditProduct';
import ImageUploadCard from 'src/components/molecules/ImageUploadCard';
import useDeleteFile from 'src/hooks/common/useDeleteFile';
import { API_KEYS } from 'src/query/keys/queryConfig';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';

export const Route = createLazyFileRoute('/_auth/products/$id/edit')({
  component: EditProduct
})

const selectItems = [
  {label: "Unidad", value:"unidad"},
  {label: "Libra", value: "libra"}
];

function EditProduct () {
  const { id } = Route.useParams();
  const { product, productIsLoading, productIsError, productIsFetching } = useGetProduct({id})
  const { formik, isLoading, selectedFile, handleFileSelect } = useEditProduct({id})
  const { mutate, isLoading: deleteImageIsLoading } = useDeleteFile();

  const handleDeleteImage = () => {
    mutate({
      id: product.id, 
      tableName: 'products', 
      bucket_id: product.bucket_id, 
      file_name: product.file_name,
      invalidators: [API_KEYS.FETCH_PRODUCT]
    })
  }

  useEffect(() => {
    if (!productIsLoading && !productIsError) {
      formik.setValues({
        name: product.name,
        purchase_price: product.purchase_price,
        sale_price: product.sale_price,
        unity: product.unity,
        product_image: null,
        bucket_id: product.bucket_id,
        file_name: product.file_name
      })
    }
  }, [product, productIsError, productIsLoading])

  if (productIsLoading) return <Loader type='cover'/>

  return (
    <DetailsTemplate title='Editar Producto' returnButtonProps={{to: '/products', params: {}}}>
      <>
        <Stack spacing={4} mb={4}>
          <ImageUploadCard
            file={selectedFile} 
            setSelectedFile={handleFileSelect}
            src={product.imagePublicUrl}
            handleDelete={handleDeleteImage}
            loading={deleteImageIsLoading || productIsFetching}
          />
          <InputField 
            id="name"
            name="name"
            label="Nombre"
            type="text"
            formik={formik}
          />
          <SelectField 
            id="unity" 
            labelId="label-unity"
            name="unity"
            label="Unidad" 
            selectItems={selectItems} 
            formik={formik}
          />
          <InputField 
            id="sale_price"
            name="sale_price"
            label="Precio de Venta" 
            type="number"
            formik={formik}
          />
          <InputField 
            id="purchase_price"
            name="purchase_price"
            label="Precio de Compra" 
            type="number"
            formik={formik}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Editar Producto</Button>
      </>
    </DetailsTemplate>
  );
};

export default EditProduct;