import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';

import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css'

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='bg-gradient-to-r from-[#1e1b4b] to-[#d01c5b]
                                     border rounded px-4 py-2 font-grotesk text-white hover:text-rosa-neon hover:from-[white] hover:to-[white] '>
                        Nova Postagem
                    </button>
                }
                modal
            >
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;