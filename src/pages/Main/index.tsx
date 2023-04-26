import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Route } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import Header from "../../components/Header";
import AddDecisionMakers from "../AddDecisionMakers";
import EntryPage from "./EntryPage";

interface MainPageProps {}

/**
 * Página inicial do sistema
 */
const MainPage: React.FunctionComponent<MainPageProps> = () => {
  return (
    <Grid container height="100vh">
      <Grid item xs={12} height="fit-content">
        <Header />
      </Grid>
      <Grid item xs={12} height="100%">
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          px={1}
        >
          <ReactSlideRoutes duration={500}>
            <Route index element={<EntryPage />} />
            <Route path="/dms" element={<AddDecisionMakers />} />
            {/*
						<Route path="/criteria" element={<AddCriteria />} />
						<Route path="/alternatives" element={<AddAlternatives />} />
						*/}
          </ReactSlideRoutes>
        </Box>
      </Grid>
      <Grid item xs={12} height="fit-content">
        <div>rodapé</div>
      </Grid>
    </Grid>
  );
};

export default MainPage;
