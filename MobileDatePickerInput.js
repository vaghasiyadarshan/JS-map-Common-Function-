import { Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "../../config/dayjs";
import { DatePicker } from "@mui/x-date-pickers";
// import { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import API from "../../config/axios";
import { toast } from "react-hot-toast";

const MobileDatePickerInput = ({
  name,
  control,
  label,
  rules = { required: false },
  customError = null,
  isWeek = false,
  ...otherProps
}) => {
  const periodListController = useRef(new AbortController());
  const [periodList, setPeriodList] = useState([]);

  const isInPeriods = (date) => {
    const formattedDate = date.format("YYYY-MM");
    return !periodList.some((period) => {
      return (
        `${period.year}-${period.period.toString().padStart(2, "0")}` ===
        formattedDate
      );
    });
  };

  const getPeriodList = () => {
    // Cancel the previous request
    periodListController.current.abort();
    periodListController.current = new AbortController();

    API.get(`users/periods`, {
      signal: periodListController.current.signal,
    })
      .then((res) => {
        const resData = res.data;
        resData.data.sort((a, b) => (a.year > b.year ? 1 : -1));
        console.log(resData.data);
        if (resData.status) {
          // Set Period List
          setPeriodList(resData.data);
        } else {
          toast.error("Something Went Wrong Getting Periods Data");
        }
      })
      .catch((error) => {
        if (!error.code || error.code !== "ERR_CANCELED") {
          toast.error("Something Went Wrong Getting Periods Data");
        }
      })
      .finally(() => {
        // setIsLoadingPeriods(false);
      });
  };

  useEffect(() => {
    getPeriodList();
    // eslint-disable-next-line
  }, []);

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
            // const shouldDisableDate = (date) => {
            //   const day = dayjs(date).day(); // 0: Sunday, 1: Monday, ..., 6: Saturday
            //   return day >= 1 && day <= 5; // Disable Monday to Friday
            // };
            return (
              <>
                <span id={name}></span>
                <DatePicker
                  variant="outlined"
                  fullWidth
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "40px",
                      bgcolor: "white",
                    },
                    "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0080ff",
                    },
                    "&.has_error fieldset": {
                      borderColor: "#d63f2f !important",
                    },
                  }}
                  value={value}
                  shouldDisableDate={isInPeriods}
                  onChange={onChange}
                  inputFormat="DD/MM/YYYY" // Define the input format here
                  // shouldDisableDate={isWeek ? shouldDisableDate : () => false}
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

export default MobileDatePickerInput;
