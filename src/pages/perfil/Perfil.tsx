import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'


function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token == "") {
            ToastAlerta("Você precisa estar logado", "alerta")
            navigate("/")
        }
    }, [usuario.token])

    return (         

        <div className='container  bg-gradient-to-r from-[#b55677] to-[#d01c5b] w-5/6 mx-auto h-auto rounded-2xl overflow-hidden'>
{/* flex flex-col  */}
            <img 
                className='w-full h-80 object-cover border-b-8 border-indigo-950 ' 
                src="https://ik.imagekit.io/pphc/y2k-website-window-illustration.jpg?updatedAt=1740103521549" alt="Capa do Perfil" />

            <img 
                className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-indigo-950 relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

            <div className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-gradient-to-r from-[#b55677] to-[#d01c5b] text-indigo-950 font-grotesk font-semibold text-2xl items-center justify-center"
            >
                <p>Nome: {usuario.nome} </p>
                <p>Email: {usuario.usuario}</p>
          
            </div>

        </div>
    )
}

export default Perfil