import { createContext, useState } from "react"

export const PreloadContext = createContext()

export const PreloadProvider = props => {

    const [user, setuser] = useState(
        {
            nama : 'Mario Dandhy Satrio',
            nip : '817931767',
            seksi : 'Pengawasan II'
        }
    )

    const [approvalList, setapprovalList] = useState(
        [
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
        ]
    )

    const [historyList, setHistoryList] = useState(
        [
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
            {
                id : '_2319231828312',
                jenis : 'Tesla Cybertruck III',
                plat : 'KM3B4 KH',
                nost : 'ST-32/WPJ.0405/KP.0404/2023',
                tglst : '2022-2-3',
                pic : 'David Ozai',
                seksi :'Pengawasan III',
                pengguna : ['Hosea Pakpahan', 'Venus Bumi', 'Hutasoit Andareas Minggo'],
                mulai : '2023-1-23',
                akhir : '2023-1-24'
            },
        ]
    )

    return (
        <PreloadContext.Provider value={{ 
            user,
            approvalList,
            historyList
            }}>
            {props.children}
        </PreloadContext.Provider>
    )
}