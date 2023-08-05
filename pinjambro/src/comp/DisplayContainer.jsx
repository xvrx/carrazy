import React,{ useContext } from 'react'
import { ModalContext } from '../context/Modal'
import { UtilsContext } from '../context/Utils'
import { ApiContext } from '../context/API'
import {MdOutlineCloseFullscreen,MdSearch, MdOutlineEmojiPeople, MdRule, MdOutlineHistory,MdOutlineFileDownload 
    , MdClose,MdOutlineLocalHospital, MdOutlineDone,MdOutlinePersonAddAlt1, MdOutlinePeopleAlt } from "react-icons/md";

const DisplayContainer = ({resetRejected}) => {

    const {mainModal, setMainModal,emptyContainer,
        mainModalTitle, setdisplayerContainer,
        displayerContainer
  } = useContext(ModalContext)
  const { formatDate } = useContext(UtilsContext)
  const { currentHost } = useContext(ApiContext)

  return (
    <div className="main-modal-overlay">
            <div className="main-modal-container">
              {displayerContainer.status == '' || displayerContainer.status == 'waiting' ? null :  
                  <div onClick={displayerContainer.status =='rejected' ? resetRejected : null} className={`modal-status-${displayerContainer.status}`}>
                  {displayerContainer.status} 
                  {displayerContainer.status == 'rejected' ?  <div className="reset-icon">
                      <MdOutlineHistory size={20} /> <p> (click here to to re-issue approval)</p>
                  </div> : null}
                </div>}
              <div className="main-modal-inner">
                <div className="main-modal-header">
                  <span className="title">{mainModalTitle}</span>
                  <span className="modal-close-button" onClick={() => { setMainModal(false);setdisplayerContainer(emptyContainer) }}><MdOutlineCloseFullscreen size={18}/></span>
                </div>
                <div className="main-modal-content">
                  <div className="display-modal-image-container">
                    <img draggable="false" id='car-pic' src={`${currentHost}cars/${displayerContainer.plat}.png`} alt="someNiggas.png" />
                    <span id='car-label'>{displayerContainer.jenis}</span>
                  </div>
                  <div className="main-modal-desc">
                    <div className="main-modal-row-label">Peminjam</div>
                    <div className="main-modal-row-list">{displayerContainer.pic}</div>
                    <div className="main-modal-row-label">Seksi</div>
                    <div className="main-modal-row-list">{displayerContainer.seksi}</div>
                    <div className="main-modal-row-label">Alamat Tujuan</div>
                    <div className="main-modal-row-list">
                    {
                     
                     displayerContainer.pengguna.length == 0 ? "(tidak ada alamat tujuan)" : displayerContainer.pengguna.map((x, i) => i == displayerContainer.pengguna.length - 1 ? `${x}.` : `${x}, ` )
           
                      }
                    </div>
                    <div className="main-modal-row-label">Jangka Waktu</div>
                    <div className="main-modal-row-list">{`${formatDate(displayerContainer.mulai)[1]} s.d ${formatDate(displayerContainer.akhir)[1]}`}</div>
                    <div className="main-modal-row-label">Nomor ST</div>
                    <div className="main-modal-row-list">{`${displayerContainer.nost} tanggal ${formatDate(displayerContainer.tglst)[1]}`}</div>
                    <div className="main-modal-row-label">Nomor Peminjaman</div>
                    <div className="main-modal-row-list">{`${displayerContainer.nond} tanggal ${formatDate(displayerContainer.tglnd)[1]}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default DisplayContainer