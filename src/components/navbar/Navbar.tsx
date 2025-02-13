import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }

    return (
        <>
        {/* w-full = width (largura) em 100% da tela */}
        {/* py = padding (borda interna) y = supeior e inferior */}
        {/* justify-center = posiciona os itens no centro do container horizontalmente */}
            <div className='w-full flex justify-center py-4
            			   bg-indigo-950 text-[#ff007f]'>
               {/* justify-between = posiciona os itens na horizontal e os distribui uniformemente */}
               {/* text-lg = define o tamanho da fonte e da linha */}
                <div className="container flex justify-between text-lg font-grotesk">
                
                   {/* Link = atribui a rota criada no App.tsx */}
                    <Link to='/home' className="text-2xl font-bold"> Blog Pessoal </Link>
                  
                    {/* gap-4 = define o tamanho das lacunas entre os elementos */}
                    <div className='flex gap-4'>
                        Postagens
                        Temas
                        Cadastrar tema
                        Perfil
                        <Link to='/Login' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar