import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    // variavel data armazena a data atual
    let data = new Date().getFullYear() 

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <div className="flex justify-center bg-gradient-to-r from-[#1e1b4b] via-[purple] to-[#d01c5b]
            text-rosa-neon font-grotesk">
                {/*flex-col = define que os itens serão flexiveis e que estarão posicionados na vertical  */}
                <div className="container flex flex-col items-center py-2">
                    <p className='text-xl font-semibold'>
                        Blog Pessoal - Paola Patricia | Copyright: {data}
                    </p>
                    <p className='text-base'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2 text-white'>
                        <a 
                            href='http://www.linkedin.com/in/paola-patricia-9bba6b15a'>
                                  <LinkedinLogo size={40} weight='bold'  />
                        </a>
                        <a
                            href='https://github.com/PaolaPatricia16' >
                                  <GithubLogo size={40} weight='bold' />
                        </a>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            { component }
        </>
    )
}

export default Footer