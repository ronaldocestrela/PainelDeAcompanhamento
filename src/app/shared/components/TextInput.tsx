import { TextField, type TextFieldProps } from "@mui/material";
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

type TextInputProps<T extends FieldValues> = {} & UseControllerProps<T> &
  TextFieldProps;

export default function TextInput<T extends FieldValues>(
  textInputProps: TextInputProps<T>
) {
  const { field, fieldState } = useController({ ...textInputProps });
  return (
    <TextField
      {...textInputProps}
      {...field}
      value={field.value ?? ""}
      onChange={(e) => {
        field.onChange(e.target.value);
        if (typeof textInputProps.onChange === "function") {
          textInputProps.onChange(e);
        }
      }}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}

export { TextInput };
