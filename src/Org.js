import { useEffect } from "react";
import connectWallet from "./utils/Connect";
import Upload from "./Upload";
import './styles/App.css'

const Org = ()=>{
    
    useEffect(()=>{
        connectWallet();
    });

    return(
        <>
            <h1>Uload A Video</h1>
            {Upload()}
        </>
    );
}

export default Org;