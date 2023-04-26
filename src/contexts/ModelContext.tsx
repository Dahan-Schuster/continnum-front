import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import React from "react";
import {
  Alternative,
  Criterion,
  CriterionJudgment,
  DecisionMaker,
  ModelProgressStep,
  ModelSteps,
} from "../declarations";

interface ModelContextValue {
  currentStep: ModelProgressStep;
  criteria: Criterion[];
  setCriteria: (x: Criterion[]) => void;
  decisionMakers: DecisionMaker[];
  addDecisionMaker: (name: string, weight: number) => void;
  setDecisionMakers: (dms: DecisionMaker[]) => void;
  deleteDecisionMaker: (decisionMakerId: string) => void;
  getTotalDecisionMakersWeight: () => number;
  alternatives: Alternative[];
  setAlternatives: (alts: Alternative[]) => void;
  addCriterionJudgmentFromDecisionMaker: (
    decisionMakerId: string,
    criterionJudgment: CriterionJudgment
  ) => void;
}

const ModelContext = React.createContext<ModelContextValue | null>(null);
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
  const [decisionMakers, setDecisionMakers] = React.useState<DecisionMaker[]>(
    []
  );
  const [alternatives, setAlternatives] = React.useState<Alternative[]>([]);

  const addDecisionMaker = React.useCallback((name: string, weight: number) => {
    setDecisionMakers(
      produce((draft) => {
        draft.push({
          id: uuidv4(),
          name: name,
          weight: weight,
          criterion_judgments: [],
          positive_ideal_solution: [0, 0],
          negative_ideal_solution: [0, 0],
        });
      })
    );
  }, []);

  /**
   * Deleta um DecisionMaker da lista a partir de seu ID
   */
  const deleteDecisionMaker = React.useCallback((decisionMakerId: string) => {
    setDecisionMakers(
      produce((draft) => {
        return draft.filter((dm) => dm.id !== decisionMakerId);
      })
    );
  }, []);

  /**
   * Calcula de retorna o valor total dos pesos dos decisores, arredondado
   * para o decimal mais próximo
   */
  const getTotalDecisionMakersWeight = React.useCallback(() => {
    let totalWeight = decisionMakers.reduce(
      (accumulator, currentValue) => accumulator + currentValue.weight,
      0
    );

    totalWeight = Math.ceil(totalWeight * 10) / 10;
    return totalWeight;
  }, [decisionMakers]);

  const addCriterionJudgmentFromDecisionMaker = React.useCallback(
    (decisionMakerId: string, { criterion_id, sp, sq }: CriterionJudgment) => {
      setDecisionMakers(
        produce((draft) => {
          const decisionMaker = draft.find((dm) => dm.id === decisionMakerId);
          if (decisionMaker) {
            decisionMaker.criterion_judgments.push({
              criterion_id,
              sp,
              sq,
            });
          }
        })
      );
    },
    []
  );

  return (
    <ModelContext.Provider
      value={{
        currentStep,
        criteria,
        setCriteria,
        decisionMakers,
        addDecisionMaker,
        setDecisionMakers,
        deleteDecisionMaker,
        getTotalDecisionMakersWeight,
        alternatives,
        setAlternatives,
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
