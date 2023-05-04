import React, { useCallback } from "react";

export interface ModelPorgressSubstep {
  label: string;
  description: string;
  route: string;
  nextRoute: string;
  prevRoute: string;
}

export interface ModelProgressStep {
  order: number;
  label: string;
  description: string;
  substeps: ModelPorgressSubstep[];
}

export const ModelSteps: ModelProgressStep[] = [
  {
    order: 1,
    label: "A",
    description: "Definir Problema",
    substeps: [
      {
        label: "passo 1",
        description: "informe o nome e o peso de cada um dos decisores",
        route: "/model/dms",
        nextRoute: "/model/criteria",
        prevRoute: undefined,
      },
      {
        label: "passo 2",
        description: "Informe e classifique os critérios",
        route: "/model/criteria",
        nextRoute: "/model/alternatives",
        prevRoute: "/model/dms",
      },
    ],
  },
  { order: 2, label: "B", description: "Inserir Julgamentos", substeps: [] },
  { order: 3, label: "C", description: "Resultados", substeps: [] },
];

export interface ModelStepsHookValues {
  initialStep: ModelProgressStep;
  currentStep: ModelProgressStep;
  setCurrentStep: (step: ModelProgressStep) => void;
  canGoForward: boolean;
  setCanGoForward: (doesIt: boolean) => void;
  canGoBack: boolean;
  setCanGoBack: (doesIt: boolean) => void;
}

/**
 * Hook para buscar os passos do modelo
 * Define os passos existentes e expõe um estado com o passo atual
 */
const useModelSteps = (): ModelStepsHookValues => {
  const initialStep = React.useRef(ModelSteps[0]).current;
  const [currentStep, setCurrentStep] =
    React.useState<ModelProgressStep>(initialStep);

  const [canGoForward, setCanGoForward] = React.useState<boolean>(false);
  const [canGoBack, setCanGoBack] = React.useState<boolean>(false);

  return {
    initialStep,
    currentStep,
    setCurrentStep,
    canGoForward,
    setCanGoForward,
    canGoBack,
    setCanGoBack,
  };
};

export default useModelSteps;
