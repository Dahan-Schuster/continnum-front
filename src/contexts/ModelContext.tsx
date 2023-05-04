import React from "react";
import { Alternative, Criterion } from "../declarations";
import useDecisionMakers, {
  DecisionMakersHookValues,
} from "../hooks/useDecisionMakers";

import useModelSteps, { ModelStepsHookValues } from "../hooks/useModelSteps";

interface ModelContextValue {
  criteria: Criterion[];
  setCriteria: (x: Criterion[]) => void;
  alternatives: Alternative[];
  setAlternatives: (alts: Alternative[]) => void;
}

const ModelContext = React.createContext<
  (ModelContextValue & DecisionMakersHookValues & ModelStepsHookValues) | null
>(null);
export default ModelContext;

/**
 * Contexto que representa o modelo e como seus objetos se comunicam
 * Salva os dados em estados e expõe métodos para mudar seus valores
 */
export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [criteria, setCriteria] = React.useState<Criterion[]>([]);
  const [alternatives, setAlternatives] = React.useState<Alternative[]>([]);

  const modelStepsUtils = useModelSteps();
  const decisionMakersUtils = useDecisionMakers();

  return (
    <ModelContext.Provider
      value={{
        criteria,
        setCriteria,
        alternatives,
        setAlternatives,
        ...modelStepsUtils,
        ...decisionMakersUtils,
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
