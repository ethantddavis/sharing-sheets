import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MetamaskConnect from "./components/MetamaskConnect";
import Mint from "./components/Mint";
import { ethers } from "ethers";
//import axios, { AxiosInstance } from "axios";

const App: React.FC = () => {

  const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined);
  const [chainName, setChainName] = useState<string | undefined>(undefined);

  const provider = useRef<ethers.providers.Web3Provider | undefined>(undefined);
  //const todoListContract = useRef<ethers.Contract | undefined>(undefined);
  //const serverApi = useRef<AxiosInstance>(axios.create({
  //  baseURL: `http://localhost:3000/transactions/`
  //}));

  //const contractAddress = "";

  useEffect(() => {

    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return; 
    if (!window.ethereum) return; 

    provider.current = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.current.on("network", (newNetwork, oldNetwork) => {
      
      // reload page on network change
      if (oldNetwork) window.location.reload();

      // set network name
      let tempChainName = "";
      newNetwork.chainId === 1 ?
        tempChainName = "Ethereum Mainnet" 
        : tempChainName = newNetwork.name;

      // notify wrong network
      if (newNetwork.chainId !== 5) {
        setChainName("Switch network to Goerli Testnet to interact with contract (currently " 
          + tempChainName
          + ")"
        );
      } else {
        setChainName("Goerli");
        //initilizeContract();
      }
    });
  }, [currentAccount]);

  //const initilizeContract = async() => {
  //  if (provider.current) {
  //    todoListContract.current = new ethers.Contract(contractAddress, contractJson["abi"], provider.current.getSigner());
  //  }
  //}

  return (
    <body className="App">
      <header className="heading">
        <MetamaskConnect 
          currentAccount={currentAccount} 
          chainName={chainName} 
          setCurrentAccount={setCurrentAccount}
        />
        <div className="page-title-container">
          <h1 className="page-title">Sharing Sheets</h1>
        </div>
      </header>

      <div className="body">
        <main className="content">
          <Mint 
            currentAccount={currentAccount}
          />
        </main>

        <nav className="nav">
          Nav
        </nav>

        <aside className="sidebar">
          Aside
        </aside>
      </div>

      <footer className="footer">
        Footer
      </footer>
    </body>
  );
}

export default App;
