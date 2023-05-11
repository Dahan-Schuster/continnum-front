import React from "react";
import { Dictionary } from "../declarations";

interface ILinguisticScale {
  id: number;
  size: number;
  values: Dictionary<number>;
}

class LinguisticScale implements ILinguisticScale {
  id: number;
  size: number;
  values: Dictionary<number>;

  constructor(scale: ILinguisticScale) {
    this.id = scale.id;
    this.size = scale.size;
    this.values = scale.values;
  }

  toString() {
    return Object.keys(this.values).join(" - ");
  }
}

/**
 * Escalas linguísticas do modelo
 */
export const ModelLinguisticScales: LinguisticScale[] = [
  new LinguisticScale({
    id: 1,
    size: 5,
    values: { "Muito baixo": 1, Baixo: 2, Médio: 3, Alto: 4, "Muito Alto": 5 },
  }),
  new LinguisticScale({
    id: 2,
    size: 7,
    values: {
      "Extremamente baixo": 1,
      "Muito baixo": 2,
      Baixo: 3,
      Médio: 4,
      Alto: 5,
      "Muito Alto": 6,
      "Extremamente Alto": 7,
    },
  }),
];

export interface ModelScaleHookValues {
  linguisticScale: LinguisticScale;
  setLinguisticScale: (scale: LinguisticScale) => void;
  selectLinguisticScale: (id: number) => void;
}

/**
 * useModelScale
 */
const useModelScale = (): ModelScaleHookValues => {
  const [linguisticScale, setLinguisticScale] = React.useState<LinguisticScale>(
    ModelLinguisticScales[0]
  );

  const selectLinguisticScale = React.useCallback((id: number) => {
    const scale = ModelLinguisticScales.find((s) => s.id === id);
    if (!scale) return;
    setLinguisticScale(scale);
  }, []);

  return {
    linguisticScale,
    setLinguisticScale,
    selectLinguisticScale,
  };
};

export default useModelScale;
