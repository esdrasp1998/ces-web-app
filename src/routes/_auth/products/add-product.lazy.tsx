import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import useAddProduct from 'src/hooks/products/useAddProduct';
import ImageUploadCard from 'src/components/molecules/ImageUploadCard';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import SelectField from 'src/components/atoms/SelectField';
import {
  establishmentItems,
  inventorySubtractionItems,
} from 'src/constants/selectItems';
import useGetExpenseCategories from 'src/hooks/expense-category/useGetExpenseCategories';
import { apiItems } from 'src/constants/selectItems';
import AutoCompleteSelect from 'src/components/molecules/AutoCompleteSelect';
import Checkbox from 'src/components/atoms/Checkbox';
import Divider from 'src/components/atoms/Divider';
import Typography from '@mui/material/Typography';
import AddProductItem from 'src/components/organisms/AddProductItem';
import EditProductItem from 'src/components/organisms/EditProductItem';
import List from '@mui/material/List';
import { productFormsValidations } from 'src/constants';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const Route = createLazyFileRoute('/_auth/products/add-product')({
  component: AddProduct,
});

function AddProduct() {
  const {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading,
    productDetail,
    setProductDetail,
    handleSubmit,
  } = useAddProduct();

  const {
    expenseCategories,
    expenseCategoriesIsLoading,
    search: expenseCategorySearch,
    setSearch: setExpenseCategorySearch,
  } = useGetExpenseCategories();

  return (
    <DetailsTemplate
      title="Agregar Producto"
      returnButtonProps={{ to: '/products', params: {} }}
      gridSizes={{ xs: 10, sm: 10, md: 12 }}
    >
      <>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={4} mb={4}>
              <InputField
                id="search_id"
                name="search_id"
                label="Id de busqueda"
                type="text"
                formik={formik}
              />
              <InputField
                id="name"
                name="name"
                label="Nombre"
                type="text"
                formik={formik}
              />
              <SelectField
                id="can_be_purchased_only"
                name="can_be_purchased_only"
                label="Solo se puede comprar en"
                items={establishmentItems}
                formik={formik}
              />
              <SelectField
                id="inventory_subtraction"
                name="inventory_subtraction"
                label="Se resta de manera"
                items={inventorySubtractionItems}
                formik={formik}
              />
              <AutoCompleteSelect
                id="expense_category_id"
                name="expense_category_id"
                label="Se ingresa como"
                items={apiItems(expenseCategories)}
                onSelectChange={option => {
                  formik.setFieldValue('expense_category_id', option.value);
                }}
                inputValue={expenseCategorySearch}
                setInputValue={setExpenseCategorySearch}
                loading={expenseCategoriesIsLoading}
                errorMessage={
                  productFormsValidations.expense_category_id.required
                }
                error={!!formik.errors.expense_category_id}
              />
              <Checkbox
                id="has_product_detail"
                name="has_product_detail"
                label="Es equivalente a otros productos?"
                formik={formik}
              />
              {formik.values.has_product_detail && (
                <>
                  <Divider />
                  <Typography variant="h3">Productos Relacionados</Typography>
                  <Stack spacing={4}>
                    <List>
                      {productDetail.map((product, index) => (
                        <EditProductItem
                          key={product.id}
                          index={index}
                          product={product}
                          productsList={productDetail}
                          setProducts={setProductDetail}
                          isCombo={false}
                        />
                      ))}
                    </List>
                    <Stack direction="row" spacing={2}>
                      <AddProductItem
                        productsList={productDetail}
                        setProducts={setProductDetail}
                        isCombo={false}
                      />
                    </Stack>
                  </Stack>
                </>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ImageUploadCard
              file={selectedFile}
              setSelectedFile={handleFileSelect}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', mt: 4, justifyContent: 'end' }}>
          <Button onClick={() => handleSubmit()} isLoading={isLoading}>
            Agregar Producto
          </Button>
        </Box>
      </>
    </DetailsTemplate>
  );
}

export default AddProduct;
