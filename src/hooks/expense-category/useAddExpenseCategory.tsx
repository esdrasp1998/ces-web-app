import {
  expenseCategoryFormsValidations,
  expenseCategorySnackbarMessages,
} from 'src/constants';
import { ExpenseCategory } from './interface';
import useAddEntity from '../common/useAddEntity';
import * as yup from 'yup';
import { supabase } from 'src/supabaseClient';

type AddExpenseCategory = Omit<ExpenseCategory, 'id'>;

const useAddExpenseCategory = () => {
  const expenseCategorySchema = yup.object().shape({
    name: yup.string().required(expenseCategoryFormsValidations.name.required),
    type: yup.string().required(expenseCategoryFormsValidations.type.required),
    available_at: yup
      .string()
      .required(expenseCategoryFormsValidations.available_at.required),
  });

  const mutationFn = async (values: AddExpenseCategory) => {
    const { data } = await supabase
      .from('expense_categories')
      .insert([values])
      .select()
      .throwOnError();
    return data;
  };

  const { formik, isLoading } = useAddEntity<AddExpenseCategory>({
    initialValues: {
      name: '',
      type: '',
      available_at: '',
    },
    validationSchema: expenseCategorySchema,
    onSuccessPath: '/expenses/categories',
    successMessage: expenseCategorySnackbarMessages.success.create,
    errorMessage: expenseCategorySnackbarMessages.errors.create,
    mutationFn,
  });

  return {
    formik,
    isLoading,
  };
};

export default useAddExpenseCategory;
