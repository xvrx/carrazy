import { useContext } from 'react';
import './App.css';

// import { IoIosSpeedometer } from "react-icons/io";
import { MdOutlineEmojiPeople, MdRule, MdOutlineHistory } from "react-icons/md";
import { GiFlatTire } from "react-icons/gi";

import {PreloadContext} from './context/Preload';

// 

function App() {
  const {user, approvalList, historyList} = useContext(PreloadContext)
  console.log(approvalList)
  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <div className="header-container">
            <div className="logo"><GiFlatTire color={'##ffc107'} size={40} style={{marginRight:'10px'}}/>Carrazy</div>
            <div className="user">Oy, {user.nama}! <MdOutlineEmojiPeople size={30} style={{marginLeft:'10px'}}/></div>
          </div>

          <div className="main-container">
              <div className="approval-outer">
                <div className="approval-inner">
                  <span className='approval-title'><MdRule size={30} style={{marginRight:'10px'}}/> awaiting approval</span>
                  {
                    approvalList.length > 0 ?
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
                       approvalList.map((app, idx) => {
                        return(<div className="approval-data">
                        <div className="approval-column-no">
                          {idx + 1}
                        </div>
                        <div className="approval-column-seksi">
                          {app.seksi} ({app.pic})
                        </div>
                        <div className="approval-column-jenis">
                          {app.jenis} ({app.plat})
                        </div>
                        <div className="approval-column-mulai">
                          {app.mulai}
                        </div>
                        <div className="approval-column-mulai">
                          {app.akhir}
                        </div>
                      </div>)
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
                    <span className='history-title'><MdOutlineHistory size={30} style={{marginRight:'10px'}}/> approval history</span>
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
                          Tanggal Mulai
                        </div>
                        <div className="history-column-mulai">
                          Tanggal Akhir
                        </div>
                      </div>
                      <div className="history-data-container">
                        {
                        historyList.map((app, idx) => {
                          return(<div className="history-data">
                          <div className="history-column-no">
                            {idx + 1}
                          </div>
                          <div className="history-column-seksi">
                            {app.seksi} ({app.pic})
                          </div>
                          <div className="history-column-jenis">
                            {app.jenis} ({app.plat})
                          </div>
                          <div className="history-column-mulai">
                            {app.mulai}
                          </div>
                          <div className="history-column-mulai">
                            {app.akhir}
                          </div>
                        </div>)
                        })
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
  );
}

export default App;
