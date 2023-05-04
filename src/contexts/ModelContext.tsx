import React from "react";
import { Alternative, Criterion } from "../declarations";
import useDecisionMakers, {
  DecisionMakersHookValues,
} from "../hooks/useDecisionMakers";

import useModelSteps, { ModelStepsHookValues } from "../hooks/useModelSteps";

interface ModelContextValue {
  currentStep: ModelProgressStep;
  criteria: Criterion[];
  setCriteria: (x: Criterion[]) => void;
  alternatives: Alternative[];
  setAlternatives: (alts: Alternative[]) => void;
  canGoForward: boolean;
  setCanGoForward: (doesIt: boolean) => void;
}

const ModelContext = React.createContext<
  (ModelContextValue & DecisionMakersHookValues) | null
>(null);
export default ModelContext;

/**
 * Contexto que representa o modelo e como seus objetos se comunicam
 * Salva os dados em estados e expõe métodos para mudar seus valores
 */
export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [canGoForward, setCanGoForward] = React.useState<boolean>(false);
  const [currentStep, setCurrentStep] = React.useState<ModelProgressStep>(
    ModelSteps[0]
  );

  const [criteria, setCriteria] = React.useState<Criterion[]>([]);
  const [alternatives, setAlternatives] = React.useState<Alternative[]>([]);

  const {
    decisionMakers,
    addDecisionMaker,
    setDecisionMakers,
    deleteDecisionMaker,
    totalDecisionMakersWeight,
    addCriterionJudgmentFromDecisionMaker,
  } = useDecisionMakers();

  return (
    <ModelContext.Provider
      value={{
        canGoForward,
        setCanGoForward,
        currentStep,
        criteria,
        setCriteria,
        alternatives,
        setAlternatives,
        decisionMakers,
        addDecisionMaker,
        setDecisionMakers,
        deleteDecisionMaker,
        totalDecisionMakersWeight,
        addCriterionJudgmentFromDecisionMaker,
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
