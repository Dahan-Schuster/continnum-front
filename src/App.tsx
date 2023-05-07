import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ModelProvider } from "./contexts/ModelContext";
import { useMuiTheme } from "./hooks/useMuiTheme";
import MainPage from "./pages/Main";

function App() {
  const muiTheme = useMuiTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <ModelProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/model/*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </ModelProvider>
    </ThemeProvider>
  );
}

export default App;
