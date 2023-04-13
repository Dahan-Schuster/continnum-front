import React, { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModel } from "../../contexts/ModelContext";
import { useNavigate } from "react-router-dom";

import config from "../../config.json";

/**
 * Página para adicionar tomadores de decisão ao contexto
 *
 * Renderiza a lista de DecisionMakers salva no contexto em forma de
 * inputs de nome e peso, e uma linha de inputs para um novo DecisionMaker
 * ao final da lista
 *
 * O botão para a próxima tela fica desabilitado enquanto o peso total
 * de todos os decisores for diferente de 1
 */
const AddDecisionMakers = () => {
  // bsuca os dados do contexto
  const {
    decisionMakers,
		addDecisionMaker,
    setDecisionMakers,
    deleteDecisionMaker,
    getTotalDecisionMakersWeight,
  } = useModel();

  // valores dos inputs de nome e peso do novo tomador de decisão
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");

	/**
	 * Valida se o peso total dos decisores mais o peso do novo
	 * decisor ulttrapassam o valor para peso definido no JSON
	 * de configurações
	 */
  const validateNewTotalWeight = React.useCallback(
    (newWeight: number): boolean => {
      if (isNaN(newWeight)) {
        return false;
      }

      const totalWeight = getTotalDecisionMakersWeight();

      if (totalWeight + newWeight > config.requiredDecisionMakersWeight) {
        alert(`The sum of all weights must be equal to ${config.requiredDecisionMakersWeight}.`);
        return false;
      }

      return true;
    },
    [getTotalDecisionMakersWeight]
  );

	/**
	 * Callback chamado ao adicionar um DecisionMaker clicando no ícone AddIcon
	 */
  const handleAddDecisionMaker = React.useCallback(() => {
    const newWeight = parseFloat(weight);
    if (!validateNewTotalWeight(newWeight)) return;

		addDecisionMaker(name, newWeight);
    setName("");
    setWeight("");
  }, [addDecisionMaker, name, validateNewTotalWeight, weight]);

	/**
	 * Callback de mudança do input de nome do novo DecisionMaker
	 * Altera o valor do estado do nome
	 */
  const handleNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

	/**
	 * Callback de mudança do input de peso do novo DecisionMaker
	 * Altera o valor do estado do peso
	 */
  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

	/**
	 * Callback de mudança do nome do DecisionMaker já cadastrado
	 * Altera o valor do objeto no estado, salvando o novo nome
	 */
  const handleDecisionMakerNameChange = (
    decisionMakerId: string,
    newName: string
  ) => {
    setDecisionMakers(
      decisionMakers.map((dm) =>
        dm.id === decisionMakerId ? { ...dm, name: newName } : dm
      )
    );
  };

	// Método para navegar pra a próxima tela
  const navigate = useNavigate();
  const handleGoFoward = () => {
    navigate("/alternatives");
  };

  return (
    <div>
      <h1>Add Decision Makers</h1>
      <p>
        Fill in the name and weight of the new decision maker below, then click
        "Add Decision Maker" to add it to the list.
      </p>
      <p>
        The sum of all weights must be equal to {config.requiredDecisionMakersWeight}. Current total weight:{" "}
        {getTotalDecisionMakersWeight().toFixed(2)}
      </p>

			{/* Mapeia os decisores cadastrados renderizando inputs de edição do nome e do peso  */}
      {decisionMakers.map((dm) => (
        <div key={dm.id}>
          <TextField
            label="Name"
            value={dm.name}
            onChange={(e) => handleDecisionMakerNameChange(dm.id, e.target.value)}
          />
          <TextField label="Weight" value={dm.weight} disabled />
          <IconButton
            aria-label="delete"
            onClick={() => deleteDecisionMaker(dm.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

			{/* Inputs for new decision maker */}
      <div>
        <TextField label="Name" value={name} onChange={handleNameChange} />
        <TextField
          label="Weight"
          value={weight}
          onChange={handleWeightChange}
        />
        <IconButton aria-label="Add Decision Maker" onClick={handleAddDecisionMaker}>
          <AddIcon />
        </IconButton>
      </div>

      <div>
        <Button
          variant="contained"
          onClick={handleGoFoward}
          disabled={getTotalDecisionMakersWeight() !== config.requiredDecisionMakersWeight}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AddDecisionMakers;
