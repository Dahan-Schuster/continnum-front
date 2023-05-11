import React from "react";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import { Alternative } from "../declarations";

export interface AlternativesHookValues {
  alternatives: Alternative[];
  addAlternative: (name: string) => void;
  setAlternatives: (alternatives: Alternative[]) => void;
  deleteAlternative: (alternativeId: string) => void;
  editAlternative: (alternativeId: string, newValues: Partial<Alternative>) => void;
}

/**
 * Hook para gerenciar tomadores de decisão do modelo
 *
 * Usado dentro do ModelContext para ser acessado em
 * qualquer componente dentro do contexto
 */
const useAlternatives = (): AlternativesHookValues => {
  const [alternatives, setAlternatives] = React.useState<Alternative[]>([]);
  const addAlternative = React.useCallback((name: string) => {
    setAlternatives(
      produce((draft) => {
        draft.push({
          id: uuidv4(),
          name: name,
					ranking_position: 0,
					score: 0,
					total_distance_negative: 0,
					total_distance_positive: 0,
        });
      })
    );
  }, []);

  /**
   * Deleta um Alternative da lista a partir de seu ID
   */
  const deleteAlternative = React.useCallback((alternativeId: string) => {
    setAlternatives(
      produce((draft) => {
        return draft.filter((dm) => dm.id !== alternativeId);
      })
    );
  }, []);

	/**
	 * Edita uma alternativa a partir de seu ID
	 */
  const editAlternative = React.useCallback(
    (alternativeId: string, newValues: Partial<Alternative>) => {
      setAlternatives(
        produce((draft) => {
          return draft.map((c) =>
            c.id === alternativeId ? { ...c, ...newValues } : c
          );
        })
      );
    },
    []
  );

  return {
    alternatives,
    addAlternative,
    deleteAlternative,
    setAlternatives,
		editAlternative,
  };
};

export default useAlternatives;
