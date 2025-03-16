import React, { useEffect} from 'react';
import "./Dashboard.scss";
import LeftStaticBar from '../../components/leftStaticBar/LeftStaticBar';
import LeftFolderTree from '../../components/leftFolderTree/LeftFolderTree';
import RightSection from '../../components/rightSection/RightSection';
import { getFolders } from '../../utils/folderHandler';
import { useDispatch, useSelector } from 'react-redux';
import { setFolderData } from '../../redux/slice/folderDataSlice';
import { connectSocket, disconnectSocket, getSocket } from '../../utils/socket';

const Dashboard = () => {
  const {pageNo} = useSelector((state)=> state.folderData);
  const dispatch = useDispatch();


  const fetchFolderData = async ()=>{
    getFolders(pageNo, 8)
     .then((data) => {
              dispatch(setFolderData(data));
          })
          .catch((error) => {
            console.error("Error fetching folders:", error);
          });
  }

  useEffect(()=>{
    fetchFolderData();
    connectSocket();

    const socket = getSocket();
    socket.on("folderCreated", ()=>{
      fetchFolderData();
    })
    socket.on("folderUpdated", ()=>{
      fetchFolderData()
    })
    socket.on("folderDeleted", () => {
      fetchFolderData();
    });

    socket.on("fileUploaded", () => {
      fetchFolderData();
    });

    socket.on("fileDeleted", () => {
      fetchFolderData();
    });

    return ()=>{
      disconnectSocket();
    };
    // eslint-disable-next-line 
  },[pageNo]);

  


  return (
    <div className='dashboadr-container'>
      <LeftStaticBar />
      <LeftFolderTree />
      <RightSection />
    </div>
  )
}

export default Dashboard;