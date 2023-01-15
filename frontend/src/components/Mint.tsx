import { useState, useRef } from 'react';
import {ethers, BigNumber } from 'ethers';
import UploadFile from './UploadFile';
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';
import {Buffer} from 'buffer';

interface Props {
  sheetsContract: React.MutableRefObject<ethers.Contract | undefined>;
}

const Mint: React.FC<Props> = ({sheetsContract}) => {
  const [file, updateFile] = useState<File | undefined>(undefined);
  const [client, setClient] = useState<IPFSHTTPClient | undefined>(undefined);
  const [contributors, setContributors] = useState<string[] | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [ipfs, setIpfs] = useState<string | undefined>(undefined);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log(title);
  }

  const changeContributors = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContributors([event.target.value]);
    console.log(contributors);
  }

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
      const result = await (client as IPFSHTTPClient).add(file); 
      console.log("https://ipfs.io/ipfs/" + result.path);
      setIpfs("https://ipfs.io/ipfs/" + result.path);
    }
  }

  const mint = async () => { 
    console.log(sheetsContract.current);
    if (sheetsContract.current && title && contributors) {
      const tx = await sheetsContract.current.mint(contributors, title, ipfs);
      const receipt = await tx.wait();
      console.log(receipt);
    } else {
      console.log("mint not ready");
    }
  }

  return (
    <div>
      <div>
        Title:&nbsp;
        <input type="text" placeholder="Title" onChange={event => changeTitle(event)}/>
        Author:&nbsp;
        <input type="text" placeholder="Composer/Contributors" onChange={event => changeContributors(event)}/>
      </div>
      <br/>
      <UploadFile updateFile={updateFile} createClient={createClient}/> 
      <div className="mint">
        {client
          ? ipfs 
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
