import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import ImageUploadCard from 'src/components/molecules/ImageUploadCard';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import useAddCombo from 'src/hooks/combos/useAddCombo';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from 'src/components/atoms/Divider';
import AddProductItem from 'src/components/organisms/AddProductItem';
import EditProductItem from 'src/components/organisms/EditProductItem';
import FormHelperText from '@mui/material/FormHelperText';

export const Route = createLazyFileRoute('/_auth/combos/add-combo')({
  component: AddCombo,
});

function AddCombo() {
  const {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading,
    handleSubmit,
    comboProducts,
    setComboProducts,
    comboProductsError,
  } = useAddCombo();

  return (
    <DetailsTemplate
      title="Agregar Combo"
      returnButtonProps={{ to: '/combos', params: {} }}
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
              <Divider />
              <Typography variant="h3">Productos Combo</Typography>
              <Stack spacing={4}>
                <List>
                  {comboProducts.map((product, index) => (
                    <EditProductItem
                      key={product.id}
                      index={index}
                      product={product}
                      productsList={comboProducts}
                      setProducts={setComboProducts}
                      isCombo={true}
                    />
                  ))}
                </List>
                <Stack direction="row" spacing={2}>
                  <AddProductItem
                    productsList={comboProducts}
                    setProducts={setComboProducts}
                    isCombo={true}
                  />
                </Stack>
                {Boolean(comboProductsError) && (
                  <FormHelperText error={Boolean(comboProductsError)}>
                    {String(comboProductsError)}
                  </FormHelperText>
                )}
              </Stack>
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
            Agregar Combo
          </Button>
        </Box>
      </>
    </DetailsTemplate>
  );
}

export default AddCombo;
