import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// url = representa o endereço do endpoint da API que irá receber este GET.
// setDados = função que irá atualizar o Estado, após receber os dados do backend no corpo da requisição. 
//            Podendo ser um dado único ou uma Array
// header = contém o cabeçalho da requisição HTTP. Estamos usando ele para enviar o token de autorização no cabeçalho do HTTP.
export const buscar = async (url: string, setDados: Function, header: Object) => {
    // Utilizando a URL especificada na variavel url, fazemos a requisição HTTP Get.
    // Por ser um Get, não enviamos dados no corpo da requisição.
    // Header = enviamos o token de autenticação para liberar o acesso ao endpoint associados a URL.
    // await = esperamos a conclusão da requisição para prosseguir.
    const resposta = await api.get(url, header)
    // setDados = função que recebe a 'resposta' da requisição para atualizar os dados na aplicação.
    setDados(resposta.data)
}

// dados = armazena os dados enviados pelo front na requisição do tipo POST ao backend
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}


