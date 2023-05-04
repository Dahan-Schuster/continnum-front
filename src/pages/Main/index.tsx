import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import Header from "../../components/Header";
import AddDecisionMakers from "../AddDecisionMakers";

import { useModel } from "../../contexts/ModelContext";
import EntryPage from "./EntryPage";

interface MainPageProps {}

/**
 * Página inicial do sistema
 */
const MainPage: React.FunctionComponent<MainPageProps> = () => {
  // dados do modelo
  const { goForward, goBack, canGoBack, canGoForward, currentRoute } =
    useModel();

  // Método para navegar pra a próxima tela
  const navigate = useNavigate();

  /**
   * Efeito lançado ao mudar a rota atual no useModelSteps
   * Navega para a rota usando o navigate
   */
  React.useEffect(() => {
    navigate(currentRoute.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);

  return (
    <Grid container height="100vh">
      <Grid item xs={12} height="fit-content">
        <Header />
      </Grid>
      <Grid item xs={12} mt={5} height="auto">
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
      <Grid
        item
        xs={12}
        px={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={goBack}
          disabled={!canGoBack}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={goForward}
          disabled={!canGoForward}
        >
          Avançar
        </Button>
      </Grid>
    </Grid>
  );
};

export default MainPage;
