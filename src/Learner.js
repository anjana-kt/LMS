import { useEffect } from "react";
import connectWallet from "./utils/Connect";
import './styles/App.css'
const Learner = ()=>{
    
    useEffect(()=>{
        connectWallet();
    });
    return(
        <div className="Learner">
            <h1>Welcome</h1>
        </div>
    );
}

export default Learner;