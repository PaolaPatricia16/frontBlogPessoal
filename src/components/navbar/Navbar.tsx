import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }

    // Variavel do tipo ReactNode que irá permitir que todo valor armazenado nela possa ser renderizado na tela pelo React
    let component: ReactNode

    // Se o token for != de vazio, será apresentado o Navbar com o html/css definido
    if (usuario.token !== "") {

        component = (
            //  w-full = width (largura) em 100% da tela 
            //  py = padding (borda interna) y = supeior e inferior 
            //  justify-center = posiciona os itens no centro do container horizontalmente 
            <div className='w-full flex justify-center py-4
            bg-gradient-to-r from-[#1e1b4b] via-[purple] to-[#d01c5b] text-rosa-neon'>
                {/* justify-between = posiciona os itens na horizontal e os distribui uniformemente */}
                {/* /* text-lg = define o tamanho da fonte e da linha  */}
                <div className="container flex justify-between text-lg font-grotesk py-1 px-3">

                    {/* Link = atribui a rota criada no App.tsx */}
                    <Link to='/home' className="text-2xl font-bold"> Blog Pessoal - Paola Patricia </Link>

                    {/* gap-4 = define o tamanho das lacunas entre os elementos */}
                    <div className='flex gap-6 text-indigo-950 font-semibold text-xl'>
                        {/* O 'Link to=' atribui a rota definida no App.tsx */}
                        <Link to='/postagens' className='hover:underline'>Postagens</Link>

                        <Link to='/temas' className="hover:underline"> Temas </Link>
                        
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>

                        <Link to='/perfil' className='hover:underline'>Perfil</Link>
                        
                        <Link to='/Login' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        )
    }

    
    return (
        <>
            {component}
        </>
    )
}

export default Navbar