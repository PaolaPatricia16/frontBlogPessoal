import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormPostagem() {

    const navigate = useNavigate();

    //Variavel para indicar quando um processo esta sendo carregado
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    // Variável de Estado que recebe os dados de todos os Temas cadastrados no backend
    const [temas, setTemas] = useState<Tema[]>([])

    // Variavel que recebe os dados do tema escolhido pelo usuário
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' })
    
    // Variavel que recebe os dados da Postagem 
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()
    
    // useContext = acessa os dados/atributos que estão contidos no AuthContext
    // E por meio dela, escolhemos os campos que queremos acessar, no caso { usuario, handleLogout}. 
    const { usuario, handleLogout } = useContext(AuthContext)
    // Variavel que armazena o token do usuário
    const token = usuario.token


    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // Função acionada quando selecionamos um tema, ela busca o ID do tema.
    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // Busca todos os temas disponiveis. Na lista do form
    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }


    // Função que verifica se temos um token válido, caso não, apresenta a msg.
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token])


    // Função ativada quando abrimos o componente "Nova Postagem", ela busca todos os temas disponiveis.

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])
    // variavel de estado id, sempre que é alterado ele aciona a função useEffect

    // Função que relaciona a postagem com o tema.
    useEffect(() => {
        // setIsLoading = função que atualiza a postagem
        setPostagem({
            // Spred operator = com esses '...' chamamos todos os campos de postagem
            ...postagem,

            // Selecionamos o atributo tema para alterar.
      //Atributo: Objeto (id, descrição)
            tema: tema,
        })
    
    }, [tema]) 
    // variavel de estado tema, sempre que é alterado ele aciona a função useEffect


    // Função acionada sempre que digitarmos algo no formulario.
    // Pega os dados do formulario e atualiza a variável de estado Postagem.
    // Ela também relaciona a Postagem ao Usuário.
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            // Listamos todos os campo de postagem
            ...postagem,

            // Comando genérico que :
        // Pega o nome do campo: atribui o texto que esta sendo digitado no formulário
            [e.target.name]: e.target.value,

            tema: tema,
   
            //Atributo usuario recebe o Objeto usuario com todos os dados que compoem o usuario
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }


    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
       // Impede o regarreamento automatico da página para nao perder o token
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Postagem atualizada com sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    alert('Erro ao atualizar a Postagem')
                }
            }

        } else { // se o ID não existir 
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                  // Função que pega o token e passa para a requisição
                    headers: {
                        Authorization: token,
                    },
                })

                alert('Postagem cadastrada com sucesso');

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    alert('Erro ao cadastrar a Postagem');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="bg-indigo-950 container flex flex-col mx-auto   items-center font-grotesk">
            <h1 className="text-4xl text-center text-rosa-neon my-8">
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4 py-3" onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-2 text-rosa-neon">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className=" text-indigo-950 border-2 border-rosa-neon rounded p-2"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2 text-rosa-neon">
                    <label htmlFor="titulo">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-rosa-neon rounded text-indigo-950 p-2"
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col text-rosa-neon gap-2">
                    <p>Tema da Postagem</p>
                    <select name="tema" id="tema" className='border-2 p-2 border-rosa-neon rounded text-indigo-950'
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Tema</option>

                        {temas.map((tema) => (
                            <>
                                <option value={tema.id} >{tema.descricao}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-pink-400 hover:bg-pink-700
                               text-white font-grotesk w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoTema}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;