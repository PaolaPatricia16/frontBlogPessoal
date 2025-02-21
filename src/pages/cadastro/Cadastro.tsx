import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'

function Cadastro() {

  // função de navegação da pag
  const navigate = useNavigate()
  
  //variavel de estdao
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const[confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  function retornar(){
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!')
      }catch(error){
        alert('Erro ao cadastrar o usuário!')
      }
    }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''})
      setConfirmaSenha('')
    }

    setIsLoading(false)
  }

  return (
    <>
    {/* place-... = justifica e alinha os elementos em um container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen 
            place-items-center font-bold">
      

        <div className=" w-full flex justify-center lg:justify-end overflow-hidden" >
                <img
                            src="https://ik.imagekit.io/pphc/y2k-website-window-illustration.jpg?updatedAt=1740103521549"
                            alt="Imagem Página Login"
                        
                ></img>
        </div>

        <form className='flex justify-center items-center flex-col w-2/3 gap-3 font-grotesk' onSubmit={cadastrarNovoUsuario} >
          <h2 className='text-rosa-neon text-5xl'>Cadastrar</h2>
          
          <div className="flex flex-col w-full text-rosa-neon">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
            // placeholder = é o texto que aparece na caixa antes do usuário digitar
              placeholder="Nome" 
              className="border-2 border-rosa-neon text-indigo-950 rounded p-2"
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
             
            />
          </div>

          <div className="flex flex-col w-full text-rosa-neon">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-rosa-neon text-indigo-950 rounded p-2"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full text-rosa-neon">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-rosa-neon text-indigo-950 rounded p-2"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full text-rosa-neon">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-rosa-neon text-indigo-950 rounded p-2"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full text-rosa-neon">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-rosa-neon text-indigo-950 rounded p-2"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>

          <div className="flex justify-around w-full gap-8">
            {/* hover... = atribui uma cor quando o mouse passa por cima do elemento */}
            <button className='rounded text-white bg-slate-400 
                  hover:bg-slate-950 w-1/2 py-2' onClick={retornar}>
              Cancelar
            </button>

            <button 
                type='submit'
                className='rounded text-white bg-pink-400
                           hover:bg-pink-700 w-1/2 py-2
                           flex justify-center' 
            >
                {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                /> :
                  <span>Cadastrar</span>
                }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro