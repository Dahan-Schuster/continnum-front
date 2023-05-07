import {Grid} from "@mui/material";
import React from "react";
import ModelProgress from "./ModelProgress";

interface HeaderProps {}

/**
 * Header documentation
 */
const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <Grid container width={"100%"}>
      <ModelProgress />
    </Grid>
  );
};

export default Header;
