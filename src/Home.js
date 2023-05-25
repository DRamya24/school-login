import React from 'react';
import { Button} from '@material-ui/core' 
import { Link } from 'react-router-dom';
import Bgvideo from './media/bg.mp4'
import './Home.css'
function Home(){
    return(
        <div className='Home'>
           <video src={Bgvideo} autoPlay muted loop class='video-bg'/>
           {/* <div className='bg-overlay'></div> */}
            <div className='Name'>
            <h1>CAPRON HALL SCHOOL</h1>
            </div>
                <Link to="/details">
                   <Button variant="contained" color="primary" >Student Details</Button>&nbsp;
                </Link>
                <Link to="/stdetails">
                   <Button variant="contained" color="primary" >Staff Details</Button>&nbsp;
                </Link>
               
               
                
                
         
         </div>
    )
}
export default Home;