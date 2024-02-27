import { Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
const MobileTimePickerInput = ({
  name,
  control,
  label,
  rules = { required: false },
  customError = null,
  ...otherProps
}) => {
  return (
    <>
      <Typography sx={{ mb: 1 }} variant="body2">
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <span id={name}></span>
                <TimePicker
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  variant="outlined"
                  fullWidth
                  ampm={false}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "40px",
                    },
                    "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0080ff",
                    },
                    "&.has_error fieldset": {
                      borderColor: "#d63f2f !important",
                    },
                  }}
                  value={value}
                  onChange={onChange}
                  className={!!error || !!customError ? "has_error" : ""}
                  {...otherProps}
                />
                {(!!error || !!customError) && (
                  <Typography style={{ color: "#d63f2f" }} variant="caption">
                    {error ? error.message : customError || null}
                  </Typography>
                )}
              </>
            );
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default MobileTimePickerInput;
