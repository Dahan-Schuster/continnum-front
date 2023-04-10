import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

import config from "../../config.json";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const EntryPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = () => {
    navigate("/dms");
  };

  return (
    <div className={classes.content}>
      <Typography variant="h1" mb={1} textAlign="center">
        {config.appName}
      </Typography>
      <Typography variant="h4" mb={2} textAlign={"center"}>
        {config.description}
      </Typography>
      <Button color="primary" variant="contained" onClick={handleClick}>
        Start model
      </Button>
    </div>
  );
};

export default EntryPage;
