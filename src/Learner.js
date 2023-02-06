import { useEffect } from "react";
import connectWallet from "./utils/Connect";
import './styles/App.css'
import view from './ViewFile'
const Learner = ()=>{
    
    useEffect(()=>{
        connectWallet();
    });

    return(
        <div className="Learner">
            <h1>Browse Courses</h1>
            {view()}
        </div>
    );
}

export default Learner;