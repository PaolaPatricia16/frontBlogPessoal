import './Cadastro.css'

function Cadastro() {
  return (
    <>
    {/* place-... = justifica e alinha os elementos em um container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3 font-grotesk' >
          <h2 className='text-indigo-900 text-5xl'>Cadastrar</h2>
          
          <div className="flex flex-col w-full text-indigo-900">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
            // placeholder = é o texto que aparece na caixa antes do usuário digitar
              placeholder="Nome" 
              className="border-2 border-[#ff007f] rounded p-2"
             
            />
          </div>
          <div className="flex flex-col w-full text-indigo-900">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-[#ff007f] rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full text-indigo-900">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-[#ff007f] rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full text-indigo-900">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-[#ff007f] rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full text-indigo-900">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-[#ff007f] rounded p-2"
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            {/* hover... = atribui uma cor quando o mouse passa por cima do elemento */}
            <button className='rounded text-white bg-red-400 
                  hover:bg-red-700 w-1/2 py-2' >
              Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-950 w-1/2 py-2
                           flex justify-center' 
                >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro