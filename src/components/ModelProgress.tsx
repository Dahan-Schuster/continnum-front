import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { useModel } from "../contexts/ModelContext";
import { ModelSteps } from "../hooks/useModelSteps";
import colors from "../utils/colors";

interface ModelProgressProps {}

const stepCircleSize = 25;

/**
 * ModelProgress documentation
 */
const ModelProgress: React.FunctionComponent<ModelProgressProps> = () => {
  const { currentStep } = useModel();

  return (
    <Grid maxWidth={"sm"} container mx={"auto"} py={3}>
      {ModelSteps.map((step) => {
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
                borderColor: isCurrent ? colors.strong : colors.disabled,
                borderWidth: isCurrent ? 2 : 1,
                borderStyle: "solid",
              }}
            >
              <Typography component={"h2"}>{step.label}</Typography>
            </Box>
            <Typography
              fontSize={"0.9rem"}
              component={"h3"}
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
