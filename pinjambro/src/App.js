import { useContext, useEffect, useRef, useState } from 'react';
import './App.css';

// date picker
import { RangeDatePicker, SingleDatePicker  } from 'react-google-flight-datepicker';
import './comp/dateRange.css';

import LoadingOverlay from './LoadingOverlay';
import MainLogo from "./MainLogo";




import {MdBlock,MdErrorOutline,MdAutoAwesome, MdLogout, MdOutlineCloseFullscreen,MdSearch, MdOutlineEmojiPeople, MdRule, MdOutlineHistory,MdOutlineFileDownload 
  , MdClose,MdOutlineLocalHospital, MdOutlineDone,MdAddLocationAlt, MdOutlineLocationOn } from "react-icons/md";
// Context
import {PreloadContext} from './context/Preload';
import {ModalContext} from './context/Modal';
import {UtilsContext} from './context/Utils';
import { ApiContext } from './context/API';


// import comp
import { Inputx } from './comp/Inputx';
import {ButtonOne, ButtonTwo} from './comp/Button'

// axios
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import DisplayContainer from './comp/DisplayContainer';

axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = `http://${window.location.hostname}:2000`;


function App() {
  const { formatDate,checkIfWithin, normalizeDate,currentDate,next30dayz,setcurrentDate, ifSliced,checkIfDateSliced, } = useContext(UtilsContext)
  
  
  const {loading, setLoading, user, setapprovalList, approvalList, mainData,
    setmainData,historyList, carModel, setuser
    , totalRec, settotalRec,setHistoryList,setcarModel,
    startFrom, setstartFrom,updateMainData
  }   = useContext(PreloadContext)
  
  const {mainModal, setMainModal,emptyContainer,
        editStat, setEditStat,
        displayerContainer, setdisplayerContainer,
        inputModal, setInputModal,
        carStat, setcarStat,
        inputContainer, setInputContainer,
        penumpangModal, setpenumpangModal,
        confirmModal, setconfirmModal,
        confirmTitle, setconfirmTitle,
        confirmContent, setconfirmContent,
        confirmButton, setconfirmButton,
        penumpangValue, setpenumpangValue,
        penumpangflyer, setpenumpangflyer,
        confirmLogo, setconfirmLogo,
        confirmState, setconfirmState,
  } = useContext(ModalContext)

  const [resetState, setresetState] = useState(false)

  const { currentHost, apiLogin, apiVerify } = useContext(ApiContext)

  // verify current user cookie
 useEffect(() => {
  axios
  .get(currentHost + "auth/verify", { withCredentials: true })
    .then((res) => {
      // console.log('verify in app.js: ', res );
      loader(false);
      if (res?.data?.stat) { 

        // if auth is true, download necessary data
        // set user profile
        axios.get(currentHost+'api/profile', {withCredentials : true})
          .then((res) => {
            const prof = res?.data?.profile
            // console.log('profile: ', prof)
            setuser(prof)
            setcurrentDate(new Date(res?.data?.currentDate))
          })
          .catch((err) => {
            console.log(err.response)
          })

        // download main records
        axios.get(currentHost+'api/peminjaman', {withCredentials : true})
          .then((res) => {
            const some = res?.data?.mainData
            const mod = res?.data?.carMod
            // console.log('mod: ', mod)
            some && setmainData(some)
            mod && setcarModel(mod)
            settotalRec(res?.data?.tot)
            // console.log(res?.data?.history_lt)
            setstartFrom(startFrom + res?.data?.history_lt)
          })
          .catch((err) => {
            if(err?.response?.data?.login == false) {
              window.location.reload()
            } else {
              console.log(err.response)
            }
          })
      } else {

        // if auth is false, get the fk outta here. login first bruh!
        navigate("/login");
      }
    })
    .catch((err) => {
      loader(false);
      console.log("error verify in app.js:", err?.response);

    });
 
   return () => {
     {}
   }
 }, [])
 

  function previewRecords(rec) {
    console.log(rec)
    setdisplayerContainer(rec)
    setMainModal(true)
  }

const navigate = useNavigate()

 function plattery (x) {
  if (typeof x === 'string')
   {
    const y = x.split('_')[1]
    return y
   } else return ''
  } 

  function carIdx (x) {
    const maxidx = carModel.length - 1
    if (x < 0) return maxidx
    if (x > maxidx) return 0
    return x
  }

  function carIdxrev (x) {
    const maxidx = carModel.length - 1
    if (x < 0) return 0
    if (x > maxidx) return maxidx
    return x
  }

  function setstatCar(att) {
    const status = carIdxrev(carStat)
    const maxIdx = carModel.length - 1
    if(att == true) {
      if (status == maxIdx) {
        setcarStat(0)
      } else {
        setcarStat((prev) => prev + 1)
      }
    } else {
      if (status == 0){
        setcarStat(maxIdx)
      } else {
        setcarStat((prev) => prev - 1)
      }
    }
  }


  function loader (x) {
    if (x) {
      setLoading(true)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }




  function NDdatechange(x){
    const y = normalizeDate(x)
    setInputContainer({...inputContainer, tglnd: y})
  }

  function NDchange(x){
    setInputContainer({...inputContainer, nond: x})
  }

  function STchange(x){
    setInputContainer({...inputContainer, nost: x})
  }
  function STDatechange(x){
    const y = normalizeDate(x)
    setInputContainer({...inputContainer, tglst: y})
  }
  function rangeDatechange(x,y){
    const a = normalizeDate(x)
    const b = normalizeDate(y)
    setInputContainer({...inputContainer, mulai: a, akhir:b})
  }

  function displayNewInput() {
    // console.log('add new input')
    setInputContainer(
      {
        jenis : carModel[carStat].jenis,
        nost : '',
        tglst : '',
        pengguna : [],
        mulai : '',
        akhir : '',
        nond: '',
        tglnd: '',
        plat: carModel[carStat].plat, 
        pic: user?.nama || '', 
        nip_pic: user?.nip || '',
        seksi:user?.seksi || '',
        status:'waiting' }
      )

    setEditStat(false)
    setInputModal(true)
  }


  function displaybanner() {
    // console.log('should loamore displayed : ', totalRec < historyList.length)
    // console.log('approval: ',approvalList)
    // console.log('history: ',historyList)
    // console.log(carModel)
    console.log(user)
    setconfirmButton(1)
    setconfirmLogo('info')
    setconfirmTitle('About')
    setconfirmState('')
    setconfirmContent(<p>ya gitulah... <br/> <br/> kritik dan saran mohon disampaikan ke <a target="new" href='https://wa.me/6285942845262'>wa.me/6285942845262</a></p>)
    setconfirmModal(true)
  }

  function confirmLogout() {
    setconfirmButton(2)
    setconfirmLogo('info')
    setconfirmTitle('Log out!')
    setconfirmState('logout')
    setconfirmContent('Keluar dari aplikasi sekarang?')
    setconfirmModal(true)
  }

  function logOut  ( ) {
    axios.post(currentHost + 'auth/destroy', {withCredentials:true})
      .then((res) => {
        loader(true)
        console.log(res)
        res?.data?.stat && window.location.reload()
      })
      .catch((err) => {
        console.log(err.response)
        window.location.reload()
      })
  }

  function closeModal () {
    // console.log('close modal!')
    setInputModal(false)
    setconfirmModal(false)
    setresetState(false)
    setdisplayerContainer(emptyContainer); setMainModal(false)
    
  }

  function confirmCloseModal () {
    if (
      inputContainer.nond.length > 4 ||
      inputContainer.tglnd.length > 0 ||
      inputContainer.nost.length > 4 ||
      inputContainer.tglst.length > 0 ||
      inputContainer.mulai.length > 0 ||
      inputContainer.akhir.length > 0
     ) {
      setconfirmButton(2)
      setconfirmLogo('info')
      setconfirmTitle('Hapus form?')
      setconfirmState('scrapForm')
      setconfirmContent('batalkan form penambahan data?')
      setMainModal(false)
      setconfirmModal(true)
     } else {
      closeModal()
     }
  }

  function submitAddNew () {
    if (
      inputContainer.nond.length > 5 &&
      inputContainer.tglnd.length > 5 &&
      inputContainer.nost.length > 5 &&
      inputContainer.tglst.length > 5 &&
      inputContainer.mulai.length > 0 &&
      inputContainer.akhir.length > 0
    ) {

      // check if dates overlap
          const rng = [new Date(normalizeDate(inputContainer.mulai)), new Date(normalizeDate(inputContainer.akhir))]
          // console.log('range: ',rng)

            let overlap = false

            for (let i = 0; i < carModel[carStat].peminjaman.length; i++) {
              const x = carModel[carStat].peminjaman[i]

              const y = [new Date(normalizeDate(x.mulai)),  new Date(normalizeDate(x.akhir))] || '';
              // console.log(`available - ${i} : ${y}`)
              if (checkIfDateSliced(rng,y)) {
                overlap = true
                break
              } else {
                continue
              }
            };

          if (overlap) {
            setconfirmButton(1)
            setconfirmLogo('err')
            setconfirmTitle('Gagal')
            setconfirmContent("terdapat peminjaman lain di tanggal yang sama! silakan pilih tanggal lain.")
            setconfirmModal(true)
            // console.log('date is overlapped')
            return false
          } else { 
            // console.log('no overlap');
            setconfirmState('add')
            console.log(inputContainer)
            setconfirmButton(2)
            setconfirmLogo('info')
            if (resetState) {
              setconfirmTitle('Reset permohonan?')
              setconfirmContent('Ajukan kembali data peminjaman?')
            } else {
              setconfirmTitle('Tambah Data?')
              setconfirmContent('apakah anda yakin ingin menambahkan data peminjaman?')
            }
            setconfirmModal(true)
            }

    } else {
      console.log(inputContainer)
      setconfirmButton(1)
      setconfirmLogo('err')
      setconfirmTitle('Data tidak lengkap!')
      setconfirmContent('mohon untuk setidaknya mengisi nomor & tanggal ND / ST, serta tanggal awal & akhir peminjaman.')
      setconfirmModal(true)
    }
  }

  function submitEdit() {
    setconfirmState('update')
    console.log(inputContainer)
  }

  function cancelAdd() {
    closeModal()
  }

  function previewPenumpang() {
    setpenumpangModal(true)
  }

  const penumpangFocus = useRef(null)

  function addPenumpang () {
    if (penumpangValue.length >= 4) {
      setInputContainer({...inputContainer, pengguna: [...inputContainer.pengguna, penumpangValue]})
      setpenumpangflyer(true)
      penumpangFocus.current.focus()
      setTimeout(() => {
        setpenumpangflyer(false)
      }, 1000);
    } else { }
    setpenumpangValue('')
  }


  function removePenumpang(x) {
    const y = inputContainer.pengguna.filter((c,idx) => {return x != idx})
    setInputContainer({...inputContainer, pengguna: y})
  }

  function editApproval(data){
    const carIdx = carModel.findIndex((car) => car.plat == data.plat)
    setcarStat(carIdx)
    console.log(data)
    setInputContainer(data)
    setEditStat(true)
    setInputModal(true)
  }

  // confirm add new records
  function confirmAddNew() {
  loader(true)

    axios.post(currentHost+'api/peminjaman', { newrec : inputContainer } ,  {withCredentials : true})
    .then((res) => {
      console.log('data: post peminjaman',res.data)
      // const some = res?.data?.mainData
      // some && setmainData(some)
      // settotalRec(res?.data?.tot)
      if (resetState) {
        // if this is a reset request, delete previously rejected record
        console.log('reset state is true, deleting the previous record')
        axios.delete(currentHost+`api/del/${displayerContainer._id}`, {withCredentials : true})
          .then((res) => {
            console.log('delete resolved')
            const tobeDeleted = mainData.findIndex(del => del._id === displayerContainer._id)
            console.log(displayerContainer._id)
            const main = mainData
            main.splice(tobeDeleted, 1)
          })
          .catch((err) => {
            console.log('delete failed')
            console.log(err.response)
            if(err?.response?.data?.login == false) {
              window.location.reload()
            } else {
              console.log(err.response)
            }
          })
      }

      // process continue
      

      // add car model
      const newCarID = res.data.carId
      const idx = carModel.findIndex((car) => car._id == newCarID)
      const peminjamanList = res.data.newCarModel
      const newCarModel = carModel
      newCarModel[idx].peminjaman = peminjamanList
      setcarModel(newCarModel)

      // update main data
      // get rid of deleted previous record
      // add new record
      if (resetState) {
        const rejectedID = displayerContainer._id
        // update history list
        const hislist = historyList
        const historyIDX = hislist.findIndex(list => list._id === rejectedID)
        hislist.splice(historyIDX,1)
        setHistoryList(hislist)

        // update main data
        const tobeDeleted = mainData.findIndex(del => del._id === rejectedID)
        const main = mainData
        main.push(res.data.peminjaman)
        main.splice(tobeDeleted, 1)
        setmainData(main)
      } else {
        // if its not reset method, update only the main data as part of normal flow
        const newData = res.data.peminjaman
        setmainData([...mainData, newData])
      }
      
      // retarded
      updateMainData()

      setconfirmButton(1)
      setconfirmLogo('ok')
      setconfirmTitle('Success!')
      setconfirmContent('data peminjaman baru telah ditambahkan')
      loader(false)
      setMainModal(false)
      setInputModal(false)
      setconfirmModal(true)
      // set reset state back to false
      setresetState(false)
      })
    .catch((err) => {
      if (err.response)
      console.log(err.response)
      if (!err.response.login) {
        window.location.reload()
      }
      console.log(`error on adding attempt :${err.response.message}`); 
      setconfirmButton(1)
      setconfirmLogo('err')
      setconfirmTitle('Failed!')
      setconfirmContent(`error :${err.message}`)
      loader(false)
      setInputModal(false)
      setconfirmModal(true)
    })
  loader(false)
  }


  function loadmore() {
    axios.get(currentHost+'api/loadmore',{ params: { startingPoint: historyList.length } },{withCredentials : true})
      .then((res) => {
        console.log(res.data)
        const updated = historyList.concat(res?.data?.mainData)
        setHistoryList(updated)
        setstartFrom((prev) => {
          return (prev + res?.data?.mainData?.length)
        })
      })
      .catch((err) => {
        console.log('loadmore error: ',err.response)
        if(err?.response?.data?.login == false) {
          window.location.reload()
        } else {
          console.log(err.response)
        }
      })
  }
  
  function submitReject () {
    setconfirmButton(2)
    setconfirmLogo('info')
    setconfirmState('reject')
    setconfirmTitle('Tolak?')
    setconfirmContent(`Tolak permohonan peminjaman untuk seksi ${inputContainer.seksi} ?`)
    setconfirmModal(true)
  }

  function submitApprove () {
    setconfirmButton(2)
    setconfirmLogo('info')
    setconfirmState('approve')
    setconfirmTitle('approve record?')
    setconfirmContent(`setujui permohonan peminjaman untuk seksi ${inputContainer.seksi} ?`)
    setconfirmModal(true)
  }

  function confirmApprove () {
    loader(true)
    console.log('req to', currentHost+`api/update/${inputContainer._id}`)
    axios.patch(currentHost+`api/update/${inputContainer._id}`,inputContainer,{withCredentials : true})
      .then((res) => {
        console.log('success :', res.data); 
        setconfirmButton(1)
        setconfirmLogo('ok')
        setconfirmTitle('Success!')
        setconfirmContent(`permohonan disetujui!`)

        // update main list
        const idx = mainData.findIndex((dat) => dat._id === inputContainer._id)
        const newMainData = mainData
        newMainData[idx].status = res.data.peminjaman.status
        setmainData(newMainData)

        // update car model 
        const carIdx = carModel.findIndex((car) => car.plat === res.data.carModel_peminjaman.plat)
        const newmodel = carModel
        newmodel[carIdx] = res.data.carModel_peminjaman
        setcarModel(newmodel)

        // fuck useEffect
        updateMainData()

        if (typeof res.data.message === 'string' && res.data.message.length > 1) {
          setconfirmContent(`record is approved : ${res.data.message}`, )
        } else {
          setconfirmContent('record is approved!')
        }
        setInputModal(false)
        loader(false)
      })
      .catch((err) => {
        console.log(err.response)
        if (err?.response?.data?.login === false) {
          window.location.reload()
        }
        loader(false)
      })
    loader(false)
  }

  function confirmReject() {
    console.log('rejecting '+inputContainer._id)

     axios.patch(currentHost+`api/reject/${inputContainer._id}`,{withCredentials : true})
      .then((res) => {
        console.log(res.data)

        // update main list
        const idx = mainData.findIndex((dat) => dat._id === inputContainer._id)
        const newMainData = mainData
        newMainData[idx].status = res.data.peminjaman.status
        setmainData(newMainData)

        // update car model 
        const carIdx = carModel.findIndex((car) => car.plat === res.data.carModel_peminjaman.plat)
        const newmodel = carModel
        newmodel[carIdx] = res.data.carModel_peminjaman
        setcarModel(newmodel)

        // fuck useEffect
        updateMainData()

        // display message
        setInputModal(false)
        setconfirmButton(1)
        setconfirmLogo('ok')
        setconfirmTitle('Success!')
        setconfirmContent(`permohonan telah ditolak!`)
        setconfirmModal(true)
      })
      .catch((err) => {
        console.log('reject error: ',err.response)
        if (err?.response?.data?.message.includes("session")) {
          window.location.reload()
        } else {
          setconfirmButton(1)
          setconfirmLogo('err')
          setconfirmTitle('Error!')
          setconfirmContent(`gagal tolak permohonan! ${err?.response?.data?.message}`)
          setconfirmModal(true)
        }
        // if(err?.response?.data?.login == false) {
        //   window.location.reload()
        // } else {
        //   console.log(err.response)
        // }
      })
  }

  function resetRejected () {
        // console.log('add new input')
        setresetState(true)
        const currentidx = carModel.findIndex(car => car.plat === displayerContainer.plat)
        setcarStat(currentidx)
        setInputContainer(
          {
            jenis : carModel[carStat].jenis,
            nost : displayerContainer.nost,
            tglst : displayerContainer.tglst,
            pengguna : displayerContainer.pengguna,
            mulai : displayerContainer.mulai,
            akhir : displayerContainer.akhir,
            nond: displayerContainer.nond,
            tglnd: displayerContainer.tglnd,
            plat: carModel[carStat].plat, 
            pic: displayerContainer?.nama || '', 
            nip_pic: displayerContainer?.nip || '',
            seksi:displayerContainer?.seksi || '',
            status:'waiting' 
          }
          )
          
        setEditStat(false)
        setInputModal(true)
  }


  function download_xlsx() {
    // console.log('download xls file')
    axios.get(currentHost+`xlsx`, {withCredentials : true, responseType:'blob'})
      .then(async(response) => {
        loader(true)
        // Create a Blob from the response data
        const blob = await new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'peminjaman nigga.xlsx';

        // Append the link to the DOM and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL and link
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        loader(false)
      })
      .catch((err) => {
        console.log(err.response)
        if(err?.response?.data?.login == false) {
          window.location.reload()
        } else {
          console.log(err.response)
        }
        loader(false)
      })
  }

  const [approvalSearch, setapprovalSearch] = useState('')
  const [approvalSearchContainer, setapprovalSearchContainer] = useState('')

  function cariApproval() {
    // console.log(approvalSearch)
    setapprovalSearchContainer(approvalSearch.toLowerCase())
  }
  
  
  const [historySearch, setHistorySearch] = useState('')
  const [historySearchContainer, setHistorySearchContainer] = useState('')
  const [historySearchResult, sethistorySearchResult] = useState([])
  const [searchResTot, setsearchResTot] = useState(0)

  function cariHistory() {
    // console.log('look for: ',historySearch, historySearchContainer)
    setHistorySearchContainer(historySearch.toLowerCase())
    if (historySearch.length > 0 && historySearchContainer !== historySearch) {
      // on blur, set history query skip value back to 0
      setsearchResTot(0)

      axios.get(currentHost+`api/search/${historySearch}`, {params : {startpoint : 0}}, {withCredentials : true})
      .then((res) => {
        // console.log(res.data.tot)
        sethistorySearchResult(res.data.mainQuery)
        setsearchResTot(res.data.tot)
      })
      .catch((err) => {
        console.log(err.response)
      })
    } else {

    }
  }

  function loadmoreSearchRes() {
    console.log('load more search result!')
    console.log(historySearchResult.length,'/', searchResTot)
    axios.get(currentHost+`api/search/${historySearchContainer}`,{ params: { startpoint: historySearchResult.length } },{withCredentials : true})
      .then((res) => {
        console.log(res.data)
        const updated = historySearchResult.concat(res?.data?.mainQuery)
        sethistorySearchResult(updated)
      })
      .catch((err) => {
        console.log('loadmore error: ',err.response)
        if(err?.response?.data?.login == false) {
          window.location.reload()
        } else {
          console.log(err.response)
        }
      })
  }

  

  useEffect(() => {
    updateMainData()
}, [mainData])



  useEffect(() => {
    setInputContainer({...inputContainer, plat: carModel[carStat].plat, jenis:carModel[carStat].jenis })
  }, [carStat])

  

  return (
    <div className="app-container">

      {/* main modal */}
          {mainModal ? <DisplayContainer resetRejected={resetRejected}/> : null}
      



    {/* input modal */}
    {inputModal ? 
              <div className="main-modal-overlay">
                <div className="main-modal-container">
                  {displayerContainer.status == '' || displayerContainer.status == 'waiting' ? null :  
                      <div className={`modal-status-${displayerContainer.status}`}>
                      {displayerContainer.status}
                    </div>}
                  <div className="main-modal-inner">
                    <div className="main-modal-header">
                      <span className="title">{editStat ? "Ubah Data" : "Tambah Data"} Peminjaman ({
                      editStat && !resetState ? `NIP ${inputContainer.nip_pic} a.n ${inputContainer.pic}` :
                      !editStat && !resetState ? `NIP ${user?.nip} a.n ${user?.nama}` :
                      !editStat && resetState ? `NIPPLE ${displayerContainer.nip_pic} a.n ${displayerContainer.pic}` : null
                    })
                      </span>
                      <span className="modal-close-button" onClick={editStat ? closeModal : confirmCloseModal}><MdOutlineCloseFullscreen size={18}/></span>
                    </div>

                    <div className="main-modal-content">
                      <div className="main-modal-image-container">
                        <div className="car-overlay-left"></div>
                          <div className="car-overlay-right"></div>
                        <div className="car-list">

                             <div className="car-prev">
                                <img src={`${currentHost}cars/${carModel[carIdx(carIdx(carStat) - 1)].plat}.png`} alt={'car.png'} />
                                {carModel[carIdx(carStat - 1)].jenis}
                              </div>

                              <div className="car-current">
                                <div className="circle-1"></div>                 
                                <img  src={`${currentHost}cars/${carModel[carIdx(carStat)]?.plat}.png`} alt={'car.png'} />
                                {carModel[carIdx(carStat)].jenis}
                              </div>

                              <div className="car-next">
                                <img src={`${currentHost}cars/${carModel[carIdx(carIdx(carStat) + 1)].plat}.png`} alt={'car.png'} />
                                {carModel[carIdx(carStat + 1)].jenis}
                              </div> 

                        </div>
                      </div>

                      <div className="date-displayer">
                        <div className='flyer-timeline'><span>Timeline Peminjaman <br/> (2 bulan kedepan)</span></div>
                        <div className="date-bars-container">

                          {next30dayz.map((dateobj,idx) => { 
                                if (checkIfWithin(dateobj, carModel[carStat].peminjaman)) {
                                  return (<div key={idx+1} 
                                    className={"bar active"}>
                                      <div className="on-hover">
                                        <div className='on-hover-flyer'>{formatDate(dateobj)[2]}</div>
                                      </div>
                                    </div>)
                                } else {
                                  return (<div key={idx+1} className='bar'></div>)
                                }
                              }
                            )
                          }

                          {/* <div className="bar"></div> */}
                        </div>
                      </div>

                      {
                        (user.role === 'admin') || (user.role === 'user' && !editStat ) ? 
                        <div className="input-modal-slide-button">
                        <div onClick={() => setstatCar(false)} id='input-slide-button'>{'<'}</div>
                        <div onClick={() => setstatCar(true)} id='input-slide-button'>{'>'}</div>
                      </div> :
                      null
                      }


                      <div className="input-inner-container">
                          <div className="input-container-1">
                              <div className="input-nomor-nd">
                              <Inputx disabled={(editStat && user.role =='user')} type="text" value={ inputContainer.nond } onChange={(e) => NDchange(e.target.value)} title={'Nomor ND'} className='nip--peminjam'/>
                                <SingleDatePicker
                                    
                                    singleCalendar='true'
                                    startDate={inputContainer.tglnd}
                                    onChange={(startDate) => NDdatechange(startDate)}
                                    minDate={new Date(new Date(currentDate).setDate(currentDate.getDate() - 7))}
                                    maxDate={new Date(new Date(currentDate).setDate(currentDate.getDate() + 45))}
                                    dateFormat="D / MM"
                                    monthFormat="MMM YYYY"
                                    startDatePlaceholder="Tanggal"
                                    disabled={(editStat && user.role =='user')}
                                    className="my-own-class-name"
                                    startWeekDay="monday"
                                />
                              </div>

                            <div className="penumpang-container">
                              <div className={!penumpangflyer ? "flyer-add-penumpang" : "flyer-add-penumpang active"}>+1 alamat tujuan!</div>
                              <Inputx disabled={(editStat && user.role =='user')} refer={penumpangFocus} value={penumpangValue} onChange={(e) => setpenumpangValue(e.target.value)} type='text'  title={'+ alamat tujuan'} className='input-penumpang'/>
                              {/* MdOutlineDone,MdOutlinePersonAddAlt1, MdOutlinePeopleAlt */}
                              <MdAddLocationAlt onClick={addPenumpang} className='add-guys' size={25} /> 
                              <MdOutlineLocationOn onClick={previewPenumpang} className={inputContainer.pengguna.length>0 ? 'list-guys-active' : 'list-guys'} size={25} />
                            </div>
                          </div>

                          <div className="input-container-2">
                            <div className="input-nomor-st">
                              <Inputx disabled={((editStat && user.role =='user'))} type='text' value={ inputContainer.nost } onChange={(e) => STchange(e.target.value)} title={'Nomor ST'} className='nomor-st'/>
                              <SingleDatePicker 
                                      disabled={(editStat && user.role =='user')}
                                      singleCalendar='true'
                                      startDate={inputContainer.tglst}
                                      onChange={(startDate) => STDatechange(startDate)}
                                      minDate={new Date(new Date(currentDate).setDate(currentDate.getDate() - 7))}
                                      maxDate={new Date(new Date(currentDate).setDate(currentDate.getDate() + 45))}
                                      dateFormat="D / MM"
                                      monthFormat="MMM YYYY"
                                      startDatePlaceholder="Tanggal"
                                      className="my-own-class-name"
                                      startWeekDay="monday"
                                  />
                            </div>
                            <div className="date-selector">
                              <div id='tanggal-peminjaman'>Tanggal Peminjaman</div>

                            <RangeDatePicker
                              startDate={inputContainer.mulai }
                              endDate={inputContainer.akhir }
                              onChange={(startDate, endDate) => rangeDatechange(startDate, endDate)}
                              minDate={new Date(new Date(currentDate).setDate(currentDate.getDate()))}
                              maxDate={new Date(new Date(currentDate).setDate(currentDate.getDate() + 45))}
                              dateFormat="D / MMM"
                              monthFormat="MMM YYYY"
                              startDatePlaceholder="Awal"
                              endDatePlaceholder="Akhir"
                              disabled={(editStat && user.role =='user')}
                              className="my-own-class-name"
                              startWeekDay="monday"
                            />
                            </div>
                          </div>  

                      </div>
                    {
                      !editStat ? 
                      <div className="input-buttons">
                        <ButtonTwo onClick={cancelAdd} logo={<MdClose />}title='Cancel'/>
                        <ButtonOne onClick={submitAddNew} logo={<MdOutlineDone />}title='Submit'/> 
                      </div> :
                      editStat && user.role === 'admin' ?
                      <div className="input-buttons">
                      <ButtonTwo onClick={submitReject}  logo={<MdClose />}title='Reject'/>
                      <ButtonOne onClick={submitApprove}  logo={<MdOutlineDone />}title='Approve'/> 
                     </div> :
                     <div style={{color:'#5f9cab', marginTop:'19px'}}>permohonan menunggu persetujuan admin.</div>
                    }
                    </div>
                  </div>
                </div>
              </div>
              : null}




      {/* penumpang modal */}
      {penumpangModal ? <div onClick={() => setpenumpangModal(false)} className='penumpang-modal-overlay'>
        <div onClick={(e) => {e.stopPropagation()}} className="penumpang-outer-container">
            <div className="penumpang-inner-container">
              <div className="penumpang-close">
                <span style={{color:'#999999'}}>Alamat Tujuan :</span>
                <span className="modal-close-button" onClick={() => {setpenumpangModal(false)}}><MdOutlineCloseFullscreen size={18}/></span>
              </div>
                <div className="penumpang-list">
              {
                  inputContainer.pengguna.length > 0 ? 
                    inputContainer.pengguna.map((org,idx) => { return (
                      <div key={idx+1} className="penumpang-bar">
                        <span>- {org}</span>
                        <span onClick={()=>removePenumpang(idx)} className='delete-penumpang'>x</span>
                      </div>
                    )})
                : <span >Tidak ada alamat tujuan</span>
                } 
              </div>
            </div>
        </div>
      </div> : null}





{/* // err  MdBlock
// info MdErrorOutline
// ok MdAutoAwesome */}

  {confirmModal ? <div className="notifier-overlay">
        <div className="notifier-outer">
          <div className="notifier-inner-container">
            <div className="notifier-title">
              <div className="notifier-logo">
                {
                  confirmLogo === 'err' ? <MdBlock size={30} /> : 
                  confirmLogo === 'ok' ? <MdAutoAwesome size={30} /> :
                  confirmLogo === 'info' ? <MdErrorOutline size={30} /> :
                  null
                }
              </div>
              <div style={{fontFamily:'quanticoB', fontSize:'1.2rem'}}>{confirmTitle}</div>
            </div>
            <div className="notifier-content">
              {confirmContent}
            </div>

            <div className="notifier-buttons">
              {confirmButton === 1 ?
              <div className="input-buttons">
                <ButtonOne 
                  onClick={() => setconfirmModal(false)}
                  logo={<MdOutlineDone />}
                  title='Ok!'/> 
              </div> : confirmButton === 2 ?
              <div className="input-buttons">
                <ButtonTwo 
                  onClick={() => setconfirmModal(false)}  
                  logo={<MdClose />}
                  title='Cancel'/>
                <ButtonOne 
                  onClick={ 
                            confirmState === 'add' ? confirmAddNew :
                            confirmState === 'scrapForm' ? closeModal : 
                            confirmState === 'logout' ? logOut : 
                            confirmState === 'approve' ? confirmApprove : 
                            confirmState === 'reject' ? confirmReject :
                            null
                          } 
                  logo={<MdOutlineDone />} 
                  title='Confirm'/> 
              </div> : null
              }
            </div>
          </div>
        </div>
      </div> : null}


      {loading ? <LoadingOverlay/> : null}





    <div className="App">
      <div className="outer">
        <div className="inner">
          <div className="header-container">
            <div onClick={displaybanner} className="logo">
            <MainLogo logo_color="#ffc107" logo_width='75px'/>
              </div>
              <div className="user">
              Oy, {user?.nama}! <MdOutlineEmojiPeople size={30} style={{marginLeft:'10px', marginRight:'15px'}}/>
              | <MdLogout onClick={confirmLogout} className="log-out" size={30} style={{marginLeft:'20px', cursor:'pointer'}}/>
              </div>
          </div>

          <div className="main-container">
              <div className="approval-outer">
                <div className="approval-inner">
                  <div className="approval-title-wrapper">
                    <span className='approval-title'><MdRule size={30} style={{marginRight:'10px'}}/> awaiting approval</span>
                    <div className="approval-opts">
                      <div onClick={displayNewInput} className="tambah-approval"><MdOutlineLocalHospital size={22} style={{marginRight:'4px'}}/>tambah</div>
                      <div className="history-search">
                          <MdSearch id='search-history' size={25}/>
                          <Inputx onBlur={cariApproval} onChange={(e) => setapprovalSearch(e.target.value)} title={'cari data...'} className='search'/>
                        </div> 
                    </div>
                  </div>
                  {
                    approvalList?.length > 0 ?
                    <div className="approval-table">
                    <div className="approval-header">
                      <div className="approval-column-no">
                        No.
                      </div>
                      <div className="approval-column-seksi">
                        Seksi (PIC)
                      </div>
                      <div className="approval-column-jenis">
                        Jenis
                      </div>
                      <div className="approval-column-mulai">
                        Tanggal Mulai
                      </div>
                      <div className="approval-column-mulai">
                        Tanggal Akhir
                      </div>
                    </div>
                    <div className="approval-data-container">
                      {
                       approvalList.filter(
                        x => {
                          if (approvalSearchContainer.length > 1 &&
                            x.jenis.toLowerCase().includes(approvalSearchContainer) ||
                            x.pic.toLowerCase().includes(approvalSearchContainer) ||
                            x.status.toLowerCase().includes(approvalSearchContainer) ||
                            x.nost.toLowerCase().includes(approvalSearchContainer) ||
                            x.nond.toLowerCase().includes(approvalSearchContainer) ||
                            x.seksi.toLowerCase().includes(approvalSearchContainer) ||
                            x.plat.toLowerCase().includes(approvalSearchContainer) ||
                            x.mulai.toLowerCase().includes(approvalSearchContainer) ||
                            x.akhir.toLowerCase().includes(approvalSearchContainer)
                            ) {
                            return x
                          }
                        }
                       ).map((app, idx) => {
                        return(
                        <div onClick={() => editApproval(app)} key={app._id || idx + 1} className="approval-data">
                          <div className="approval-column-no">
                            {idx + 1}
                          </div>
                          <div className="approval-column-seksi">
                            {app.seksi} ({app.pic})
                          </div>
                          <div className="approval-column-jenis">
                            {app.jenis} ({plattery(app.plat)})
                          </div>
                          <div className="approval-column-mulai">
                            {formatDate(app.mulai)[0]}
                          </div>
                          <div className="approval-column-mulai">
                            {formatDate(app.akhir)[0]}
                          </div>
                      </div>
                      )
                       })
                      }
                    </div>
                  </div> :
                  <div id='approvalNotFound'>No Entry Found!</div>
                  }

                </div>
              </div>
          </div>

              <div className="sub-container">
                <div className="history-outer">
                  <div className="history-inner">
                    <div className='history-title'>
                      <span><MdOutlineHistory size={30} style={{marginRight:'10px'}}/> approval history</span>
                      <div className="history-buttons">
                        <div className="history-download" onClick={download_xlsx} >
                           <span><MdOutlineFileDownload size={25} />download</span> 
                        </div>
                        <div className="history-search">
                          <MdSearch id='search-history' size={25}/>
                          <Inputx onBlur={cariHistory} onChange={e => setHistorySearch(e.target.value)} title={'cari data...'} className='search-bottom'/>
                        </div>
                      </div>
                    </div>
                    {
                      historyList.length > 0 ?
                      <div className="history-table">
                      <div className="history-header">
                        <div className="history-column-no">
                          No.
                        </div>
                        <div className="history-column-seksi">
                          Seksi (PIC)
                        </div>
                        <div className="history-column-jenis">
                          Jenis
                        </div>
                        <div className="history-column-mulai">
                          Tanggal
                        </div>
                        <div className="history-column-mulai">
                          Status
                        </div>
                      </div>
                      <div className="history-data-container">
                        {
                          historySearchContainer.length > 0 ?
                          // return search result
                            historySearchResult.map((app, idx) => {
                          return(<div key={app._id || idx + 1} className="history-data"  onClick={() => previewRecords(app)}>
                          <div className="history-column-no">
                            {idx + 1}
                          </div>
                          <div className="history-column-seksi">
                            {app.seksi} ({app.pic})
                          </div>
                          <div className="history-column-jenis">
                            {app.jenis} ({plattery(app.plat)})
                          </div>
                          <div className="history-column-tanggal">
                            {formatDate(app.mulai)[0]} s.d {formatDate(app.akhir)[0]}
                          </div>
                          <div className={`history-column-status-${app.status}`}>
                            {app.status}
                          </div>
                        </div>)
                        }) :
                        // return to normal result
                           historyList?.map((app, idx) => {
                          return(<div key={app._id || idx + 1} className="history-data"  onClick={() => previewRecords(app)}>
                          <div className="history-column-no">
                            {idx + 1}
                          </div>
                          <div className="history-column-seksi">
                            {app.seksi} ({app.pic})
                          </div>
                          <div className="history-column-jenis">
                            {app.jenis} ({plattery(app.plat)})
                          </div>
                          <div className="history-column-tanggal">
                            {formatDate(app.mulai)[0]} s.d {formatDate(app.akhir)[0]}
                          </div>
                          <div className={`history-column-status-${app.status}`}>
                            {app.status}
                          </div>
                        </div>)
                        })
                        }
                        {
                           (totalRec > historyList.length && historySearchContainer.length < 1) ||
                           (searchResTot > historySearchResult.length && historySearchContainer.length > 1) ?
                            <div className="load-more" onClick={historySearchContainer.length < 1  ? loadmore : loadmoreSearchRes}>
                            <button>load more</button>
                            </div>
                            : null
                        }
                      </div>
                    </div> :
                    <div id='historyNotFound'>No Entry Found!</div>
                    }

                  </div>
                </div>
              </div>
        </div>
      </div>
      </div>

    </div>
  );
}

export default App;
