import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className=" bg-indigo-950 flex justify-center">
                <div className='container grid grid-cols-2 text-rosa-neon'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-grotesk'>
                            Seja Bem Vindo!
                        </h2>
                        <p className='text-xl font-grotesk' >
                            Expresse aqui seus pensamentos e opniões
                        </p>
                        {/* gap = define o espeçamento entre linhas e colunas  */}
                        <div className="flex justify-around gap-4 ">
                            {/* rounded = define que o elemento irá ter bordas arredondadas em 0.25rem */}
                            <div className='flex justify-around gap-4 '>
                              <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://ik.imagekit.io/pphc/freepik__adjust__26631.png"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    )
}

export default Home