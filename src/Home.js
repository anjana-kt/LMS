import './styles/Home.css';
import connectWallet from "./utils/Connect";
import { useEffect } from "react";
import { useNavigate} from 'react-router-dom';

function Home() {

  useEffect(()=>{
    connectWallet();
  });
  const tag ="Learn, \n Have fun \n and Grow"
  const navigate = useNavigate();
  return (
    <div className="Home">

      
      <h2>{tag}</h2>
      
      {/* <h1>Join Us</h1> */}

      <div className='SignIn'>
      
      <br/>
        <button className='SignIn-1' onClick={() => navigate('/learner') }>Sign In</button>
        <button className='SignIn-2' onClick={() => navigate('/org') }>Organisation Sign In</button>
      </div>
      
    </div>
  );
}

export default Home;