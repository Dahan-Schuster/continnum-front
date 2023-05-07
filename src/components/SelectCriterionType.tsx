import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { CriterionType } from "../declarations";

interface SelectCriterionTypeProps {
  id: string;
  onChange: (t: CriterionType) => void;
  type?: CriterionType;
	fullWidth?: boolean;
}

/**
 * SelectCriterionType documentation
 */
const SelectCriterionType: React.FunctionComponent<
  SelectCriterionTypeProps
> = ({ id, onChange, type, fullWidth = false }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id + "-label"}>Tipo</InputLabel>
      <Select
        labelId={id + "-label"}
        id={id}
        value={type}
        label="Tipo"
        onChange={(e) => onChange(e.target.value as CriterionType)}
				fullWidth={fullWidth}
      >
        <MenuItem value={"benefit"}>Benefício</MenuItem>
        <MenuItem value={"cost"}>Custo</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectCriterionType;
