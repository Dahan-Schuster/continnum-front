import React from "react";
import { Route } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import EntryPage from "./EntryPage";

interface MainPageProps {}

/**
 * Página inicial do sistema
 */
const MainPage: React.FunctionComponent<MainPageProps> = () => {
  return (
    <ReactSlideRoutes duration={1000}>
      <Route index element={<EntryPage />} />
    </ReactSlideRoutes>
  );
};

export default MainPage;
