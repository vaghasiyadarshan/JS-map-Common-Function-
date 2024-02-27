import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Paper, Typography, Stack, Grid } from "@mui/material";
import API from "../../config/axios";
import { toast } from "react-hot-toast";
import CustomBtn from "../../components/CustomBtn";
import TextInput from "../../components/form/TextInput";
import { highlightField } from "../../utils/Commons";
import CheckBox from "../../components/form/CheckBox";
import { useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  year: "",
  period: "",
  status: false,
};

export default function AddPeriod() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const location = useLocation();
  const urlState = location.state;

  const validationSchema = yup.object().shape({
    year: yup
      .number()
      .required("Year is required")
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return null;
        }
        return value;
      })
      .test("is-four-digits", "Jaartal bestaat uit vier cijfers", (value) => {
        // Check if the value is exactly 4 digits
        return /^\d{4}$/.test(value);
      }),
    period: yup
      .number()
      .required("period is required")
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return null;
        }
        return value;
      })
      .max(13, "een periode mag niet meer dan 13 zijn"),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const formData = {
      year: data.year,
      period: data.period,
      status: data.status,
    };

    setIsLoading(true);

    const requestStartTime = Date.now();

    API.post("users/periods", formData)
      .then((res) => {
        const resData = res.data;

        setInputErrors({});

        if (resData.status) {
          toast.success(t("period.period_added_successfully"));

          if (urlState) {
            if (urlState?.url) {
              navigate(`${urlState?.url}`, {
                replace: true,
                state: { urlState },
              });
            }
          } else {
            navigate("/period", { replace: true });
          }
        } else {
          if (resData && resData.type === "VALIDATION") {
            setInputErrors(resData.error);
            try {
              highlightField(Object.keys(resData.error)[0]);
            } catch (error) {
              console.warn("Field cannot be highlighted");
            }
          } else {
            toast.error(resData?.error?.message || "Something went wrong");
          }
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        const requestEndTime = Date.now();
        const timeOutMileSeconds = requestEndTime - requestStartTime;

        if (timeOutMileSeconds > 300) {
          setIsLoading(false);
        } else {
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      });
  };

  const onError = (errors) => {
    try {
      highlightField(Object.keys(errors)[0]);
    } catch (error) {
      console.warn("Field cannot be highlighted");
    }
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ mb: 2 }}
        justifyContent="flex-start"
        alignItems={{ xs: "start", sm: "center" }}
        spacing={1}
      >
        <Typography component="h1" sx={{ fontSize: "20px", flexGrow: 1 }}>
          {t("period.add_period")}
        </Typography>
      </Stack>
      <Paper
        sx={{ backgroundColor: "primaryBg.light", borderRadius: 2, p: 2 }}
        elevation={2}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container spacing={3} columns={12}>
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  name="year"
                  type="number"
                  label={t("period.fields.year")}
                  control={control}
                  customError={inputErrors.year || null}
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  name="period"
                  type="number"
                  label={t("period.fields.period")}
                  control={control}
                  customError={inputErrors.period || null}
                />
              </Grid>
            </Grid>
            <Grid direction="row" container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <CheckBox
                  name="status"
                  label={t("period.fields.status")}
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={3}>
                <CustomBtn
                  variant="contained"
                  color="secondary"
                  sx={{ paddingLeft: 2, paddingRight: 2 }}
                  disableRipple
                  type="submit"
                  loading={isLoading}
                >
                  {t("common_btn.submit")}
                </CustomBtn>
                <CustomBtn
                  variant="outlined"
                  color="secondary"
                  sx={{ paddingLeft: 2, paddingRight: 2 }}
                  onClick={() => navigate("/period", { replace: true })}
                >
                  {t("common_btn.cancel")}
                </CustomBtn>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
