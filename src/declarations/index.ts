import { UUID } from "crypto";

export interface CriterionJudgment {
	criterion_id: UUID  // criterion being judged by the DecisionMaker
	positive_distance: Number
	negative_distance: Number
	sp: Number  // "lower" value of the fuzzy judgement
	sq: Number  // "higher" value of the fuzzy judgement
}

export interface DecisionMaker {
	id: UUID;
	criterion_judgments: CriterionJudgment[];
	positive_ideal_solution: [Number, Number]; // the two values of the positive ideal solution
	negative_ideal_solution: [Number, Number]; // the two values of the negative ideal solution
	name: string;
	weight: string;
}

export interface Alternative { 
	id: UUID;
	name: string;
  total_distance_positive: Number;
  total_distance_negative: Number;
  score: Number;
  ranking_position: Number;
}

export interface AggregatedJudgment {
	id: UUID;
	alternative_id: UUID;
	sp: Number;
	sq: Number;
	positive_distance: Number;
	negative_distance: Number;
}

export interface AlternativeJudgment {
	id: UUID;
	decision_maker_id: UUID;
	max_value: Number;
	min_value: Number;
}

export type CriterionType = "benefit" | "cost";

export interface Criterion {
  id: UUID;
	description: string;
	criterion_type: CriterionType;
	total_positive_distance: 0  // distance of this criterion to the positive ideal
  total_negative_distance: 0  // distance of this criterion to the negative ideal
  cci: 0  // unnormalized weight
  normalized_cci: 0  // weight (level of importance) of the criterion
  unnormalized_distance: 0
  normalized_distance: 0
  alternative_judgments: AlternativeJudgment[];
  aggregated_judgments: AggregatedJudgment[];
  positive_ideal_solution: Number[];  // the two values of the positive ideal solution
  negative_ideal_solution: Number[];  // the two values of the negative ideal solution
}
