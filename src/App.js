import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Aggrid from "./Aggrid";
import Home from "./Home"
import Other from "./Other"
// import SignInOutContainer from "./Join"
// import Welcome from "./Welcome";
import Login from './Login'

import Reg from "./Signup"
import Stalogin from './Stalogin'

function App() {
  return (
    <div className="App">
     
     
     <Router>
       <Routes>
          <Route path="/" element={<Home/>}/>  
        <Route path="/login" element={<Login/>}/> 
          <Route path="/Signup" element={<Reg/>}/>
         <Route path="/stdetails" element={<Stalogin/>}/>
        <Route path="/details" element={< Login/>}/> 
        <Route path="/Aggrid" element={< Aggrid/>}/>
        <Route path="/Other" element={< Other/>}/> 
      </Routes>
     </Router>
       {/* <Welcome/>  */}
    </div>
  );
}

export default App;
