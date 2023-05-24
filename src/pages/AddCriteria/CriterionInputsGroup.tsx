import { Grid, TextField } from "@mui/material";
import React from "react";
import SelectCriterionType from "../../components/SelectCriterionType";
import { CriterionType } from "../../declarations";

interface CriterionInputsGroupProps {
  id?: string;
  description: string;
  descLabel?: string;
  type: CriterionType;
  onChangeName: (value: string, decisionMakerId?: string) => void;
  onChangeType: (value: CriterionType, decisionMakerId?: string) => void;
  ActionButon: React.FC;
}

/**
 * Renderiza os inputs de cadastro ou edição de um critério
 * Recebe nome, tipo e os callbacks de edição dos inputs
 */
const CriterionInputsGroup = React.forwardRef(
  (props: CriterionInputsGroupProps, ref: React.Ref<HTMLInputElement>) => {
    const { ActionButon, id } = props;
    const selectId = id
      ? `select-type-criterion-${id}`
      : "select-type-new-criterion";
    return (
      <Grid container spacing={1} p={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={ref}
            label={props.descLabel}
            value={props.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.onChangeName!(event.target.value, props.id);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={11} sm={5}>
          <SelectCriterionType
            id={selectId}
            onChange={(type) => props.onChangeType(type, props.id)}
            type={props.type}
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

export default CriterionInputsGroup;
