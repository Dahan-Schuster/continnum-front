import React from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { useModel } from "../../contexts/ModelContext";
import { CriterionType } from "../../declarations";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectCriterionType from "../../components/SelectCriterionType";
import CustomInputLabel from "../../components/CustomInputLabel";

interface AddCriteriaProps {}

interface CriterionInputsGroupProps {
  id?: string;
  description: string;
  descLabel?: string;
  type: CriterionType;
  onChangeName: (value: string, decisionMakerId?: string) => void;
  onChangeType: (value: CriterionType, decisionMakerId?: string) => void;
  ActionButon: React.FC;
}

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
  } = useModel();

  // valores dos inputs de nome e peso do novo tomador de decisão
  const [description, setDescription] = React.useState<string>("");
  const [type, setType] = React.useState<CriterionType>("benefit");

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
    setCanGoForward(criteria.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria]);

  /**
   * Libera o botão de voltar ao entrar na página
   */
  React.useEffect(() => {
    setCanGoBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Renderiza os inputs de cadastro ou edição de um critério
   * Recebe nome, tipo e os callbacks de edição dos inputs
   */
  const CriterionInputsGroup = React.useCallback(
    (props: CriterionInputsGroupProps) => {
      const { ActionButon, id } = props;
      const selectId = id
        ? `select-type-criterion-${id}`
        : "select-type-new-criterion";
      return (
        <Grid container spacing={1} p={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={props.descLabel}
              value={props.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onChangeName!(event.target.value, props.id);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={11} sm={5}>
            <SelectCriterionType
              id={selectId}
              onChange={(type) => props.onChangeType(type, props.id)}
              type={props.type}
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
              onChangeType={(t, id) => editCriterion(id!, { criterion_type: t })}
              ActionButon={() => (
                <IconButton
                  color="primary"
                  aria-label="Adicionar critério"
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
