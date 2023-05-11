import React from "react";
import { Alternative } from "../declarations";
import useAlternatives, {AlternativesHookValues} from "../hooks/useAlternatives";
import useCriteria, { CriteriaHookValues } from "../hooks/useCriteria";
import useDecisionMakers, {
  DecisionMakersHookValues,
} from "../hooks/useDecisionMakers";
import useModelScale, {ModelScaleHookValues} from "../hooks/useModelScale";

import useModelSteps, { ModelStepsHookValues } from "../hooks/useModelSteps";

interface ModelContextValue {
  alternatives: Alternative[];
  setAlternatives: (alts: Alternative[]) => void;
}

const ModelContext = React.createContext<
  | (ModelContextValue &
      DecisionMakersHookValues &
      CriteriaHookValues &
      AlternativesHookValues &
      ModelStepsHookValues &
			ModelScaleHookValues)
  | null
>(null);
export default ModelContext;

/**
 * Contexto que representa o modelo e como seus objetos se comunicam
 * Salva os dados em estados e expõe métodos para mudar seus valores
 */
export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const modelStepsUtils = useModelSteps();
  const modelScaleUtils = useModelScale();
  const decisionMakersUtils = useDecisionMakers();
  const criteriaUtils = useCriteria();
  const alternativesUtils = useAlternatives();

  return (
    <ModelContext.Provider
      value={{
				...modelScaleUtils,
        ...modelStepsUtils,
        ...decisionMakersUtils,
        ...criteriaUtils,
				...alternativesUtils,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const context = React.useContext(ModelContext);

  if (!context) {
    throw new Error("useModel must be used within an ModelProvider");
  }

  return context;
};
