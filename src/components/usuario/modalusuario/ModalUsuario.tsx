import Popup from 'reactjs-popup';
import FormUsuario from '../formusuario/FormUsuario';

import 'reactjs-popup/dist/index.css';
import './ModalUsuario.css'

function ModalUsuario() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='bg-gradient-to-r from-[#1e1b4b] to-[#d01c5b]
                                     border rounded px-4 py-2 font-grotesk text-white hover:text-rosa-neon hover:from-[white] hover:to-[white] '>
                        Atualizar 
                    </button>
                }
                modal
            >
                <FormUsuario />
            </Popup>
        </>
    );
}

export default ModalUsuario;