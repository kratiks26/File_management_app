import React, { useState } from "react";
import "./FolderOptionsContainer.scss";
import EditPencil from "../../icons/editPencil";
import DeleteIcon from "../../icons/deleteIcon";
import CreateFolderIcon from "../../icons/createFolder";
import UploadFileIcon from "../../icons/uploadIcon";
import {
  createFolder,
  deleteFolder,
  editFolder,
} from "../../utils/folderHandler";
import Modal from "../modalComponent/ModalComponent";
import { ModalButtons } from "../createFolder/CreateFolder";
import FileUploadIcon from "../../icons/fileUploadIcon";
import { deleteFile, uploadFile } from "../../utils/filesHandler";
import { getSocket } from "../../utils/socket";
import FileColoredOption from "../../icons/fileColoredOption";

const FolderOptionsContainer = ({
  name,
  description,
  type,
  id,
  isOptionsActive,
  setIsOptionsActive,
}) => {
  const [actionButtonStatus, setActionButtonStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    toEdit: false,
    toCreate: false,
    toUpload: false,
  });

  const [toCreateFolder, setToCreateFolder] = useState({
    name: "",
    description: "",
  });
  const [toEditFolder, setToEditFolder] = useState({
    name: name,
    description: description,
  });

  const [toUploadFile, setToUploadFile] = useState(null);

  // console.log("file:", toUploadFile);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadActive, setUploadActive] = useState(false);

  const handleEditOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toEdit: true,
    }));
    setIsOptionsActive(false);
  };

  const handleCreateOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toCreate: true,
    }));
    setIsOptionsActive(false);
  };
  const handleUploadOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toUpload: true,
    }));
    setIsOptionsActive(false);
  };

  const handleDeleteOption = () => {
    if (type == "folder") {
      deleteFolder(id)
        .then((data) => {
          setIsOptionsActive(false);
          const socket = getSocket();
          socket.emit("folderDeleted", id);
        })
        .catch((error) => {
          // alert(error);
          console.error(error);
        });
    } else {
      deleteFile(id)
        .then((data) => {
          setIsOptionsActive(false);
          const socket = getSocket();
          socket.emit("fileDeleted", id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setToCreateFolder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateInput = (event) => {
    const { name, value } = event.target;
    setToEditFolder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleEditfolder = () => {
    editFolder(id, toEditFolder.name, toEditFolder.description)
      .then(() => {
        setIsModalOpen({ toCreate: false, toUpload: false, toEdit: false });
        const socket = getSocket();
        socket.emit("folderUpdated", { id, ...toEditFolder });
      })
      .catch((error) => {
        console.error(error);
        alert("something went wrong");
      });
  };

  const handleCreateFolder = () => {
    setActionButtonStatus(true);
    createFolder(toCreateFolder.name, toCreateFolder.description, id)
      .then((folder) => {
        setIsModalOpen({ toCreate: false, toUpload: false, toEdit: false });
        setToCreateFolder({
          name: "",
          description: "",
        });
        const socket = getSocket();
        socket.emit("folderCreated", folder);
        setActionButtonStatus(false);
      })
      .catch((error) => {
        alert('something went wrong "Folder is not created"');
        console.error(error);
        setActionButtonStatus(false);
      });
  };

  const handleUploadfile = () => {
    setActionButtonStatus(true);
    setUploadActive(true);
    uploadFile(toUploadFile, id, (progress) => {
      setUploadProgress(progress);
    })
      .then((file) => {
        setToUploadFile(null);
        setIsModalOpen({ toCreate: false, toUpload: false, toEdit: false });
        const socket = getSocket();
        socket.emit("fileUploaded", file);
        setActionButtonStatus(false);
        setUploadProgress(0);
        setUploadActive(false);
      })
      .catch((error) => {
        setActionButtonStatus(false);
        console.error(error);
        alert(error);
        setUploadProgress(0);
        setUploadActive(false);
      });
  };

  console.log("uploadProgress:", uploadProgress);
  const EditContainer = (
    <>
      <div className="create-item">
        <div className="create-lable">Name</div>
        <input
          className="input-box"
          value={toEditFolder.name}
          name="name"
          type="text"
          placeholder="Folder name"
          onChange={handleUpdateInput}
        />
      </div>
      <div className="create-item">
        <div className="create-lable">Description</div>
        <input
          className="input-box"
          value={toEditFolder.description}
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleUpdateInput}
        />
      </div>
    </>
  );

  const CreateContainer = (
    <>
      <div className="create-item">
        <div className="create-lable">Name</div>
        <input
          className="input-box"
          value={toCreateFolder.name}
          name="name"
          type="text"
          placeholder="Folder name"
          onChange={handleInputChange}
        />
      </div>
      <div className="create-item">
        <div className="create-lable">Description</div>
        <input
          className="input-box"
          value={toCreateFolder.description}
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleInputChange}
        />
      </div>
    </>
  );

  const UploadContainer = uploadActive ? (
    < div className="upload-progress-container">
       <div className="file-name">
       <FileColoredOption/>
       {
        toUploadFile && <span>{toUploadFile.name}</span>
       }
       
      </div>
      <div className="upload-progress">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <span className="progress-count">{uploadProgress}%  upload completed</span>
    </div>
  ) : (
    <>
      <div className="create-lable">Browser document</div>
      <label for="upload-file-container" className="file-upload-button">
        <FileUploadIcon />
        <input
          id="upload-file-container"
          className="input-box-file"
          type="file"
          onChange={(e) => setToUploadFile(e.target.files[0])}
        />
      </label>
    </>
  );
  const modelOpenProps = isModalOpen.toCreate
    ? true
    : isModalOpen.toUpload
    ? true
    : isModalOpen.toEdit;

  const modelTitleProps = isModalOpen.toCreate
    ? "Create Folder"
    : isModalOpen.toUpload
    ? "Upload Document"
    : "Edit Folder";

  const modelChildProps = isModalOpen.toCreate
    ? CreateContainer
    : isModalOpen.toUpload
    ? UploadContainer
    : EditContainer;

  const modelFooterProps = (
    <>
      <ModalButtons
        actonFunction={
          isModalOpen.toCreate
            ? () => handleCreateFolder()
            : isModalOpen.toUpload
            ? () => handleUploadfile()
            : () => handleEditfolder()
        }
        buttonTitle={"Upload"}
        onClose={() => {
          setIsModalOpen(false);
          setToCreateFolder({
            name: "",
            description: "",
          });
        }}
        actionButtonStatus={actionButtonStatus}
      />
    </>
  );

  return (
    <div
      className={`node-options-container ${
        isOptionsActive && "node-options-isActive"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <Modal
        isOpen={modelOpenProps}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title={modelTitleProps}
        children={modelChildProps}
        footer={modelFooterProps}
      />
      <div className="node-options edit" onClick={handleEditOption}>
        {" "}
        <EditPencil /> Edit
      </div>
      <div className="node-options delete" onClick={handleDeleteOption}>
        {" "}
        <DeleteIcon /> Delete
      </div>
      <div className="node-options create-folder" onClick={handleCreateOption}>
        <CreateFolderIcon /> Create Folder
      </div>
      <div
        className="node-options upload-document"
        onClick={handleUploadOption}
      >
        {" "}
        <UploadFileIcon /> Upload Document
      </div>
    </div>
  );
};

export default FolderOptionsContainer;
