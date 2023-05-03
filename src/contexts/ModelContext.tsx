import React from "react";
import {
  Alternative,
  Criterion,
  ModelProgressStep,
  ModelSteps,
} from "../declarations";
import useDecisionMakers, {
  DecisionMakersHookValues,
} from "../hooks/useDecisionMakers";

interface ModelContextValue {
  currentStep: ModelProgressStep;
  criteria: Criterion[];
  setCriteria: (x: Criterion[]) => void;
  alternatives: Alternative[];
  setAlternatives: (alts: Alternative[]) => void;
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
    getTotalDecisionMakersWeight,
    addCriterionJudgmentFromDecisionMaker,
  } = useDecisionMakers();

  return (
    <ModelContext.Provider
      value={{
        currentStep,
        criteria,
        setCriteria,
        alternatives,
        setAlternatives,
        decisionMakers,
        addDecisionMaker,
        setDecisionMakers,
        deleteDecisionMaker,
        getTotalDecisionMakersWeight,
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
