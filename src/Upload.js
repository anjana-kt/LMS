import lighthouse from '@lighthouse-web3/sdk';
import {ethers} from 'ethers'
import { toUtf8Bytes } from 'ethers/lib/utils';
import lfg from './contractsABI/lfg_abi.json'

const Upload=() =>{
    var cid;
    const lfgContractAddress='0x2B341C44ACB4Aae62E868b9c1538be02D99eab28'
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

      //applyAccessConditions();
    }

    String.prototype.hexEncode = function(){
      var hex, i;
  
      var result = "";
      for (i=0; i<this.length; i++) {
          hex = this.charCodeAt(i).toString(16);
          result += (hex).slice(-4);
      }
  
      return result
  }

  // Code to store on chain  
  const store =async(size,title,dur,topic)=>{

    cid='QmZ5u4fifk1NZhW2YijBMw6kyJmYcLc9hfe2pRnsCXFYAF'
    var d= parseInt(dur)
    var b = cid.hexEncode()
    var c = '0x'.concat(b)
    console.log("Passing byte value is : "+c);
    var k=await lfgContract.uploadCourse(c ,size, title, d, topic);
    console.log(k);
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
      <input type="file" id="select" name="select"/>
      <br/>
      <button className="upload" onClick={async()=>{
            var file=document.getElementById("select").value;
            var title =document.getElementById("title").value;
            var dur = document.getElementById("dur").value;
            var topic = document.getElementById("topic").value;
            var size = document.getElementById("size").value;
            var k = store(parseInt(size),title,dur,topic);
            console.log('Stored onChain '+k);
            //deployEncrypted(file);
          }}>UPLOAD</button>
      <button className="upload" name='Apply Access' onClick={applyAccessConditions(document.getElementById('select'))}>
      Apply Access
      </button>
      <br/>

    </div>
  );
}

export default Upload;