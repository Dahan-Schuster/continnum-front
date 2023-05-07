import React, { useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModel } from "../../contexts/ModelContext";

import config from "../../config.json";
import CustomInputLabel from "../../components/CustomInputLabel";

interface DecisionMakerInputsGroupProps {
  id?: string;
  name: string;
	nameLabel?: string;
  weight: string;
	weightLabel?: string;
  onChangeName: (value: string, decisionMakerId?: string) => void;
  onChangeWeight?: (value: string, decisionMakerId?: string) => void;
	ActionButon: React.FC;
}

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
    setName("a");
    setWeight("0.2");
  }, [addDecisionMaker, name, validateNewTotalWeight, weight]);

  /**
   * Callback de mudança do input de nome do novo DecisionMaker
   * Altera o valor do estado do nome
   */
  const handleNameChange = React.useCallback((value: string) => {
    setName(value);
  }, []);

  /**
   * Callback de mudança do input de peso do novo DecisionMaker
   * Altera o valor do estado do peso
   */
  const handleWeightChange = (value: string) => {
    setWeight(value);
  };

  /**
   * Callback de mudança do nome do DecisionMaker já cadastrado
   * Altera o valor do objeto no estado, salvando o novo nome
   */
  const handleDecisionMakerNameChange = (
    newName: string,
    decisionMakerId: string
  ) => {
    setDecisionMakers(
      decisionMakers.map((dm) =>
        dm.id === decisionMakerId ? { ...dm, name: newName } : dm
      )
    );
  };

  /**
   * Libera o botão de voltar ao entrar na página
   */
  React.useEffect(() => {
    setCanGoBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Efeito chamado sempre que o array de tomadores de decisão mudar
   * Define se u usuárie pode avançar baseado no peso total dus decisores
   */
  React.useEffect(() => {
    setCanGoForward(
      totalDecisionMakersWeight === config.requiredDecisionMakersWeight
    );
  }, [setCanGoForward, totalDecisionMakersWeight]);

  /**
   * Renderiza os inputs de cadastro ou edição de ume decisore
   * Recebe nome, peso e os callbacks de edição dos inputs
   *
   * O callback de edição do input de  peso é opicional pois a
   * edição do peso não é possível, sendo usado apenas no cadastro
   */
  const DecisionMakerInputsGroup = React.useCallback(
    (props: DecisionMakerInputsGroupProps) => {
			const { ActionButon } = props;
      return (
        <Grid container spacing={1} p={1}>
          <Grid item xs={12} sm={6}>
            <TextField
							label={props.nameLabel}
              value={props.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onChangeName(event.target.value, props.id);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={11} sm={5}>
            <TextField
              value={props.weight}
							label={props.weightLabel}
              onChange={
                !!props.onChangeWeight
                  ? (event: React.ChangeEvent<HTMLInputElement>) => {
                      props.onChangeWeight!(event.target.value, props.id);
                    }
                  : undefined
              }
              disabled={!props.onChangeWeight}
              fullWidth
            />
          </Grid>
          <Grid item xs={1} display="flex" alignItems="center">
						<ActionButon />
          </Grid>
        </Grid>
      );
    },
    []
  );

  return (
    <Grid container>
      <Grid item xs={12} mx="auto">
        <Grid container>
					<CustomInputLabel text="Nome do decisor" xs={12} sm={6} />
					<CustomInputLabel text="Peso" xs={12} sm={6} />
          {/* Mapeia os decisores cadastrados renderizando inputs de edição do nome e do peso  */}
          {decisionMakers.map((dm, index) => (
            <DecisionMakerInputsGroup
              id={dm.id}
							key={dm.id}
              name={dm.name}
							nameLabel={`#${index + 1}`}
              weight={String(dm.weight)}
              onChangeName={(n, id) => handleDecisionMakerNameChange(n, id!)}
							ActionButon={() => (
								<IconButton
									aria-label="delete"
									onClick={() => deleteDecisionMaker(dm.id)}
								>
									<DeleteIcon />
								</IconButton>
							)}
            />
          ))}
        </Grid>

        {/* Renderiza os inputs de cadastro de nove decisore */}
        <Grid item xs={12} mt={1}>
          <DecisionMakerInputsGroup
            name={name}
						nameLabel="Novo decisor"
            weight={weight}
            onChangeWeight={handleWeightChange}
            onChangeName={handleNameChange}
						ActionButon={() => (
              <IconButton
                aria-label="Add Decision Maker"
                onClick={handleAddDecisionMaker}
              >
                <AddIcon />
              </IconButton>
						)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddDecisionMakers;
