import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useModel } from "../../contexts/ModelContext";
import { ModelLinguisticScales } from "../../hooks/useModelScale";

interface SelectLinguisticScaleProps {}

/**
 * Tela para selecionar a escala de termos linguísticos do modelo
 */
const SelectLinguisticScale: React.FunctionComponent<
  SelectLinguisticScaleProps
> = () => {
  const { setCanGoBack, linguisticScale, selectLinguisticScale } = useModel();

  /**
   * Callback de mudança do RadioGroup
   * Seleciona a escala linguística com o ID igual ao valor do radio
   */
  const handleOnChangeScale = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      selectLinguisticScale(Number(event.target.value));
    },
    [selectLinguisticScale]
  );

	React.useEffect(() => {
		setCanGoBack(true)
	}, []);

  return (
    <Box display="flex" justifyContent="center">
      <FormControl>
        <RadioGroup
          aria-labelledby="linguistic-scale-radio-buttons-group-label"
          defaultValue={1}
          name="linguistic-scale-radio-buttons-group"
          onChange={handleOnChangeScale}
        >
          <FormLabel id="linguistic-scale-radio-buttons-group-label" />
          {ModelLinguisticScales.map((scale) => {
            const checked = linguisticScale.id === scale.id;
            return (
              <FormControlLabel
                checked={checked}
                key={String(scale.id)}
                value={scale.id}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                      },
                    }}
                  />
                }
                label={scale.toString()}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: checked ? "text.secondary" : "text.disabled",
                    fontWeight: 400,
                    padding: "8px 16px",
                    backgroundColor: checked ? "primary.light" : "transparent",
                    borderRadius: "6px",
                    maxWidth: "400px",
                  },
                }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SelectLinguisticScale;
