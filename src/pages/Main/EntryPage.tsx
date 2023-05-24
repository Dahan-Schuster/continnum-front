import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import config from "../../config.json";
import { useModel } from "../../contexts/ModelContext";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const EntryPage = () => {
  const classes = useStyles();
  const { setCanGoForward, setCanGoBack, setValidationMessage } = useModel();

  React.useEffect(() => {
    setCanGoForward(true);
    setCanGoBack(false);
		setValidationMessage("");
  }, [setCanGoBack, setCanGoForward]);

  return (
    <div className={classes.content}>
      <Typography variant="h1" mb={1} textAlign="center">
        {config.appName}
      </Typography>
      <Typography variant="h4" mb={2} textAlign={"center"}>
        {config.description}
      </Typography>
    </div>
  );
};

export default EntryPage;
