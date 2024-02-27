import { Controller } from "react-hook-form";
import { Checkbox, Typography } from "@mui/material";

const CheckBox = ({
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
        render={({
          field: { onChange, value = false },
          fieldState: { error },
        }) => {
          return (
            <>
              <Checkbox
                // id={name}
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
            </>
          );
        }}
      />
    </>
  );
};

export default CheckBox;
