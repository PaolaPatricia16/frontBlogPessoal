import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado", "alerta")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta("Tema apagado com sucesso", "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }else {
                ToastAlerta("Erro ao deletar o tema.", "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }


    // redireciona o usuário para a rota de Listagem dos Temas.
    function retornar() {
        navigate("/temas")
    }
    
    return (
        <div className='container w-1/3 mx-auto py-4 '>
            <h1 className='text-4xl text-center text-rosa-neon font-grotesk my-4'>Deletar tema</h1>
            <p className='text-center font-grotesk text-rosa-neon text-xl mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-gradient-to-r from-[#1e1b4b] via-[purple] to-[#d01c5b]
  text-rosa-neon font-grotesk text-2xl border'>
                    Tema
                </header>
                <p className='p-8 text-2xl bg-indigo-950 text-white h-full'>{tema.descricao}</p>
                <div className="flex">
                    
                    <button 
                        className='text-slate-100 bg-slate-400 hover:bg-slate-950 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    
                    <button 
                        className='w-full text-slate-100 bg-pink-400
                                   hover:bg-pink-700 flex items-center justify-center'
                                   onClick={deletarTema}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                    
                </div>
            </div>
        </div>
    )
}
export default DeletarTema