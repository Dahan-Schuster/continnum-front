import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { useModel } from "../contexts/ModelContext";
import { ModelSteps } from "../hooks/useModelSteps";
import { useMuiTheme } from "../hooks/useMuiTheme";

interface ModelProgressProps {}

const stepCircleSize = 42;

/**
 * ModelProgress documentation
 */
const ModelProgress: React.FunctionComponent<ModelProgressProps> = () => {
  const { currentStep } = useModel();
  const { palette } = useMuiTheme();

  return (
    <Grid container maxWidth={"sm"} mx={"auto"} py={3}>
      {ModelSteps.map((step) => {
        const isDone = step.order < currentStep.order;
        const isCurrent = step.order === currentStep.order;

        return (
          <Grid
            key={step.order}
            item
            xs={4}
            display={"flex"}
            flexDirection="column"
            alignItems="center"
          >
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              mb={1}
              sx={{
                width: `${stepCircleSize}px`,
                height: `${stepCircleSize}px`,
                borderRadius: `${stepCircleSize / 2}px`,
                borderColor:
                  isCurrent || isDone
                    ? palette.primary.main
                    : palette.secondary.main,
                backgroundColor: isDone ? palette.primary.main : "#fff",
                borderWidth: 2,
                borderStyle: "solid",
              }}
            >
              <Typography
                component={"h2"}
                color={
                  isDone
                    ? "primary.contrastText"
                    : isCurrent
                    ? "primary.main"
                    : "text.disabled"
                }
              >
                {step.label}
              </Typography>
            </Box>
            <Typography
              fontSize={"0.8rem"}
              component={"h3"}
              color={isCurrent || isDone ? "text.secondary" : "text.disabled"}
              fontWeight={isCurrent ? "bold" : "normal"}
            >
              {step.description}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ModelProgress;
