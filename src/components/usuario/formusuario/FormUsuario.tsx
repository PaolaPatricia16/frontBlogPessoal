import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Usuario from "../../../models/Usuario";
import { buscar, atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormUsuario() {

    const navigate = useNavigate();

    const [user, setUser] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
      })

    //Variavel para confirmar se o Cadastro/Atualização foi finalizada
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
   
    const token = usuario.token

    const[confirmaSenha, setConfirmaSenha] = useState<string>("")

    //useParams = Acessa o parâmetro id, enviado dentro da URL da rota de atualizar usuario
    const { id } = useParams<{ id: string }>();

    // endpoint consulta usuario por id
    async function buscarPorId(id: string) {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

 

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    // atualiza o estado da variavel 
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            // os ... significa que estamos criando um novo tema com os novos inputs.
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
        setConfirmaSenha(e.target.value)
      }

    function retornar() {
        navigate("/perfil")
    }

    // função responsável por criar/atualizar  com base nos dados recebido do formulario (ChangeEvent....)
    async function atualizarUsuario(e: ChangeEvent<HTMLFormElement>) {
       // chama uma função da variavel e , para impedir o recarregamento da pág. Assim mantemos os dados do context e nao perdemos o token
        e.preventDefault()
      
        // muda o valor da variavel para indicar que o processo de atualização esta em andamento
        setIsLoading(true)

        if (id !== undefined) {

            if(confirmaSenha === user.senha && user.senha.length >= 8){
                try {
                    await atualizar(`/usuarios/atualizar`, user, setUser, {
                        headers: { 'Authorization': token }
                    })
                    ToastAlerta("O usuario foi atualizado com sucesso!","sucesso")
                    retornar();
                } catch (error: any) {
                    if (error.toString().includes('403')) {
                        handleLogout();
                    } else {
                        ToastAlerta("Erro ao atualizar os dados.", "erro")
                    }
                }
            } else{
                ToastAlerta("Dados do usuário ou senha inconsistentes! Verifique as informações do cadastro.", "erro")
                setUser({...user, senha: ''});
                setConfirmaSenha('');
            }
        
        }

        setIsLoading(false);
       
    }

    return (

        <div className="bg-indigo-950 container flex flex-col mx-auto   items-center font-grotesk">
            <h1 className="text-4xl text-center text-rosa-neon my-8">
                Atualizar Dados
            </h1>

            <form className="flex flex-col w-1/2 gap-4 py-3" onSubmit={atualizarUsuario}>
                <div className="flex flex-col gap-2 text-rosa-neon">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        // placeholder = é o texto que aparece na caixa antes do usuário digitar
                        placeholder="Nome" 
                        className=" text-indigo-950 border-2 border-rosa-neon rounded p-2"
                        value={user.nome || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2 text-rosa-neon">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        className="border-2 border-rosa-neon rounded text-indigo-950 p-2"
                        value={user.senha || ""} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col w-full text-rosa-neon">
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    className="border-2 border-rosa-neon text-indigo-950 rounded p-2"
                    value={confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                    />
              </div>

              {user.foto ? (
                    <img src={user.foto} alt="Foto do usuário" className="rounded-full w-24 h-24" />
                    ) : (
                    <img src="" alt="Foto padrão" className="rounded-full w-24 h-24" />
                    )}

                <div className="flex flex-col gap-2 text-rosa-neon">
                    <label htmlFor="foto">Foto</label>
                    <input
                        type="text"
                        id="foto"
                        name="foto"
                        placeholder="Foto"
                        className="border-2 border-rosa-neon rounded text-indigo-950 p-2"
                        value={user.foto || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-pink-400 hover:bg-pink-700
                               text-white font-grotesk w-1/2 mx-auto py-2 flex justify-center'
                  
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Atualizar</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormUsuario;

