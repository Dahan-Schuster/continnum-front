import React from "react";

export interface ModelRoute {
  step: number; // identificador do ModelProgressStep associado a essa rota, deve ser igual ao order
  label: string;
  description: string;
  name: string;
  nextRoute: string;
  prevRoute: string;
}

export interface ModelProgressStep {
  order: number; // identificador desse Step
  label: string;
  description: string;
  routes: ModelRoute[];
}

export const ModelSteps: ModelProgressStep[] = [
  {
    order: 1,
    label: "A",
    description: "Definir Problema",
    routes: [
      {
        step: 1,
        label: "",
        description: "",
        name: "/model/",
        nextRoute: "/model/dms",
        prevRoute: "",
      },
      {
        step: 1,
        label: "passo 1",
        description: "informe o nome e o peso de cada um dos decisores",
        name: "/model/dms",
        nextRoute: "/model/criteria",
        prevRoute: "/model/",
      },
      {
        step: 1,
        label: "passo 2",
        description: "Informe e classifique os critérios",
        name: "/model/criteria",
        nextRoute: "/model/alternatives",
        prevRoute: "/model/dms",
      },
    ],
  },
  { order: 2, label: "B", description: "Inserir Julgamentos", routes: [] },
  { order: 3, label: "C", description: "Resultados", routes: [] },
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

  /**
   * Altera o estado da rota atual para a próxima rota, se houver
   */
  const goForward = React.useCallback(() => {
    if (!canGoForward) return;
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
  }, [canGoForward]);

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
  };
};

export default useModelSteps;
