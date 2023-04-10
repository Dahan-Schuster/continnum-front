import { UUID } from "crypto";
import produce from "immer";
import React from "react";
import {
  Alternative,
  Criterion,
  CriterionJudgment,
  DecisionMaker,
} from "../declarations";

interface ModelContextValue {
  criteria: Criterion[];
  setCriteria: (x: Criterion[]) => void;
  decisionMakers: DecisionMaker[];
  setDecisionMakers: (dms: DecisionMaker[]) => void;
	deleteDecisionMaker: (decisionMakerId: string) => void;
	getTotalDecisionMakersWeight: () => number;
  alternatives: Alternative[];
  setAlternatives: (alts: Alternative[]) => void;
	addCriterionJudgmentFromDecisionMaker: (decisionMakerId: UUID, criterionJudgment: CriterionJudgment) => void;
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
  const [criteria, setCriteria] = React.useState<Criterion[]>([]);
  const [decisionMakers, setDecisionMakers] = React.useState<DecisionMaker[]>([]);
  const [alternatives, setAlternatives] = React.useState<Alternative[]>([]);

	/**
	 * Deleta um DecisionMaker da lista a partir de seu ID
	 */
  const deleteDecisionMaker = React.useCallback((decisionMakerId: string) => {
    setDecisionMakers(
			produce(draft => {
				return draft.filter((dm) => dm.id !== decisionMakerId)
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
    (decisionMakerId: UUID, { criterion_id, sp, sq }: CriterionJudgment) => {
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
        criteria,
        setCriteria,
        decisionMakers,
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
