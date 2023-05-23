import React, { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModel } from "../../contexts/ModelContext";

import config from "../../config.json";
import CustomInputLabel from "../../components/CustomInputLabel";
import DecisionMakerInputsGroup from "./DecisionMakersInputsGroup";

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
    deleteDecisionMaker,
    totalDecisionMakersWeight,
    editDecisionMaker,
    setValidationMessage,
  } = useModel();

  const newDecisionMakerInputRef = React.useRef<HTMLInputElement>(null);

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
    newDecisionMakerInputRef.current?.focus();
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
    const _canGoForward =
      totalDecisionMakersWeight === config.requiredDecisionMakersWeight;
    setCanGoForward(_canGoForward);
    setValidationMessage(
      _canGoForward
        ? ""
        : config.decisionMakersValidationMessage.replace(
            "{x}",
            String(totalDecisionMakersWeight)
          )
    );
  }, [setCanGoForward, totalDecisionMakersWeight]);

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
              onChangeName={(n, id) => editDecisionMaker(id!, { name: n })}
              ActionButon={() => (
                <IconButton
                  color="primary"
                  aria-label="Deletar Decisor"
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
            ref={newDecisionMakerInputRef}
            name={name}
            nameLabel="Novo decisor"
            weight={weight}
            onChangeWeight={handleWeightChange}
            onChangeName={handleNameChange}
            ActionButon={() => (
              <IconButton
                color="primary"
                aria-label="Addicionar decisor"
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
