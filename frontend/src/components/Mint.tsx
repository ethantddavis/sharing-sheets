import { useState, useRef } from 'react';
import {ethers, BigNumber } from 'ethers';
import UploadFile from './UploadFile';
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';
import {Buffer} from 'buffer';
//import contractJson from '';

const contractAddress = "";

interface Props {
  currentAccount: string | undefined;
}

const Mint: React.FC<Props> = ({currentAccount}) => {
  const [file, updateFile] = useState<File | undefined>(undefined);
  const [client, setClient] = useState<IPFSHTTPClient | undefined>(undefined);
  const [uploaded, setUploaded] = useState<Boolean>(false);

  const createClient = async () => {
    try {
      setClient(create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: 'Basic ' + Buffer.from(process.env.REACT_APP_IPFS_ID + ':' + process.env.REACT_APP_IPFS_SECRET).toString('base64')
        }
      }));
    } catch (err) {
      console.log("ipfs client creation: ", err);
    }
  }
  
  const uploadFile = async () => {
    console.log(client);
    if (client && file !== undefined) {
      const added = await (client as IPFSHTTPClient).add(file); 
      console.log(added);
      setUploaded(true);
    }
  }

  const mint = async () => {
    console.log("Im mintiiiiing");
  }

  return (
    <div>
      <div>
        Title:&nbsp;
        <input type="text" />
        Author:&nbsp;
        <input type="text"/>
      </div>
      <br/>
      <UploadFile updateFile={updateFile} createClient={createClient}/> 
      <div className="mint">
        {client
          ? uploaded 
              ? <form className="mintButton" onClick={mint}>
                  Mint
                </form>
              : <form className="mintButton" onClick={uploadFile}>
                  Upload File
                </form>
          : <p>No file selected</p>   
        }
      </div>
    </div>
  )
}

export default Mint;
