import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { AuthContext } from '../../../contexts/AuthContext'
import { useContext } from 'react'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    
    const {usuario} = useContext(AuthContext);
    
    return (

        <div className='border bg-indigo-950
            flex flex-col rounded overflow-hidden justify-between '>
                
            <div>
                <div className="flex w-full bg-gradient-to-r from-[#1e1b4b] via-[purple] to-[#d01c5b] border text-rosa-neon font-grotesk py-2 px-4 items-center gap-4 ">
                    <img
                        // '?' = encadeamento opcional, o campo é opcional
                        src={postagem.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={postagem.usuario?.nome} />
                    <h3 className=' text-lg font-grotesk text-center uppercase'>
                        {/* '?' = encadeamento opcional, o campo é opcional */}
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 text-white font-grotesk'>
                    <h4 className='text-lg  uppercase'>{postagem.titulo}</h4>
                    <p>{postagem.texto}</p>
                    <p>Tema: {postagem.tema?.descricao}</p>
                    {/* Intl = converte a data em formato BR  */}
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>

            {
                postagem.usuario?.id == usuario.id &&
                (
                    <div className="flex">
                        <Link to={`/editarpostagem/${postagem.id}`}
                            className='w-full text-white bg-pink-400 
                            hover:bg-pink-700 flex items-center justify-center py-2'>
                            <button>Editar</button>
                        </Link>
                        <Link to={`/deletarpostagem/${postagem.id}`}  
                            className='text-white bg-slate-400 
                            hover:bg-slate-950 w-full flex items-center justify-center'>
                            <button>Deletar</button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default CardPostagem