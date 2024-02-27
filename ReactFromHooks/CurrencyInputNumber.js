import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Typography, Box, InputAdornment } from "@mui/material";
import styles from "../../css/common.module.css";
import { NumericFormat } from "react-number-format";

const CurrencyInputNumber = ({
  name,
  control,
  label,
  rules = { required: false },
  customError = null,
  otherLabelComponents = null,
  hidden,
  helperText = null,
  currency = true,
  helperTextIcon = "€",
  onChangeCallback = () => {},
  disabled = false,
  textFieldProps = {},
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
        render={({
          field: { onChange, value = null },
          fieldState: { error },
        }) => {
          const materialUITextFieldProps = {
            id: name, // Changed this line to properly set the 'id'
            sx: { bgcolor: "white" },
            variant: "outlined",
            fullWidth: true,
            color: "info",
            size: "small",
            error: !!error || !!customError,
            helperText: error
              ? error.message
              : customError || helperText || null,
            className: hiddenStyles,
            disabled: disabled,

            InputProps: currency
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      {helperTextIcon}
                    </InputAdornment>
                  ),
                }
              : {},
          };
          return (
            <NumericFormat
              value={value}
              decimalSeparator=","
              allowLeadingZeros
              thousandSeparator="."
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => {
                const { value } = values;
                onChange(Number(value)); // Update the form data with the new value
                onChangeCallback(value);
              }}
              customInput={TextField}
              {...materialUITextFieldProps}
              {...textFieldProps}
            />
          );
        }}
      />
    </>
  );
};

export default CurrencyInputNumber;
