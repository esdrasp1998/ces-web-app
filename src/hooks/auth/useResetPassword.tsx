import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { authFormsValidations, authSnackbarMessages } from 'src/constants';

const useResetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const resetPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email(authFormsValidations.email.valid)
      .required(authFormsValidations.email.required),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_SUPABASE_RESET_PASSWORD_URL,
      });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      navigate({ to: '/signin' });
      enqueueSnackbar(authSnackbarMessages.success.passwordReset, {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar(authSnackbarMessages.errors.passwordReset, {
        variant: 'error',
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async values => {
      mutate(values.email);
    },
    enableReinitialize: true,
  });

  return { formik, isLoading: isPending };
};

export default useResetPassword;
