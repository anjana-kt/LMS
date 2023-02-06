import lighthouse from '@lighthouse-web3/sdk';
import {ethers} from 'ethers'
import { toUtf8Bytes } from 'ethers/lib/utils';
import lfg from './contractsABI/lfg_abi.json'

const Upload=() =>{
    var cid;
    const lfgContractAddress='0x7A4582Ac33A4fe7eF46C096528FF0Fa65F01bCF3'
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lfgContract = new ethers.Contract(lfgContractAddress,lfg.lfgABI,signer);
    
    const encryptionSignature = async() =>{
        const address = await signer.getAddress();
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return({
        signedMessage: signedMessage,
        publicKey: address
        });
    }

    const applyAccessConditions = async(e) =>{

        const conditions = [
        {
            id: 1,
            chain: "mumbai",
            method: "getBlockNumber",
            standardContractType: "ERC721",
            contractAddress: "0x9b07ea1A459beDCfAc9Ca3fdbaa8b19958897B27",
            returnValueTest: {
            comparator: ">=",
            value: "13349"
            },
        },
        ];

        const aggregator = "([1])";
        const {publicKey, signedMessage} = await encryptionSignature();

        const response = await lighthouse.accessCondition(
        publicKey,
        cid,
        signedMessage,
        conditions,
        aggregator
        );

        console.log(response);
    }
  
    const progressCallback = (progressData) => {
      let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
      console.log(percentageDone);
    };

    const deployEncrypted = async(e) =>{

      const sig = await encryptionSignature();
      const response = await lighthouse.uploadEncrypted(
        e,
        sig.publicKey,
        "cb65e083-0f95-4c59-8fff-10cc2cd16e7f",
        sig.signedMessage,
        progressCallback
      );
      console.log(response);
      cid = response.data.cid;

      applyAccessConditions();
    }

  // Code to store on chain  
  const store =(size,title,dur,topic)=>{

    cid='QmcR6tvw2nXnirfb1s5A8n7x4eau4irfMbkZySEem8uG59'
    const encoder = new TextEncoder('UTF-8');

    var c = encoder.encode(cid);
    var b = c.join('');
    c = '0x'.concat(b);
    var d=parseInt(dur);
    lfgContract.uploadCourse(c ,size, title, d, topic)
  }

  return (
    <div className="Upload">
      
      <label for='title'>Title of the course : </label>
      <input type='text' id='title' name='' onChange={null} />
      <br/>

      <label for='topic'> Area of the course : </label>
      <input type='text' id='topic' name='' onChange={null} />
      <br/>

      <label for='dur'>Duration of the course : </label>
      <input type='text' id='dur'  onChange={null} />
      <br/>

      <label for='org'>Size : </label>
      <input type='text' id='size' name='size' onChange={null} />
      <br/>

      <label for='nft'>Valid NFT contract : </label>
      <input type='text' id='nft' name='nft' onChange={null} />
      <br/>

      <label for="select">Select a File : </label>
      <input type="file" id="select" name="upload"/>
      <br/>
      <button className="upload" onClick={async()=>{
            var file=document.getElementById("select").value;
            var title =document.getElementById("title").value;
            var dur = document.getElementById("dur").value;
            var topic = document.getElementById("topic").value;
            var size = document.getElementById("size").value;
            var k = store(parseInt(size),title,dur,topic);
            console.log('Stored onChain '+k);
            deployEncrypted(file);
          }}>UPLOAD</button>
      <br/>

    </div>
  );
}

export default Upload;