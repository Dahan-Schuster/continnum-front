import React from "react";
import { Alternative } from "../declarations";
import useCriteria, { CriteriaHookValues } from "../hooks/useCriteria";
import useDecisionMakers, {
  DecisionMakersHookValues,
} from "../hooks/useDecisionMakers";

import useModelSteps, { ModelStepsHookValues } from "../hooks/useModelSteps";

interface ModelContextValue {
  alternatives: Alternative[];
  setAlternatives: (alts: Alternative[]) => void;
}

const ModelContext = React.createContext<
  | (ModelContextValue &
      DecisionMakersHookValues &
      CriteriaHookValues &
      ModelStepsHookValues)
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
  const [alternatives, setAlternatives] = React.useState<Alternative[]>([]);

  const modelStepsUtils = useModelSteps();
  const decisionMakersUtils = useDecisionMakers();
  const criteriaUtils = useCriteria();

  return (
    <ModelContext.Provider
      value={{
        alternatives,
        setAlternatives,
        ...modelStepsUtils,
        ...decisionMakersUtils,
        ...criteriaUtils,
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
