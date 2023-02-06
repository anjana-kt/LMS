import lighthouse from '@lighthouse-web3/sdk';
import {ethers} from 'ethers'
import lfg from './contractsABI/lfg_abi.json'
import pic from './images/vdo.png'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

function Hex(h){
    var s=''
    for(var i=0;i<h.length;i+=2)
        s+=String.fromCharCode(parseInt(h.substr(i,2),16));
    return s
}


export default function View(){
    
    useEffect(()=>{
        displayAll();
    },[]);


    var url = 'https://gateway.lighthouse.storage/ipfs/'
    var items=[];
    const [course, setCourse] = useState([]);
    const [CID,setCID] = useState([]);
    var cid;
    const lfgContractAddress='0x2B341C44ACB4Aae62E868b9c1538be02D99eab28'
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lfgContract = new ethers.Contract(lfgContractAddress,lfg.lfgABI,signer);

    function HextoString(h){
        return Buffer.from(h,'hex').toString('utf-8');
    }
    

    const displayAll=async()=>{
        console.log("View button pressed");
        //debugger
        const n = await lfgContract.getMaxCourseCount();
        console.log("Length = "+n);
        items=[]
        for (var i=9;i<=n;i++)
        {
            const data = await lfgContract.getCourseDetailsFromID(i);
            var temp=data.cidRaw;
            temp=temp.slice(2);
            var c=Hex(temp)
            let item = {
               cid:c,
               title:data.courseTitle,
               topic:data.courseTopic,
               dur:data.duration,
               url:url+c,
            }
            items.push(item);
        }
        console.log(items);
        setCourse(items);
        console.log(course);
    }
    // function checkAvailablity(){
    //     items? : pic;
    // }

    return (
        <div className='View'>

        <div className='Vdo-box'>

            {course.map(item => 
            
            <div className='Vdo-Card' >
                <video className='Vdo' width="320" height="240" controls>
                <source src={`${item.url}`} type="video/mp4"/>
                </video>
                <div className='Caption'>
                <p> {`${item.title}`}</p><br/>
               
                </div>
               
            </div>
                )}
        </div>
        </div>
        );
}