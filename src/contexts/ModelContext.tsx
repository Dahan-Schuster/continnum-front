import React from "react";
import { Alternative } from "../declarations";
import { Model } from "../declarations/model";
import useAlternatives, {
  AlternativesHookValues,
} from "../hooks/useAlternatives";
import useCriteria, { CriteriaHookValues } from "../hooks/useCriteria";
import useDecisionMakers, {
  DecisionMakersHookValues,
} from "../hooks/useDecisionMakers";
import useModelScale, { ModelScaleHookValues } from "../hooks/useModelScale";

import useModelSteps, { ModelStepsHookValues } from "../hooks/useModelSteps";

import config from "../config.json";

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

  const [isSafeToSaveToStorage, setIsSafeToSaveToStorage] =
    React.useState<boolean>(false);

  /**
   * Retrieving data from the storage at initialization
   */
  React.useEffect(() => {
    try {
      const storedModel = localStorage.getItem(config.keysStorage.model);

      if (!storedModel) return;
      let modelState: Model = JSON.parse(storedModel);

      if (!modelState) return;
      decisionMakersUtils.setDecisionMakers(modelState.decisionMakers);
      criteriaUtils.setCriteria(modelState.criteria);
      alternativesUtils.setAlternatives(modelState.alternatives);
      modelScaleUtils.setLinguisticScale(modelState.linguisticScale);
      modelStepsUtils.setCurrentRoute(modelState.currentRoute);
    } catch (e) {
      console.log("failed to load model:", e);
    }

    setIsSafeToSaveToStorage(true);
  }, []);

  /**
   * Salva os dados relevantes do modelo no storage,
   * mas apenas se for seguro salvar
   *
   * o estado isSafeToSaveToStorage se torna true após
   * o efeito inicial ter buscado os dados do storage
   * e preenchido os estados com os valores salvos
   */
  React.useEffect(() => {
    if (!isSafeToSaveToStorage) return;

    const modelState: Model = {
      decisionMakers: decisionMakersUtils.decisionMakers,
      criteria: criteriaUtils.criteria,
      alternatives: alternativesUtils.alternatives,
      linguisticScale: modelScaleUtils.linguisticScale,
      currentRoute: modelStepsUtils.currentRoute,
    };

    const modelJSON = JSON.stringify(modelState);
    localStorage.setItem(config.keysStorage.model, modelJSON);
  }, [
    isSafeToSaveToStorage,
    decisionMakersUtils.decisionMakers,
    criteriaUtils.criteria,
    alternativesUtils.alternatives,
    modelScaleUtils.linguisticScale,
    modelStepsUtils.currentRoute,
  ]);

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
