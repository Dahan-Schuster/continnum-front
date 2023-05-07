import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import Header from "../../components/Header";
import AddDecisionMakers from "../AddDecisionMakers";

import { useModel } from "../../contexts/ModelContext";
import EntryPage from "./EntryPage";
import AddCriteria from "../AddCriteria";
import AddAlternatives from "../AddAlternatives";
import SelectLinguisticScale from "../SelectLinguisticScale";

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
      <Grid item xs={12} mb={2}>
        <Typography
          variant="h2"
          textAlign={"center"}
          fontSize={"1.5rem"}
          fontWeight="bold"
          textTransform={"capitalize"}
        >
          {currentRoute.label}
        </Typography>
        <Typography
          component="p"
          textAlign={"center"}
          fontSize={"1rem"}
        >
          {currentRoute.description}
        </Typography>
      </Grid>
      <Grid item xs={12} py={5} height="auto">
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          px={1}
        >
          <ReactSlideRoutes duration={500}>
            <Route index element={<EntryPage />} />
            <Route path="/dms" element={<AddDecisionMakers />} />
            <Route path="/criteria" element={<AddCriteria />} />
            <Route path="/alternatives" element={<AddAlternatives />} />
            <Route
              path="/linguistic-scale"
              element={<SelectLinguisticScale />}
            />
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
