import { Controller } from "react-hook-form";
import { TextField, Typography, Box } from "@mui/material";
import styles from "../../css/common.module.css";

const TextInput = ({
  name,
  control,
  label,
  rules = { required: false },
  customError = null,
  otherLabelComponents = null,
  hidden,
  helperText = null,
  type = "text",
  multiline = false,
  onChangeCallback = () => {},
  ...otherProps
}) => {
  const hiddenStyles = hidden ? styles.d_none : "";

  return (
    <>
      <Box className={`${styles.input_label_container} ${hiddenStyles}`}>
        <Typography sx={{ mb: 1 }} variant="body2">
          {label}
        </Typography>
        {otherLabelComponents}
      </Box>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <TextField
              id={name}
              sx={{ bgcolor: "white" }}
              variant="outlined"
              color="info"
              fullWidth
              multiline={multiline}
              size="small"
              type={type}
              value={value}
              onChange={(e, value) => {
                onChange(e, onChange);
                onChangeCallback(e.target.value);
              }}
              error={!!error || !!customError}
              helperText={
                error ? error.message : customError || helperText || null
              }
              className={hiddenStyles}
              {...otherProps}
            />
          );
        }}
      />
    </>
  );
};

export default TextInput;
