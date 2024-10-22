export interface Product {
  id: string;
  id_categoria: string;
  tipo_equipo: string;
  fecha_adquisicion: Date;
  estado: string;
  num_serie_equipo: string;
  bucket_id: string | null;
}