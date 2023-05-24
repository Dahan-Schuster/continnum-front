import React from "react";
import { Grid, IconButton } from "@mui/material";
import { useModel } from "../../contexts/ModelContext";
import { CriterionType } from "../../declarations";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomInputLabel from "../../components/CustomInputLabel";
import config from "../../config.json";
import CriterionInputsGroup from "./CriterionInputsGroup";

interface AddCriteriaProps {}

/**
 * Tela para cadastrar, editar, deletar e listar Critérios do Modelo
 */
const AddCriteria: React.FunctionComponent<AddCriteriaProps> = () => {
  // busca os dados do contexto
  const {
    setCanGoBack,
    setCanGoForward,
    criteria,
    addCriterion,
    deleteCriterion,
    editCriterion,
    setValidationMessage,
  } = useModel();

	const criterionNameInputRef = React.useRef<HTMLInputElement>(null);

  // valores dos inputs de nome e peso do novo tomador de decisão
  const [description, setDescription] = React.useState<string>("");
  const [type, setType] = React.useState<CriterionType>("benefit");

  /**
   * Foca o input de nome do novo Criterion sempre que o tamanho da
   * lista mudar (adicionou ou removeu critérios)
   */
  React.useEffect(() => {
    criterionNameInputRef.current?.focus();
  }, [criteria.length]);

  /**
   * Callback chamado ao adicionar um Criterion clicando no ícone AddIcon
   */
  const handleAddCriterion = React.useCallback(() => {
    if (!description || !type) {
      alert("Preencha todos os campos do novo critério!");
      return;
    }

    addCriterion(description, type);
    setDescription("");
    setType("benefit");
  }, [addCriterion, description, type]);

  /**
   * Callback de mudança do input de nome do novo Criterion
   * Altera o valor do estado do nome
   */
  const handleDescriptionChange = React.useCallback((value: string) => {
    setDescription(value);
  }, []);

  /**
   * Callback de mudança do select do tipo do novo Criterion
   * Altera o valor do estado do tipo
   */
  const handleTypeChange = (type: CriterionType) => {
    setType(type);
  };

  /**
   * Efeito chamado sempre que o array de critérios mudar
   * Define se u usuárie pode avançar baseado no tamanho do array de cirtérios
   */
  React.useEffect(() => {
    const _canGoForward = criteria.length > 0;
    setCanGoForward(_canGoForward);
    setValidationMessage(_canGoForward ? "" : config.criteriaValidationMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria]);

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
        <CustomInputLabel xs={12} sm={6} text={"Nome do critério"} />
        <Grid container>
          {/* Mapeia os critérios cadastrados renderizando inputs de edição do nome e do tipo  */}
          {criteria.map((criterion, index) => (
            <CriterionInputsGroup
              id={criterion.id}
              key={criterion.id}
              description={criterion.description}
              descLabel={`#${index + 1}`}
              onChangeName={(n, id) => editCriterion(id!, { description: n })}
              type={criterion.criterion_type}
              onChangeType={(t, id) =>
                editCriterion(id!, { criterion_type: t })
              }
              ActionButon={() => (
                <IconButton
                  color="primary"
                  aria-label="Deletar critério"
                  onClick={() => deleteCriterion(criterion.id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            />
          ))}
        </Grid>

        <Grid item xs={12} mt={1}>
          <CriterionInputsGroup
						ref={criterionNameInputRef}
            description={description}
            descLabel="Novo critério"
            onChangeName={handleDescriptionChange}
            type={type}
            onChangeType={handleTypeChange}
            ActionButon={() => (
              <IconButton
                color="primary"
                aria-label="Adicionar critério"
                onClick={handleAddCriterion}
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

export default AddCriteria;
