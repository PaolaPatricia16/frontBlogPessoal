import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import './App.css'
import ListaTemas from './components/temas/listatemas/ListaTemas'
import FormTema from './components/temas/formtema/FormTema'
import DeletarTema from './components/temas/deletartema/DeletarTema'
import ListaPostagens from './components/postagens/listapostagens/ListaPostagens'
import FormPostagem from './components/postagens/formpostagem/FormPostagem'
import DeletarPostagem from './components/postagens/deletarpostagem/DeletarPostagem'
import Perfil from './pages/perfil/Perfil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
        {/* Navbar e Footer terão posição fixa, por isso estão fora do ROUTES */}
          <Navbar />
          {/* div = para envolver todos os elementos que irão receber uma rota.
          min-h.. = define altura mínima, para não afetar o footer*/}
          <div className="grid  items-center  min-h-screen bg-indigo-950">
            <Routes>
                {/* '/' = aponta para a tela inicial do site */}
                <Route path="/" element={<Login />} />
             
                {/* /home = aponta para a tela home */}
                <Route path="/home" element={<Home />} />
                <Route path='/cadastro' element={<Cadastro/>} />
                <Route path='/login' element={<Login/>} />
                <Route path="/temas" element={<ListaTemas />} />
                <Route path="/cadastrartema" element={<FormTema />} />
                <Route path="/editartema/:id" element={<FormTema />} />
                <Route path="/deletartema/:id" element={<DeletarTema />} />
                <Route path="/postagens" element={<ListaPostagens />} />
                <Route path="/cadastrarpostagem" element={<FormPostagem />} />
                <Route path="/editarpostagem/:id" element={<FormPostagem />} />
                <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App