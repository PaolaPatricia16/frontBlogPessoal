import {Link} from 'react-router-dom'
import Tema from '../../../models/Tema'


interface CardTemasProps{
    tema: Tema
}

// Função vai receber o objeto 'tema' do TIPO TEMA (ou seja,  da estrutura da model tema).
// CardTemasProps = nos permitee acessar os atributos dentro do objeto 'tema' de forma direta, por Atribuição por Destruturação.
function CardTemas({ tema }: CardTemasProps) {

    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden font-grotesk justify-between'>
            <header className='py-2 px-6 bg-gradient-to-r from-[#1e1b4b] via-[purple] to-[#d01c5b]
 text-rosa-neon  text-2xl border'>
           {/* Com JS injetamos a descrição do tema para este card. */}
                Tema
            </header>
            {/*{tema.descricao} =  chamando por meio de Atribuição por Destruturaçã */}
            <p className='p-8 text-2xl text-white bg-indigo-950 h-full'> {tema.descricao} </p>

            <div className='flex'>
                {/* Os button estão dentro de um Link, para que posteriormente seja atribuido a rota correspondente para o backend dessas fucionalidades */}
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-slate-100 bg-pink-400 hover:bg-pink-700 flex items-center justify-center py-2'>
                        <button> Editar </button>
                </Link>

                <Link to={`/deletartema/${tema.id}`}  
                    className='text-slate-100 bg-slate-400 hover:bg-slate-950 w-full flex items-center justify-center'>
                        <button> Deletar </button>
                    </Link>
            </div>
        </div>
    )
}

export default CardTemas