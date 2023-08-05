import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import Entry from "./Entry";
  import Prepage from "./Prepage";
  
  
  const Pages = () => {
    return (
      <Router>
        <Routes>
          <Route path={"/login"} element={<Entry />} />
          <Route path={"/"} element={<Prepage />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </Router>
    );
  };
  
  export default Pages;