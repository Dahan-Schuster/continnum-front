import React from "react";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import { Criterion, CriterionType } from "../declarations";

export interface CriteriaHookValues {
  criteria: Criterion[];
  addCriterion: (description: string, type: CriterionType) => void;
  setCriteria: (criteria: Criterion[]) => void;
  deleteCriterion: (id: string) => void;
}

/**
 * Hook para gerenciar critérios do modelo
 *
 * Usado dentro do ModelContext para ser acessado em
 * qualquer componente dentro do contexto
 */
const useCriteria = (): CriteriaHookValues => {
  const [criteria, setCriteria] = React.useState<Criterion[]>(
    []
  );
	
	/**
	 * Adiciona um critério à lista
	 * Utiliza o método produce da lib immer para garantir que propriedades dentro do objeto
	 * irão ser salvas com êxito
	 */
  const addCriterion = React.useCallback((description: string, type: CriterionType) => {
    setCriteria(
      produce((draft) => {
        draft.push({
          id: uuidv4(),
          description,
          criterion_type: type,
        });
      })
    );
  }, []);

  /**
   * Deleta um Criterion da lista a partir de seu ID
   */
  const deleteCriterion = React.useCallback((decisionMakerId: string) => {
    setCriteria(
      produce((draft) => {
        return draft.filter((dm) => dm.id !== decisionMakerId);
      })
    );
  }, []);


  return {
    criteria,
    addCriterion,
    deleteCriterion,
    setCriteria,
  };
};

export default useCriteria;
