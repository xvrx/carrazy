import React, { useEffect,useContext, useState, Suspense } from "react";

import { Navigate } from "react-router-dom";
import { ApiContext } from "./context/API";



import LoadingOverlay from "./LoadingOverlay";

// axios
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = `http://${window.location.hostname}:2000`;


const App = React.lazy(() => import('./App'));

const Prepage = () => {
  const { currentHost, apiLogin, apiVerify } = useContext(ApiContext)
  
    const [loading, setloading] = useState(null);
    const [errstat, seterrstat] = useState(false)

    useEffect(() => {
      axios
        .get(currentHost+'auth/verify', {
          withCredentials: true,
        })
        .then((resp) => {
          console.log("prepage.js cookie resolve", resp);
          if (resp?.data?.stat === true) {
            setloading(true);
          }
        })
        .catch((err) => {
          console.log("prepage.js error :", err);
          seterrstat(true)
          if (
            err?.response?.data?.stat === false ||
            err?.response?.data?.login === false
            ) {
            setloading(false);
          } else if (err?.response?.status === undefined) {
            //if 
          }
        });
    }, []);
  
    if (loading === null) {
      return (
        <Suspense fallback={<div>
         Loading... 
        </div>}>
          <div 
          style={{width:'100%', height:'100vh', backgroundColor:'black', position:'absolute'}}
          ></div>
          <LoadingOverlay errstat={errstat}/>
        </Suspense>
      );
    } else if (loading === false) {
      return <Navigate to={"/login"} />;
    } else if (loading === true) {
      return <App />;
    }
  };
  
  export default Prepage;