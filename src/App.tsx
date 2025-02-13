import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import './App.css'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        {/* Navbar e Footer terão posição fixa, por isso estão fora do ROUTES */}
          <Navbar />
          {/* div = para envolver todos os elementos que irão receber uma rota.
          min-h.. = define altura mínima, para não afetar o footer*/}
          <div className="min-h-[80vh]">
            <Routes>
                {/* '/' = aponta para a tela inicial do site */}
                <Route path="/" element={<Login />} />
             
                {/* /home = aponta para a tela home */}
                <Route path="/home" element={<Home />} />
                <Route path='/cadastro' element={<Cadastro/>} />
                <Route path='/login' element={<Login/>} />
              
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App