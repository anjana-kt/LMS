const connectWallet = async()=>{
    const {ethereum} = window;
    try{
      if (!ethereum){
        console.log("Make sure to have a Metamask! ");
        return;
      }
      else{
        console.log("Metamask object available :) ", ethereum);
        var accounts = await ethereum.request({method:"eth_requestAccounts"});
        console.log("Connected", accounts[0]);
        console.log("Successfully connected wallet!")
      }
    }
    catch(error){
      console.log(error);
    }
  } 

export default connectWallet;
