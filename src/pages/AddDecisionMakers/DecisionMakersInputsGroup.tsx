import { Grid, TextField } from "@mui/material";
import React from "react";

interface DecisionMakerInputsGroupProps {
  id?: string;
  name: string;
  nameLabel?: string;
  weight: string;
  weightLabel?: string;
  onChangeName: (value: string, decisionMakerId?: string) => void;
  onChangeWeight?: (value: string, decisionMakerId?: string) => void;
  ActionButon: React.FC;
}
/**
 * Renderiza os inputs de cadastro ou edição de ume decisore
 * Recebe nome, peso e os callbacks de edição dos inputs
 *
 * O callback de edição do input de  peso é opicional pois a
 * edição do peso não é possível, sendo usado apenas no cadastro
 */
const DecisionMakerInputsGroup = React.forwardRef(
  (props: DecisionMakerInputsGroupProps, ref: React.Ref<HTMLInputElement>) => {
    const { ActionButon } = props;
    return (
      <Grid container spacing={1} p={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={ref}
            label={props.nameLabel}
            value={props.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.onChangeName(event.target.value, props.id);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={11} sm={5}>
          <TextField
            value={props.weight}
            label={props.weightLabel}
            onChange={
              !!props.onChangeWeight
                ? (event: React.ChangeEvent<HTMLInputElement>) => {
                    props.onChangeWeight!(event.target.value, props.id);
                  }
                : undefined
            }
            disabled={!props.onChangeWeight}
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

export default DecisionMakerInputsGroup;
