import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {

    // variavel data armazena a data atual
    let data = new Date().getFullYear() 

    return (
        <>
            <div className="flex justify-center bg-indigo-950 text-[#ff007f] font-grotesk">
                {/*flex-col = define que os itens serão flexiveis e que estarão posicionados na vertical  */}
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-semibold'>
                            Blog Pessoal Generation | Copyright: {data}
                        </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <LinkedinLogo size={48} weight='bold' />
                        <InstagramLogo size={48} weight='bold' />
                        <FacebookLogo size={48} weight='bold' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer