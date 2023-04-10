import { makeStyles } from "@mui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ModelProvider } from "./contexts/ModelContext";
import MainPage from "./pages/Main";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f7f7f7",
  },
  mainContainer: {
    background: "#f1f1f1",
    borderRadius: 8,
    border: "1px black solid",
		padding: "2rem 4rem",
  },
});

function App() {
  const classes = useStyles();
  return (
    <ModelProvider>
      <div className={classes.root}>
        <div className={classes.mainContainer}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </ModelProvider>
  );
}

export default App;
