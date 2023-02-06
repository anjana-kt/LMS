import lighthouse from '@lighthouse-web3/sdk';
import {ethers} from 'ethers'
import lfg from './contractsABI/lfg_abi.json'
import pic from './images/vdo.png'
import { useState } from 'react';
import {Link} from 'react-router-dom'

export default function View(){

    const [course, setCourse] = useState([]);
    const [CID,setCID] = useState([]);
    var cid;
    const lfgContractAddress=''
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lfgContract = new ethers.Contract(lfgContractAddress,lfg.lfgABI,signer);

    const displayAll=async()=>{
        const n = await lfgContract.getMaxCourseCount();
        var items=[]
        for (var i=0;i<n;i++)
        {
            const data = await lfgContract.getCourseDetailsFromID(i);
            let item = {
               cid:data.cidraw,
               title:data.courseTitle,
               topic:data.courseTopic,
               dur:data.duration,
            }
            items.push(item);
        }
        setCourse(items);
    }

    return (
        <div className='View'>
        <div className='Vdo-box'>
            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            </Link>

            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            //enroll button
            </Link>

            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            </Link>

            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            </Link>
        </div>
        <div className='Vdo-box'>
            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            </Link>

            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            </Link>

            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            </Link>

            <Link to = ''>
            <div className='Vdo-Card' >
              <img src={pic} className="Vdo-Image" alt="vdo-thumb-nail" />
              <p> Course  </p>
            </div>
            </Link>
        </div>
        </div>
        );
}