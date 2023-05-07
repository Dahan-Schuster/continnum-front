import { FormControl, MenuItem, Select } from "@mui/material";
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
      <Select
				placeholder="Selecione o tipo"
        id={id}
        value={type}
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
