import React from "react";
import { ModelProgressStep, ModelRoute } from "../declarations/model";

export const RouteNames = {
  void: "",
  model: "/model/",
  dms: "/model/dms",
  criteria: "/model/criteria",
  alternatives: "/model/alternatives",
  scale: "/model/linguistic-scale",
};

export const ModelSteps: ModelProgressStep[] = [
  {
    order: 1,
    label: "1",
    description: "Problema",
    routes: [
      {
        step: 1,
        label: "",
        description: "",
        prevRoute: RouteNames.void,
        name: RouteNames.model,
        nextRoute: RouteNames.dms,
      },
      {
        step: 1,
        label: "passo 1",
        description: "Informe o nome e o peso de cada Decisor",
        prevRoute: RouteNames.model,
        name: RouteNames.dms,
        nextRoute: RouteNames.criteria,
      },
      {
        step: 1,
        label: "passo 2",
        description: "Informe e classifique os Critérios",
        prevRoute: RouteNames.dms,
        name: RouteNames.criteria,
        nextRoute: RouteNames.alternatives,
      },
      {
        step: 1,
        label: "passo 3",
        description: "Identifique as Alternativas",
        prevRoute: RouteNames.criteria,
        name: RouteNames.alternatives,
        nextRoute: RouteNames.scale,
      },
      {
        step: 1,
        label: "passo 4",
        description:
          "Escolha a Escala de Termos Linguísticos a serem utilizados nos Julgamentos",
        prevRoute: RouteNames.alternatives,
        name: RouteNames.scale,
        nextRoute: RouteNames.void, // FIXME: rota para o próximo passo
      },
    ],
  },
  { order: 2, label: "2", description: "Julgamentos", routes: [] },
  { order: 3, label: "3", description: "Resultados", routes: [] },
];

/**
 * Lista estática das rotas disponíveis no Modelo
 */
const AvailableRoutes: ModelRoute[] = ModelSteps.reduce(
  (routesArr: ModelRoute[], step) => {
    routesArr.push(...step.routes);
    return routesArr;
  },
  []
);

export interface ModelStepsHookValues {
  initialStep: ModelProgressStep;
  currentStep: ModelProgressStep;

  currentRoute: ModelRoute;
  goForward: () => void;
  goBack: () => void;
  setCurrentRoute: (route: ModelRoute) => void;

  canGoForward: boolean;
  setCanGoForward: (doesIt: boolean) => void;
  canGoBack: boolean;
  setCanGoBack: (doesIt: boolean) => void;

  validationMessage: string;
  setValidationMessage: (message: string) => void;
}

/**
 * Hook para buscar os passos do modelo
 * Define os passos existentes e expõe um estado com o passo atual
 */
const useModelSteps = (): ModelStepsHookValues => {
  // Passo inicial do modelo, configurado estaticamente
  const initialStep = React.useRef(ModelSteps[0]).current;

  // estado que guarda a rota atual (telas dentro do passo)
  const [currentRoute, setCurrentRoute] = React.useState<ModelRoute>(
    initialStep.routes[0]
  );

  // Passo atual do model
  // valor atualizado sempre que o currentRoute mudar
  // define o currentStep a partir da prop currentRoute.step
  const currentStep = React.useMemo<ModelProgressStep>(() => {
    const step = ModelSteps.find((step) => step.order === currentRoute.step);

    if (!step) {
      return initialStep;
    }

    return step;
  }, [currentRoute.step, initialStep]);

  // estados que informam se deve permitir avançar ou voltar no modelo
  const [canGoForward, setCanGoForward] = React.useState<boolean>(false);
  const [canGoBack, setCanGoBack] = React.useState<boolean>(false);

  // mensagem de aviso ao usuário sobre não poder avançar
  const [validationMessage, setValidationMessage] = React.useState<string>("");

  /**
   * Altera o estado da rota atual para a próxima rota, se houver
   */
  const goForward = React.useCallback(() => {
    if (!canGoForward || !currentRoute.nextRoute) return;
    setCurrentRoute((current) => {
      const nextRoute = AvailableRoutes.find(
        (r) => r.name === current.nextRoute
      );

      if (!nextRoute) {
        alert(`Rota ${current.nextRoute} não encontrada!`);
        return current;
      }

      return nextRoute;
    });
  }, [canGoForward, currentRoute.nextRoute]);

  /**
   * Altera o estado da rota atual para a rota anterior, se houver
   */
  const goBack = React.useCallback(() => {
    if (!canGoBack || !currentRoute.prevRoute) return;
    setCurrentRoute((current) => {
      const prevRoute = AvailableRoutes.find(
        (r) => r.name === current.prevRoute
      );

      if (!prevRoute) {
        alert(`Rota ${current.prevRoute} não encontrada!`);
        return current;
      }

      return prevRoute;
    });
  }, [canGoBack, currentRoute.prevRoute]);

  return {
    initialStep,
    currentStep,
    currentRoute,
    goForward,
    goBack,
    setCurrentRoute,
    canGoForward,
    setCanGoForward,
    canGoBack,
    setCanGoBack,
    validationMessage,
    setValidationMessage,
  };
};

export default useModelSteps;
