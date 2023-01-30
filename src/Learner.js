import { useEffect } from "react";
import connectWallet from "./utils/Connect";
const Learner = ()=>{
    
    useEffect(()=>{
        connectWallet();
    });

    return(
        <>
            <h1>VWelcome</h1>
        </>
    );
}

export default Learner;