import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { FormikProps } from 'formik';

interface SelectItem {
  label: string;
  value: any;
}

interface SelectFieldProps extends SelectProps {
  id: string;
  name: string;
  noneOption?: boolean;
  items: SelectItem[];
  helperText?: string | false | undefined;
  formik?: FormikProps<any>;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  noneOption = false,
  items,
  helperText,
  error,
  formik,
  ...rest
}) => {
  const formikError = formik?.errors?.[id];
  const inputError = formik ? Boolean(formikError) : error;
  const inputHelperText =
    formikError !== undefined ? String(formikError) : helperText;
  const handleChange = formik ? formik.handleChange : onChange;
  const displayValue = formik ? formik.values?.[id] : value;

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }} error={inputError}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        label={label}
        {...rest}
        size="small"
        fullWidth
        variant="standard"
      >
        {noneOption && (
          <MenuItem value="">
            <em>Ninguno</em>
          </MenuItem>
        )}
        {items.map(selectItem => (
          <MenuItem key={selectItem.label} value={selectItem.value}>
            {selectItem.label}
          </MenuItem>
        ))}
      </Select>
      {inputHelperText && <FormHelperText>{inputHelperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
