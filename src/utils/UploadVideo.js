import lighthouse from '@lighthouse-web3/sdk';

const Upload=() =>{

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async(e) =>{
    // Push file to lighthouse node
    // Both file and folder supported by upload function
    const output = await lighthouse.upload(e, "cb65e083-0f95-4c59-8fff-10cc2cd16e7f", progressCallback);
    console.log('File Status:', output);
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
      return output.data.Hash;
  }

  return (
    <div className="Upload">
      
      <label for="upload">Select a File : </label>
      <input type="file" onChange={(e)=>{var cid=deploy(e); console.log("CID fetched = "+cid);return cid;}}  id="upload" name="upload"/>
      <br/>

    </div>
  );
}

export default Upload;