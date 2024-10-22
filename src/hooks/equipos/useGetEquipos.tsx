import { useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetEntity';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { equipoSnackbarMessages } from 'src/constants';

const useGetEquipos = () => {
  const { page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } =
    usePagination();

  const [search, setSearch] = useState('');

  const {
    data: equipos,
    dataIsLoading: equiposIsLoading,
    dataCount: equiposCount,
    dataCountIsLoading: equiposCountIsLoading,
  } = useGetData({
    page,
    rowsPerPage,
    search,
    dataQueryKey: API_KEYS.FETCH_EQUIPOS,
    countQueryKey: API_KEYS.FETCH_EQUIPOS_COUNT,
    entity: 'equipos',
    snackbarMessages: equipoSnackbarMessages,
    selectStatement: `*, categorias(nombre_categoria)`,
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    equipos,
    equiposIsLoading,
    equiposCount,
    equiposCountIsLoading,
  };
};

export default useGetEquipos;
