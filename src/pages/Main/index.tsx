import { Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
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
import { Box, Container } from "@mui/system";
import { useMuiTheme } from "../../hooks/useMuiTheme";

interface MainPageProps {}

/**
 * Página inicial do sistema
 */
const MainPage: React.FunctionComponent<MainPageProps> = () => {
  // dados do modelo
  const {
    goForward,
    goBack,
    canGoBack,
    canGoForward,
    currentRoute,
    validationMessage,
  } = useModel();

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

  const { palette } = useMuiTheme();

  return (
    <Box sx={{ backgroundColor: palette.background.default }}>
      <Container>
        <Stack height="100vh" spacing={2} py={2}>
          <Header />
          <Typography
            component="p"
            textAlign={"center"}
            fontSize={"1.5rem"}
            color="text.primary"
          >
            {currentRoute.description}
          </Typography>
          <Typography
            component="p"
            textAlign={"center"}
            fontSize={"1.0rem"}
            color="text.secondary"
          >
            {validationMessage}
          </Typography>
          <Box flex={1} display="flex" alignItems="flex-start" py={5}>
            <Box sx={{ width: "100%" }}>
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
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant={canGoBack ? "contained" : "outlined"}
              onClick={canGoBack ? goBack : undefined}
              color={canGoBack ? "primary" : "secondary"}
            >
              Voltar
            </Button>
            <Tooltip
              title={
                <Typography
                  component="p"
                  textAlign={"center"}
                  fontSize={"0.8rem"}
                  color="background"
                >
                  {validationMessage}
                </Typography>
              }
            >
              <Button
                variant={canGoForward ? "contained" : "outlined"}
                onClick={canGoForward ? goForward : undefined}
                color={canGoForward ? "primary" : "secondary"}
              >
                Avançar
              </Button>
            </Tooltip>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default MainPage;
