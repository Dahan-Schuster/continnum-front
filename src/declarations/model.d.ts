// Use declare namespace to describe types or values accessed by dotted notation.
// Use an interface to define a type with properties.
// Use namespaces to organize types.

import { Alternative, Criterion, DecisionMaker, LinguisticScale } from ".";

export interface Model {
  decisionMakers: DecisionMaker[];
  criteria: Criterion[];
  alternatives: Alternative[];
  linguisticScale: LinguisticScale;
  currentRoute: ModelRoute;
}

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
