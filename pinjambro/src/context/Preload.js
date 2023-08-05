import { createContext, useState } from "react"


export const PreloadContext = createContext()

export const PreloadProvider = props => {

    const [loading, setLoading] = useState(false)


    // const [currentDate, setcurrentDate] = useState(new Date())

    const [user, setuser] = useState(
        {
            nama : 'Unknown User',
            nip : '000000000',
            seksi : 'Seksi Unknown'
        }
        // {
        //     nama : 'Mario dendi kusumo',
        //     nip : '817931767',
        //     seksi : 'Pengawasan II'
        // }
    )

    const [carModel, setcarModel] = useState([
        {
            jenis : 'Avanza', 
            plat : 'avanza_KH54', 
            peminjaman: [
                {_id: '32fdfgthgwefwef', mulai: '2023-03-23', akhir: '2023-03-25'}
            ]
        },
        {
            jenis : 'Rubicoon', 
            plat : 'coco_KH42',
            peminjaman: []
        },
        {
            jenis : 'Ertiga',
            plat : 'ertiga_KH35',
            peminjaman: [
                {_id: '564gh4534534', mulai: '2023-03-23', akhir: '2023-03-24'}
            ]
        },
        {
            jenis : 'Innova', 
            plat : 'innovaWhite_KH27',
            peminjaman: [
                {_id: '_2319231828312', mulai: '2023-03-30', akhir: '2023-03-31'},
                {_id: '4f4fef4fsdfs4fgsr', mulai: '2023-03-26', akhir: '2023-03-27'}
            ]
        },
        {
            jenis : 'Prado', 
            plat : 'prado_KH22',
            peminjaman: [
                {_id: 'b6fybyhr6br6nhb', mulai: '2023-03-24', akhir: '2023-03-25'}
            ]
        },
        {
            jenis : 'Prado (Hitam)', 
            plat : 'pradoBlack_KH25',
            peminjaman: [
                {_id: 'fsefsefef', mulai: '2023-03-25', akhir: '2023-03-26'}
            ]
        },
        {
            jenis : 'Ranger', 
            plat : 'rangerWhite_KH23',
            peminjaman: [
                {_id: 'j8yjm6hr6h', mulai: '2023-03-23', akhir: '2023-03-24'},
                {_id: 'hr6h6ujt7j', mulai: '2023-03-25', akhir: '2023-03-26'}
            ]
        }
    ])



    const [mainData, setmainData] = useState([
        // {
        //     _id : '32fdfgthgwefwef',
        //     jenis : 'Avanza', v
        //     plat : 'avanza_KH54', v
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023', v
        //     tglst : '2022-2-5', 
        //     nip_pic: '817931767',
        //     pic : 'David Ozai',
        //     seksi :'Pengawasan III',
        //     pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-3-23',
        //     akhir : '2023-3-25',
        //     status: 'ongoing',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // },
        // {
        //     _id : '564gh4534534',
        //     jenis : 'Ertiga',
        //     plat : 'ertiga_KH35',
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023',
        //     tglst : '2022-2-3',
        //     nip_pic: '917845624',
        //     pic : 'Duladji',
        //     seksi :'Ekstensifikasi',
        //     pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-3-23',
        //     akhir : '2023-3-24',
        //     status: 'rejected',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // },
        // {
        //     _id : '_2319231828312',
        //     jenis : 'Innova',
        //     plat : 'innovaWhite_KH27',
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023',
        //     tglst : '2022-2-3',
        //     nip_pic: '817451562',
        //     pic : 'Mahkore',
        //     seksi :'Pengawasan III',
        //     pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-3-30',
        //     akhir : '2023-3-31',
        //     status: 'waiting',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // },
        // {
        //     _id : '4f4fef4fsdfs4fgsr',
        //     jenis : 'Innova',
        //     plat : 'innovaWhite_KH27',
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023',
        //     tglst : '2022-2-3',
        //     nip_pic: '184515265',
        //     pic : 'Entropy',
        //     seksi :'Pengawasan III',
        //     pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-3-26',
        //     akhir : '2023-3-27',
        //     status: 'approved',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // },
        // {
        //     _id : 'b6fybyhr6br6nhb',
        //     jenis : 'Prado',
        //     plat : 'prado_KH22',
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023',
        //     tglst : '2022-2-3',
        //     nip_pic: '817495625',
        //     pic : 'Kakako',
        //     seksi :'Pengawasan III',
        //     pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-3-24',
        //     akhir : '2023-3-25',
        //     status: 'approved',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // },
        // {
        //     _id : 'fsefsefef',
        //     jenis : 'Prado (Hitam)',
        //     plat : 'pradoBlack_KH25',
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023',
        //     tglst : '2022-2-3',
        //     nip_pic: '817451542',
        //     pic : 'David',
        //     seksi :'Pengawasan III',
        //     pengguna : ['Alex zebua', 'Babi Anugrah', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-3-25',
        //     akhir : '2023-3-26',
        //     status: 'approved',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // },
        // {
        //     _id : 'j8yjm6hr6h',
        //     jenis : 'Ranger',
        //     plat : 'rangerWhite_KH23',
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023',
        //     tglst : '2022-2-3',
        //     pic : 'Davd Ozai',
        //     nip_pic: '817965625',
        //     seksi :'Pengawasan III',
        //     pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-1-23',
        //     akhir : '2023-1-24',
        //     status: 'waiting',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // },
        // {
        //     _id : 'hr6h6ujt7j',
        //     jenis : 'Ranger',
        //     plat : 'rangerWhite_KH23',
        //     nost : 'ST-32/WPJ.0405/KP.0404/2023',
        //     tglst : '2022-2-3',
        //     pic : 'kk Ozai',
        //     nip_pic: '814548548',
        //     seksi :'Pengawasan III',
        //     pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
        //     mulai : '2023-3-25',
        //     akhir : '2023-3-26',
        //     status: 'waiting',
        //     nond : 'ND-23/WPJ.2034/2023',
        //     tglnd : '2023-1-23'
        // }
    ])


    const [totalRec, settotalRec] = useState(0)
    const [startFrom, setstartFrom] = useState(0)
    const [approvalList, setapprovalList] = useState([])
    const [ongoingList, setongoingList] = useState([])
    const [rejectedList, setRejectedList] = useState([])
    const [historyList, setHistoryList] = useState([])


    // const approvalnoeffect = mainData.filter(data => {data.status === 'waiting' })

    function updateMainData () {
        setapprovalList(
            mainData.filter(data => {
                return(
                    data.status === 'waiting' 
                )
              }
         ))
    
        setHistoryList(
            mainData.filter(data => {
                return(
                    data.status === 'done' ||
                    data.status === 'ongoing' ||
                    data.status === 'rejected' ||
                    data.status === 'approved' 
                )
              }
        ))
    }

    return (
        <PreloadContext.Provider value={{ 
            user,setuser,
            approvalList,setapprovalList,
            ongoingList, setongoingList,
            rejectedList, setRejectedList,
            carModel, setcarModel,loading, setLoading,mainData,
            setmainData,startFrom, setstartFrom,
            historyList, setHistoryList,
            totalRec, settotalRec,updateMainData
            }}>
            {props.children}
        </PreloadContext.Provider>
    )
}