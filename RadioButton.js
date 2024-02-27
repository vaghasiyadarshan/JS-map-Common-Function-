import { Controller } from "react-hook-form";
import { Radio, Stack, Typography } from "@mui/material";

const RadioButton = ({
  name,
  control,
  label,
  rules = { required: false },
  customError = null,
  ...otherProps
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <Stack direction="row" alignItems="center">
              <Radio
                id={name}
                variant="outlined"
                color="info"
                value={value}
                checked={value}
                onChange={onChange}
                {...otherProps}
              />

              <Typography component="span" variant="body2">
                {label}
              </Typography>
            </Stack>
          );
        }}
      />
    </>
  );
};

export default RadioButton;
