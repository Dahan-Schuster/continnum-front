import { Grid, TextField } from "@mui/material";
import React from "react";

interface AlternativeInputsGroupProps {
  id?: string;
  name: string;
  descLabel?: string;
  onChangeName: (value: string, decisionMakerId?: string) => void;
  ActionButon: React.FC;
}

/**
 * Renderiza os inputs de cadastro ou edição de uma alternativa
 * Recebe nome, tipo e os callbacks de edição dos inputs
 */
const AlternativeInputsGroup = React.forwardRef(
  (props: AlternativeInputsGroupProps, ref: React.Ref<HTMLInputElement>) => {
    const { ActionButon } = props;

    return (
      <Grid container spacing={1} p={1}>
        <Grid item xs={11}>
          <TextField
            inputRef={ref}
            label={props.descLabel}
            value={props.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.onChangeName!(event.target.value, props.id);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={1} display="flex" alignItems="center">
          <ActionButon />
        </Grid>
      </Grid>
    );
  }
);

export default AlternativeInputsGroup;
