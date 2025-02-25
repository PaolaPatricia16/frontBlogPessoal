import Postagem from "./Postagem.ts";

//export default = esta Interface poderá ser importada em outras Interfaces Model e nos Componentes React.
export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string ;
  
// campo que indica o relacionamento entre Classes.
// ' |' = indica que pode teer maus de uma tipagem
// null = a propriedade pode ser nula, ou seja, é possível nao ter postagens associadas ao Usuario
// '?' = indica que o preenchimento deste campo é opcional.
  postagem?: Postagem | null;
}