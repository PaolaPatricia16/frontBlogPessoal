// createContext = função do React que permite criarmos o contexto.
// useState = o hook que permite criarmos uma variável de estado
import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"

// Define a estrutura do Contexto
interface AuthContextProps {
    usuario: UsuarioLogin
    // handleLogout = para realizar o logout do usuário
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}
// Define a estrutura do Coponente Provedor
interface AuthProviderProps {
    // encapsula e represnta as propriedades FILHO
    children: ReactNode
}

//Constroi e exporta o Contexto
export const AuthContext = createContext({} as AuthContextProps)

//Constroi e exporta o AuthProvider (gerenciar o contexto da aplicação)
export function AuthProvider({ children }: AuthProviderProps) {

    // usuario = utilizada para armazenar as informações do usuário autenticado
    //<UsuarioLogin> = notação genérica (Generic) que informa ao TypeScript o tipo de dado que useState deve esperar para o estado usuario
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    // função assíncrona que recebe o argumento userLogin,
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        //indica que a aplicação está aguardando a conclusão do processo de autenticação.
        setIsLoading(true)
        try {
            // await = indica que a operação é Assíncrona (retorna uma Promise), e a função aguardará a conclusão da operação, antes de continuar o fluxo natural.
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }
        // Altera o estado isLoading para false, indicando que o processo de autenticação foi concluído.
        setIsLoading(false)
    }

    

    // Define todas as suas propriedades com os valores padrão.
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        //Renderiza o componente AuthProvider com o contexto definido
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}