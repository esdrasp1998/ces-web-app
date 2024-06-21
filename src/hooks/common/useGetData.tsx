import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';

interface UseGetDataProps {
  page: number;
  dataQueryKey: string | readonly string[];
  countQueryKey: string | readonly string[];
  rowsPerPage: number;
  search?: string;
  searchField?: string;
  entity: string;
  snackbarMessages: {
    errors: {
      list: string;
      count: string;
    };
  };
}

const useGetData = ({ 
  page, 
  rowsPerPage,
  search = '', 
  searchField = 'name',
  entity, 
  snackbarMessages,
  dataQueryKey,
  countQueryKey
} : UseGetDataProps) => {

  const getData = async () => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage - 1;

    let query = supabase.from(entity).select('*');

    if (search) {
      query = query.ilike(searchField, `%${search}%`);
    }

    query = query.order('created_at', { ascending: false }).range(start, end);

    const { data } = await query.throwOnError();

    return data;
  };

  const getDataCount = async () => {
    let countQuery = supabase.from(entity).select('*', { count: 'exact', head: true });

    if (search) {
      countQuery = countQuery.ilike(searchField, `%${search}%`);
    }

    const { count } = await countQuery.throwOnError();

    return count;
  };

  const { isLoading: dataIsLoading, isError: dataIsError, data } = useQuery(
    {
      queryKey: [dataQueryKey, {page, rowsPerPage, search}],
      queryFn: () => getData(),
      placeholderData: keepPreviousData,
      throwOnError: () => {
        enqueueSnackbar(snackbarMessages.errors.list, { variant: 'error' });
        return true;
      }
    }
  );
  
  const { isLoading: dataCountIsLoading, isError: dataCountIsError, data: dataCount } = useQuery(
    {
      queryKey: [countQueryKey, search],
      queryFn: () => getDataCount(),
      throwOnError: () => {
        enqueueSnackbar(snackbarMessages.errors.count, { variant: 'error' });
        return true;
      }
    }
  );

  return { 
    dataIsLoading, 
    dataIsError, 
    data, 
    dataCountIsLoading, 
    dataCountIsError, 
    dataCount 
  };
};

export default useGetData;