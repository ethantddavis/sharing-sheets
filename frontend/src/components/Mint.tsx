import { useEffect, useState } from 'react';
import {ethers, BigNumber } from 'ethers';
import UploadImage from './UploadFile';
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';
//import contractJson from '';

const contractAddress = "";

interface Props {
  currentAccount: string | undefined;
}

const Mint: React.FC<Props> = ({currentAccount}) => {
  const [fileUrl, updateFileUrl] = useState<string>('');
  const [client, setClient] = useState<IPFSHTTPClient | undefined>(undefined);
  
  let uploaded = false;

  
  try {
    setClient(create({url: fileUrl}));
  } catch (err) {
    console.log("ipfs client creation: ", err);
  }
  

  const uploadFile = async () => {
    if (fileUrl.length > 0) {
      if (client) {
        const added = await client.add(fileUrl);
        console.log(added);
        uploaded = true;
      }
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
      <UploadImage updateFileUrl={updateFileUrl}/>
      <div className="mint">
        {client && (
          <>
            {uploaded
              ? <form className="mintButton" onClick={uploadFile}>
                  Upload File
                </form>
              : <form className="mintButton" onClick={mint}>
                  Mint
                </form>
            }
          </>
        )}
      </div>
    </div>
  )
}

export default Mint;
