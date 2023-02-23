import React from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function DecryptView() {

  const [fileURL, setFileURL] = React.useState(null);

  const sign_auth_message = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }

  /* Decrypt file */
  const decrypt = async() =>{
    // Fetch file encryption key
    const cid = "QmU2hhpKFBjRk5qnvR4utAsCREjaRTrvRzcj32Vw2jwt7y"; //replace with your IPFS CID
    const {publicKey, signedMessage} = await sign_auth_message();
    console.log(signedMessage)
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */
   
    const fileType = "image/jpeg";
    const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
    console.log(decrypted)
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  }

  return (
    <div className="decrypt">
      <button onClick={()=>decrypt()}>decrypt</button>
      {
        fileURL?
          <a href={fileURL} target="_blank" alt='image'>viewFile</a>:
          null
      }
      
    </div>
  );
}

export default DecryptView;