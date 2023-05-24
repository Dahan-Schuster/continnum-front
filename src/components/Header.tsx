import {Grid, Typography} from "@mui/material";
import React from "react";
import ModelProgress from "./ModelProgress";

import config from "../config.json";

interface HeaderProps {}

/**
 * Header documentation
 */
const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <Grid container width={"100%"}>
			<Grid item xs={12} mb={5}>
				<Typography
					color="primary"
					variant="h1"
					sx={{ fontSize: '2.5rem' }}
				>
				{config.appName}
				</Typography>
			</Grid>
      <ModelProgress />
    </Grid>
  );
};

export default Header;
