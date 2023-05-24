// Use declare namespace to describe types or values accessed by dotted notation.
// Use an interface to define a type with properties.
// Use namespaces to organize types.

export interface Dictionary<T> {
	[key: string]: T
}

export interface CriterionJudgment {
  criterion_id: string; // criterion being judged by the DecisionMaker
  sp: Number; // "lower" value of the fuzzy judgement
  sq: Number; // "higher" value of the fuzzy judgement
  positive_distance?: Number;
  negative_distance?: Number;
}

export interface DecisionMaker {
  id: string;
  criterion_judgments: CriterionJudgment[];
  positive_ideal_solution: [Number, Number]; // the two values of the positive ideal solution
  negative_ideal_solution: [Number, Number]; // the two values of the negative ideal solution
  name: string;
  weight: number;
}

export interface Alternative {
  id: string;
  name: string;
  total_distance_positive: Number;
  total_distance_negative: Number;
  score: Number;
  ranking_position: Number;
}

export interface AggregatedJudgment {
  id: string;
  alternative_id: string;
  sp: Number;
  sq: Number;
  positive_distance: Number;
  negative_distance: Number;
}

export interface AlternativeJudgment {
  id: string;
  decision_maker_id: string;
  max_value: Number;
  min_value: Number;
}

export type CriterionType = "benefit" | "cost";

export interface Criterion {
  id: string;
  description: string;
  criterion_type: CriterionType;
  total_positive_distance?: 0; // distance of this criterion to the positive ideal
  total_negative_distance?: 0; // distance of this criterion to the negative ideal
  cci?: 0; // unnormalized weight
  normalized_cci?: 0; // weight (level of importance) of the criterion
  unnormalized_distance?: 0;
  normalized_distance?: 0;
  alternative_judgments?: AlternativeJudgment[];
  aggregated_judgments?: AggregatedJudgment[];
  positive_ideal_solution?: Number[]; // the two values of the positive ideal solution
  negative_ideal_solution?: Number[]; // the two values of the negative ideal solution
}

export interface LinguisticScale {
  id: number;
  size: number;
  values: Dictionary<number>;
}
