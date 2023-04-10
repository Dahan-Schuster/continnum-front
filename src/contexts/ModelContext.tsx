import React from "react";
import {Alternative, Criterion, DecisionMaker} from "../declarations";

interface ModelContextValue {
	criteria: Criterion[],
	setCriteria: (x: Criterion[]) => void;
	decisionMakers: DecisionMaker[];
	setDecisionMakers: (dms: DecisionMaker[]) => void;
	alternatives: Alternative[],
	setAlternatives: (alts: Alternative[]) => void;
}

const ModelContext = React.createContext<ModelContextValue | null>(null);
export default ModelContext;

/**
* Contexto que representa o modelo e como seus objetos se comunicam
* Salva os dados em estados e expõe métodos para mudar seus valores
*/
export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [criteria, setCriteria] = React.useState<Criterion[]>([]);
	const [decisionMakers, setDecisionMakers] = React.useState<DecisionMaker[]>([]);
	const [alternatives, setAlternatives] = React.useState<Alternative[]>([]);


	return (
		<ModelContext.Provider
			value={{
				criteria, 
				setCriteria,
				decisionMakers,
				setDecisionMakers,
				alternatives,
				setAlternatives
			}}
		>
			{children}
		</ModelContext.Provider>
	);
};

export const useModel = () => {
	const context = React.useContext(ModelContext);

	if (!context) {
		throw new Error('useModel must be used within an ModelProvider');
	}

	return context;
}

