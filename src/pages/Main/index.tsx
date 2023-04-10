import React from "react";
import { Route } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import AddDecisionMakers from "../AddDecisionMakers";
import EntryPage from "./EntryPage";

interface MainPageProps {}

/**
 * Página inicial do sistema
 */
const MainPage: React.FunctionComponent<MainPageProps> = () => {
  return (
    <ReactSlideRoutes duration={1000}>
      <Route index element={<EntryPage />} />
      <Route path="/dms" element={<AddDecisionMakers />} />
      {/*
			<Route path="/criteria" element={<AddCriteria />} />
      <Route path="/alternatives" element={<AddAlternatives />} />
			*/}
    </ReactSlideRoutes>
  );
};

export default MainPage;
