import Modal from 'react-modal';
import fashionOfHome from '../../image/Cardapio/Panela.png';
import { useTranslation } from 'react-i18next';

const ModaDaCasa = ({ isOpen, onRequestClose, content }) => {
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={t('MODA_DA_CASA')}
            className="bg-white w-[90%] max-w-[500px] h-auto focus:outline-none shadow-lg md:w-[50%] lg:max-w-[600px]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
            shouldCloseOnOverlayClick={true}
        >
            <div className='w-full p-6 md:p-10 bg-[#007BC0] h-full'>
                {content}
                <div className='w-full md:w-[60%] text-white gap-5 font-semibold justify-center items-center flex'>
                    <img src={fashionOfHome} className='w-[15%] md:w-[15%] h-auto' alt={t('MODA_DA_CASA')} />
                    <h1 className='text-2xl md:text-3xl'>{t('MODA_DA_CASA')}</h1>
                </div>
                <div className='items-center mt-3 mb-3 gap-4 focus:outline-none font-bold text-white flex'>
                    <p>
                        {t('DATA_EXEMPLO')}
                    </p>
                    <select className='min-w-[10%] flex bg-[#007BC0] text-white h-[40px]'>
                        <option value="">{t('DOMINGO')}</option>
                        <option value="">{t('SEGUNDA')}</option>
                        <option value="">{t('TERCA')}</option>
                        <option value="">{t('QUARTA')}</option>
                        <option value="">{t('QUINTA')}</option>
                        <option value="">{t('SABADO')}</option>
                        <option value="">{t('SEXTA')}</option>
                    </select>
                </div>
                <div className='text-white font-semibold text-sm md:text-base pl-2 md:pl-6'>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                    <p>{t('CARNE_ASSADA_AO_VINHO')}</p>
                </div>
            </div>
        </Modal>
    );
}

export default ModaDaCasa;
