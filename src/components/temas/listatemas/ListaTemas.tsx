import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";

function ListaTemas() {

    const navigate = useNavigate();

    const [temas, setTemas] = useState<Tema[]>([])

    //Acessando 2 variaveis do AuthContext
    const { usuario, handleLogout } = useContext(AuthContext)
    
    // Variável token recebe o usuario.token do backend
    const token = usuario.token

    //Função assíncrona, que busca os temas. Com tratativa de erro, validando o token, se expirado deslogado o usuário.
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

    // Verifica se tem o token de autorização para acessar a pagina
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // Após a mudança de estado da variavel temas, chama a função buscarTemas e 
    // monitora o tamannho da Array, sempre que houver uma mudança a função buscarTemas sera executada.
    useEffect(() => {
        buscarTemas()    
    }, [temas.length])
    

    return (
        <>
        {/* Sempre que o Estado temas estiver vazio sera exibido o DNA */}
        {temas.length === 0 && (
            <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"/>
        )}


            <div className="flex justify-center w-full my-0 py-7 px-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {/* map = função do JS utilizada para Arrays. Ela cria um novo array, após iterar cada elemento do array de origem (Estado temas) */}
                        {temas.map((tema) => (
                        //Chamamos o componente CardTemas 
                        // key =  função própria do react, para renderizar o obj  especifico.
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;