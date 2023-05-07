import { Grid, RegularBreakpoints, Typography } from "@mui/material";
import React from "react";

interface InputLabelProps {
  text: string;
}

/**
 * Label para inputs de formulário
 */
const CustomInputLabel: React.FC<InputLabelProps & RegularBreakpoints> = ({
  text,
  ...gridProps
}) => {
  return (
    <Grid item px={1} mb={1} {...gridProps}>
      <Typography
        variant="h3"
        sx={{
          fontSize: 12,
          textAlign: "left",
          color: "primary.main",
        }}
      >
        {text}
      </Typography>
    </Grid>
  );
};

export default CustomInputLabel;
