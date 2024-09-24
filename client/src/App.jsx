import { useState,useEffect } from 'react'
import abi from "./contractJson/photo.json"
import {ethers} from "ethers"
import Buy from "./components/Buy.jsx"
import Add from "./components/Add.jsx"
import Memos from "./components/Memos.jsx"
import './App.css'
import * as LR from "@uploadcare/blocks";

function App() {
  LR.registerBlocks(LR);
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })

  const [account,setAccount]=useState('Not Connected')
  useEffect(()=>{
    const template=async()=>{
      const contractAddress="0x3d429Ba4959aef42279071B29e4FEf195f6b1651";
      const contractABI=abi.abi;

      try{
        const {ethereum}= window;

        const accounts = await ethereum.request({
        method:"eth_requestAccounts"
        })
        const account = accounts[0];

        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
      
        const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
        )
        console.log(contract)
        setState({provider,signer,contract});
      }catch(error){
        alert(error);
      }

    }
    template();
  },[])
  return (
      <div className="App">
        Connected account : {account}
        {<Buy state = {state}></Buy>}
        {<Add state = {state}></Add>}
        {<Memos state = {state}></Memos>}
        <lr-config
           ctx-name="my-uploader"
           pubkey="d5d8cd89f12cb029cf70"
           maxLocalFileSizeBytes={10000000}
           multiple={false}
           imgOnly={true}
        ></lr-config>
      </div>
  )
}

export default App
