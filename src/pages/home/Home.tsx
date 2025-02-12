
function Home() {
    return (
        <>
            <div className=" bg-indigo-950 flex justify-center">
                <div className='container grid grid-cols-2 text-[#ff007f]'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-grotesk'>
                            Seja Bem Vinde!
                        </h2>
                        <p className='text-xl font-grotesk' >
                            Expresse aqui seus pensamentos e opniões
                        </p>

                        <div className="flex justify-around gap-4">
                            {/* rounded = define que o elemento irá ter bordas arredondadas em 0.25rem */}
                            <div className='rounded text-white 
                                            border-pink-800 border-solid border-2 py-2 px-4 font-grotesk'
                                >
                                Nova Postagem
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home