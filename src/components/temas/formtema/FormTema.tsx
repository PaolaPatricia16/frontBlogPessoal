import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";

function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema)

    //Variavel para confirmar se o Cadastro/Atualização foi finalizada
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
   
    const token = usuario.token

    //useParams = Acessa o parâmetro id, enviado dentro da URL da rota de atualizar tema
    const { id } = useParams<{ id: string }>();

    // endpoint consultar tema por id
    async function buscarPorId(id: string) {
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

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    // atualiza o estado da variavel tema
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            // os ... significa que estamos criando um novo tema com os novos inputs.
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/temas")
    }

    // função responsável por criar/atualizar os temas com base nos dados recebido do formulario (ChangeEvent....)
    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
       // chama uma função da variavel e , para impedir o recarregamento da pág. Assim mantemos os dados do context e nao perdemos o token
        e.preventDefault()
      
        // muda o valor da variavel para indicar que o processo de cadastr/atualização esta em andamento
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('O Tema foi atualizado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o tema.')
                }

            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('O Tema foi cadastrado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o tema.')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="font-grotesk text-rosa-neon text-4xl text-center my-8">
               {/* If ternário, se o id==undefined o título sera CAdastrar tema, senão Editar tema */}
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema} >
                <div className="flex flex-col gap-2 font-grotesk text-rosa-neon text-xl">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-rosa-neon rounded text-indigo-950 p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                
                <button
                    className="rounded font-grotesk text-slate-100 bg-pink-400
                               hover:bg-pink-700 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">

                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :

                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;

