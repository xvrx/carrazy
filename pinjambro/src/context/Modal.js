import { createContext, useState } from "react"

export const ModalContext = createContext()

export const ModalProvider = props => {

    // general
    const [carStat, setcarStat] = useState(0)
    const [editStat, setEditStat] = useState(false)

    // main
    const [mainModal, setMainModal] = useState(false)
    const [mainModalTitle, setmainModalTitle] = useState('Preview Records')
    
    const [displayerContainer, setdisplayerContainer] = useState({
        jenis : '',
        plat : '',
        nost : '',
        tglst : '',
        pic : '',
        nip_pic: '',
        seksi :'',
        pengguna : [],
        mulai : '',
        akhir : '',
        status: '',
        nond: '',
        tglnd: '',
    })

    const [penumpangModal, setpenumpangModal] = useState(false)
    const [penumpangValue, setpenumpangValue] = useState('')
    const [penumpangflyer, setpenumpangflyer] = useState(false)


    const emptyContainer = {
        jenis : '',
        plat : '',
        nost : '',
        tglst : '',
        pic : '',
        nip_pic: '',
        seksi :'',
        pengguna : [],
        mulai : '',
        akhir : '',
        status: '',
        nond: '',
        tglnd: '',
    }

    // confirmation modal
    const [confirmModal, setconfirmModal] = useState(false)
    const [confirmTitle, setconfirmTitle] = useState('Anda Stoopid!')
    const [confirmContent, setconfirmContent] = useState('kekmana bang,,')
    const [confirmButton, setconfirmButton] = useState(1)
    const [confirmState, setconfirmState] = useState('')

    // info, err,ok
    const [confirmLogo, setconfirmLogo] = useState('err')

    // input
    const [inputModal, setInputModal] = useState(false)
    const [inputStatModal, setinputStatModal] = useState('add')
    

    const [inputContainer, setInputContainer] = useState(
        {
            jenis : '',
            plat : '',
            nost : '',
            tglst : '',
            pic : '',
            nip_pic: '',
            seksi :'',
            pengguna : [],
            mulai : '',
            akhir : '',
            status: '',
            nond: '',
            tglnd: '',
        }
    )


    return (
        <ModalContext.Provider value={{
            mainModal, setMainModal,
            mainModalTitle, setmainModalTitle,
            editStat, setEditStat,
            displayerContainer, setdisplayerContainer,
            emptyContainer,
            inputModal,
            setInputModal,
            carStat, setcarStat,
            inputStatModal, setinputStatModal,
            inputContainer, setInputContainer,
            confirmModal, setconfirmModal,
            penumpangModal, setpenumpangModal,
            penumpangValue, setpenumpangValue,
            penumpangflyer, setpenumpangflyer,
            confirmTitle, setconfirmTitle,
            confirmContent, setconfirmContent,
            confirmButton, setconfirmButton,
            confirmLogo, setconfirmLogo,
            confirmState, setconfirmState
            
            }}>
            {props.children}
        </ModalContext.Provider>
    )
}