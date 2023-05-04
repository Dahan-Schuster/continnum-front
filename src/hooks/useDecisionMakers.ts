import React from "react";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import {CriterionJudgment, DecisionMaker} from "../declarations";

export interface DecisionMakersHookValues {
  decisionMakers: DecisionMaker[];
  addDecisionMaker: (name: string, weight: number) => void;
  setDecisionMakers: (dms: DecisionMaker[]) => void;
  deleteDecisionMaker: (decisionMakerId: string) => void;
  totalDecisionMakersWeight: number;
  addCriterionJudgmentFromDecisionMaker: (
    decisionMakerId: string,
    criterionJudgment: CriterionJudgment
  ) => void;
}

/**
* Hook para gerenciar tomadores de decisão do modelo
*
* Usado dentro do ModelContext para ser acessado em
* qualquer componente dentro do contexto
*/
const useDecisionMakers = (): DecisionMakersHookValues => {

  const [decisionMakers, setDecisionMakers] = React.useState<DecisionMaker[]>(
    []
  );
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
  const totalDecisionMakersWeight = React.useMemo(() => {
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

	return {
		decisionMakers,
		addDecisionMaker,
		deleteDecisionMaker,
		setDecisionMakers,
		totalDecisionMakersWeight,
		addCriterionJudgmentFromDecisionMaker,
	};
};

export default useDecisionMakers;
