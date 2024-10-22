import { createLazyFileRoute } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from '@tanstack/react-router';
import Button from 'src/components/atoms/Button';
import { InputField } from 'src/components/atoms/InputField';
import TableUI from 'src/components/atoms/TableUI';
import {
  formatTimestamp
} from 'src/utils';
import { useNavigate } from '@tanstack/react-router';
//import useDeleteEquipo from 'src/hooks/equipos/useDeleteEquipo';
import useGetEquipos from 'src/hooks/equipos/useGetEquipos';
//import { Equipo } from 'src/hooks/equipos/interface';

export const Route = createLazyFileRoute('/_auth/equipos/')({
  component: Equipos,
});

const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: equipo => <span>{equipo.row.original.id}</span>,
  },
  {
    accessorKey: 'tipo_equipo',
    header: 'Tipo de Equipo',
    cell: equipo => <span>{equipo.row.original.tipo_equipo}</span>,
  },
  {
    accessorKey: 'fecha_adquisicion',
    header: 'Fecha de Adquisición',
    cell: equipo => <span>{equipo.row.original.fecha_adquisicion}</span>,
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: equipo => <span>{equipo.row.original.estado}</span>,
  },
  {
    accessorKey: 'num_serie_equipo',
    header: 'Número de Serie',
    cell: equipo => <span>{equipo.row.original.num_serie_equipo}</span>,
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
    cell: equipo => (
      <span>{formatTimestamp(equipo.row.original.created_at)}</span>
    ),
  },
  {
    accessorKey: 'updated_at',
    header: 'Actualizado',
    cell: equipo => (
      <span>{formatTimestamp(equipo.row.original.updated_at)}</span>
    ),
  },
];

function Equipos() {
  const navigate = useNavigate();
  //const { setEquipoToDelete } = useDeleteEquipo();
  const {
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
  } = useGetEquipos();

  /*
  const handleViewRow = (equipo: Equipo) => {
    navigate({ to: '/equipos/$id', params: { id: equipo.id } });
  };

  const handleEditRow = (equipo: Equipo) => {
    navigate({ to: '/equipos/$id/edit', params: { id: equipo.id } });
  };

  const handleDeleteRow = (equipo: Equipo) => {
    setEquipoToDelete(equipo);
  };
  */

  return (
    <>
      <Typography variant="h1">Equipos</Typography>
      <Box my={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
        >
          <InputField
            id="search"
            name="search"
            label="Buscar por nombre de equipo"
            type="text"
            variant="outlined"
            size="small"
            sx={{ minWidth: '300px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            endIcon={<AddCircleIcon />}
            sx={{ mx: 'auto', mb: 2 }}
            component={Link}
            to="/products/add-product"
          >
            Agregar Equipo
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={equipos || []}
        columns={columns}
        emptyText="No se encontraron equipos"
        isFetching={equiposIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={equiposCount}
        recordsCountLoading={equiposCountIsLoading}
        /*
          handleViewRow={handleViewRow}
          handleEditRow={handleEditRow}
          handleDeleteRow={handleDeleteRow}
        */
      />
    </>
  );
}
