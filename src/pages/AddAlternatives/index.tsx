import React from "react";
import { Grid, IconButton } from "@mui/material";
import { useModel } from "../../contexts/ModelContext";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomInputLabel from "../../components/CustomInputLabel";
import config from "../../config.json";
import AlternativeInputsGroup from "./AlternativeInputsGroup";

interface AddAlternativesProps {}

/**
 * Tela para cadastrar, editar, deletar e listar Alternativas do modelo
 */
const AddAlternatives: React.FunctionComponent<AddAlternativesProps> = () => {
  // busca os dados do contexto
  const {
    setCanGoBack,
    setCanGoForward,
    alternatives,
    addAlternative,
    deleteAlternative,
    editAlternative,
    setValidationMessage,
  } = useModel();

  // valor do input de nome da nova alternativa
  const [name, setName] = React.useState<string>("");

  /**
   * Callback chamado ao adicionar um Alternative clicando no ícone AddIcon
   */
  const handleAddAlternative = React.useCallback(() => {
    if (!name) {
      alert("Preencha todos os campos da nova alternativa!");
      return;
    }

    addAlternative(name);
    setName("");
  }, [addAlternative, name]);

  const alternativeNameInputRef = React.useRef<HTMLInputElement>(null);

  /**
   * Foca o input de nome do novo Criterion sempre que o tamanho da
   * lista mudar (adicionou ou removeu DMs)
   */
  React.useEffect(() => {
    alternativeNameInputRef.current?.focus();
  }, [alternatives.length]);

  /**
   * Callback de mudança do input de nome do novo Alternative
   * Altera o valor do estado do nome
   */
  const handleNameChange = React.useCallback((value: string) => {
    setName(value);
  }, []);

  /**
   * Efeito chamado sempre que o array de alternativas mudar
   * Define se u usuárie pode avançar baseado no tamanho do array de alternativas
   */
  React.useEffect(() => {
    const _canGoForward = alternatives.length > 0;
    setCanGoForward(_canGoForward);
    setValidationMessage(
      _canGoForward ? "" : config.alternativesValidationMessage
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alternatives]);

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
        <CustomInputLabel xs={12} sm={6} text={"Nome da alternativa"} />
        <Grid container>
          {/* Mapeia as alternativas cadastrados renderizando inputs de edição do nome e do tipo  */}
          {alternatives.map((alternative, index) => (
            <AlternativeInputsGroup
              id={alternative.id}
              key={alternative.id}
              name={alternative.name}
              descLabel={`#${index + 1}`}
              onChangeName={(n, id) => editAlternative(id!, { name: n })}
              ActionButon={() => (
                <IconButton
                  color="primary"
                  aria-label="Deletar alternativa"
                  onClick={() => deleteAlternative(alternative.id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            />
          ))}
        </Grid>

        <Grid item xs={12} mt={1}>
          <AlternativeInputsGroup
						ref={alternativeNameInputRef}
            name={name}
            descLabel="Nova alternativa"
            onChangeName={handleNameChange}
            ActionButon={() => (
              <IconButton
                color="primary"
                aria-label="Adicionar Alternativa"
                onClick={handleAddAlternative}
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

export default AddAlternatives;
