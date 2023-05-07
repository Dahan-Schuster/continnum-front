import { Grid, RegularBreakpoints, Typography } from "@mui/material";
import React from "react";
import {useMuiTheme} from "../hooks/useMuiTheme";

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
	const muiTheme = useMuiTheme();

  return (
    <Grid item px={1} {...gridProps}>
      <Typography
        variant="h3"
        sx={{
          fontSize: 12,
          textAlign: "left",
          color: muiTheme.palette.primary.main,
        }}
      >
        {text}
      </Typography>
    </Grid>
  );
};

export default CustomInputLabel;
