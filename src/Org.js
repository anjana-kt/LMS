import { useEffect } from "react";
import connectWallet from "./utils/Connect";
import './styles/App.css'
const Org = ()=>{
    
    useEffect(()=>{
        connectWallet();
    });

    return(
        <>
            <h1>Welcome</h1>
        </>
    );
}

export default Org;