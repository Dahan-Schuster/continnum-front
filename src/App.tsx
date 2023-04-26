import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ModelProvider } from "./contexts/ModelContext";
import MainPage from "./pages/Main";

function App() {
  return (
    <ModelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ModelProvider>
  );
}

export default App;
