import { TextareaAutosize, Typography, Stack } from "@mui/material";

import { useController } from "react-hook-form";

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

const TextareaAutoSize = ({
  name,
  label,
  labelIcon = null,
  TooltipTex = "",
  customError = null,
  control,
  ...rest
}) => {
  const {
    field: { ref, ...inputprops },
  } = useController({
    name,
    control,
  });

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
      <TextareaAutosize
        {...inputprops}
        {...rest}
        ref={ref}
        style={{
          outlineColor: "#049bff",
          borderRadius: "5px",
          width: "100%",
          borderColor: "#cccccc",
          fontSize: "16px",
          padding: "10px",
          fontFamily: "inherit",
        }}
        minRows={3} // You can adjust this value as needed
      />
    </>
  );
};

export default TextareaAutoSize;
