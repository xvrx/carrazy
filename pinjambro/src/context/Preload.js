import { createContext, useState, useEffect } from "react"


export const PreloadContext = createContext()

export const PreloadProvider = props => {

    const [loading, setLoading] = useState(false)


    // const [currentDate, setcurrentDate] = useState(new Date())

    const [user, setuser] = useState(
        {
            nama : 'Unknown User',
            nip : '000000000',
            seksi : 'Seksi Unknown',
            role : ''
        }
    )

    const [carModel, setcarModel] = useState([
        // {
        //     jenis : 'Tidak ditemukan Data apapun', 
        //     plat : 'undefined', 
        //     peminjaman: []
        // },
    ])



    const [mainData, setmainData] = useState([])


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

    // useEffect(() => {
    //   updateMainData()
    
    // }, [historyList, approvalList])
    

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