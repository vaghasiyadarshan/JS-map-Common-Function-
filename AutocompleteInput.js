import { Controller } from "react-hook-form";
import { Autocomplete, Typography, TextField, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 800,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const AutocompleteInput = ({
  name,
  control,
  label,
  defaultValue,
  rules = { required: false },
  customError = null,
  renderInputProps = {},
  helperText = null,
  labelIcon = null,
  TooltipTex = "",
  disableClearable = false,
  onChangeCallback = () => {},
  ...otherProps
}) => {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="body2" textAlign="center">
          {label}
        </Typography>
        {labelIcon && (
          <CustomWidthTooltip title={TooltipTex} arrow>
            {labelIcon}
          </CustomWidthTooltip>
        )}
      </Stack>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({
          field: { onChange, value = null },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              id={name}
              fullWidth
              size="small"
              value={value}
              onChange={(_, value, reason) => {
                onChange(value);
                onChangeCallback(_, value, reason);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ bgcolor: "white" }}
                  {...params}
                  {...renderInputProps}
                  variant="outlined"
                  color="info"
                  error={!!error || !!customError}
                  helperText={
                    error ? error.message : customError || helperText || null
                  }
                />
              )}
              disableClearable={disableClearable}
              {...otherProps}
            />
          );
        }}
      />
    </>
  );
};

export default AutocompleteInput;
