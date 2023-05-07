import React, { useState } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModel } from "../../contexts/ModelContext";

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
    setCanGoBack,
    setCanGoForward,
    decisionMakers,
    addDecisionMaker,
    setDecisionMakers,
    deleteDecisionMaker,
    totalDecisionMakersWeight,
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

      if (
        totalDecisionMakersWeight + newWeight >
        config.requiredDecisionMakersWeight
      ) {
        alert(
          `A soma de todos os pesos deve ser igual a ${config.requiredDecisionMakersWeight}.`
        );
        return false;
      }

      return true;
    },
    [totalDecisionMakersWeight]
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

  /**
   * Efeito chamado sempre que o array de tomadores de decisão mudar
   * Define se u usuárie pode avançar baseado no peso total dos decisores
   */
  React.useEffect(() => {
    setCanGoForward(
      totalDecisionMakersWeight === config.requiredDecisionMakersWeight
    );
  }, [setCanGoForward, totalDecisionMakersWeight]);

	/**
	 * Libera o botão de voltar ao entrar na página
	 */
  React.useEffect(() => {
    setCanGoBack(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} mx="auto">
        <Grid container>
          {/* Mapeia os decisores cadastrados renderizando inputs de edição do nome e do peso  */}
          {decisionMakers.map((dm) => (
            <Grid container mt={1}>
              <Grid item xs={12} sm={6} pr={5}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={dm.name}
                  onChange={(e) =>
                    handleDecisionMakerNameChange(dm.id, e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField label="Peso" value={dm.weight} fullWidth disabled />
              </Grid>
              <IconButton
                aria-label="delete"
                onClick={() => deleteDecisionMaker(dm.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} mt={1}>
          <Grid container>
            <Grid item xs={12} sm={6} pr={5}>
              {/* Inputs for new decision maker */}
              <TextField
                label="Nome"
                value={name}
                onChange={handleNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Peso"
                value={weight}
                onChange={handleWeightChange}
                fullWidth
              />
            </Grid>
            <IconButton
              aria-label="Add Decision Maker"
              onClick={handleAddDecisionMaker}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddDecisionMakers;
