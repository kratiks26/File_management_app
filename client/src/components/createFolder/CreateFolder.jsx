import React, { useState } from "react";
import "./CreateFolder.scss";
import Modal from "../modalComponent/ModalComponent";
import FileUploadIcon from "../../icons/fileUploadIcon";
import { createFolder } from "../../utils/folderHandler";
import { uploadFile } from "../../utils/filesHandler";
import { getSocket } from "../../utils/socket";

const CreateFolder = ({ isCreateFileCollapsed, setIsCreateFileCollaps }) => {
  const [actionButtonStatus, setActionButtonStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    toCreate: false,
    toUpload: false,
  });
  const [toCreateFolder, setToCreateFolder] = useState({
    name: "",
    description: "",
  });
  const [toUploadFile, setToUploadFile] = useState(null);

  const handleCreateOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toCreate: true,
    }));
    setIsCreateFileCollaps(!isCreateFileCollapsed);
  };

  const handleUploadOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toUpload: true,
    }));
    setIsCreateFileCollaps(!isCreateFileCollapsed);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setToCreateFolder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateFolder = () => {
    setActionButtonStatus(true);
    createFolder(toCreateFolder.name, toCreateFolder.description)
      .then((folder) => {
        setActionButtonStatus(false);
        setIsModalOpen({ toCreate: false, toUpload: false });
        setToCreateFolder({
          name: "",
          description: "",
        });
        const socket = getSocket();
        socket.emit("folderCreated", folder);
      })
      .catch((error) => {
        setActionButtonStatus(false);
        alert('something went wrong "Folder is not created"');
        console.error(error);
      });
  };

  const handleUploadfile = () => {
    setActionButtonStatus(true);
    uploadFile(toUploadFile)
      .then((file) => {
        setToUploadFile(null);
        setIsModalOpen({ toCreate: false, toUpload: false, toEdit: false });
        setActionButtonStatus(false);
        const socket = getSocket();
        socket.emit("fileUploaded", file);
      })
      .catch((error) => {
        setActionButtonStatus(false);
        console.error(error);
        alert("error");
      });
  };

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

  const UploadContainer = (
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
  const modelOpenProps = isModalOpen.toCreate ? true : isModalOpen.toUpload;
  const modelTitleProps = isModalOpen.toCreate
    ? "Create Folder"
    : "Upload Document";
  const modelChildProps = isModalOpen.toCreate
    ? CreateContainer
    : UploadContainer;
  const modelFooterProps = (
    <ModalButtons
      actonFunction={
        isModalOpen.toCreate
          ? () => handleCreateFolder()
          : () => handleUploadfile()
      }
      buttonTitle={"Upload"}
      onClose={() => {
        setIsModalOpen(false);
      }}
      actionButtonStatus={actionButtonStatus}
    />
  );

  return (
    <div
      className={`create-container ${isCreateFileCollapsed && "create-open"}`}
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

      <div className="create-menu" onClick={handleCreateOption}>
        Create Folder
      </div>
      <div className="line-between"></div>
      <div className="create-menu" onClick={handleUploadOption}>
        Upload Document
      </div>
    </div>
  );
};

export const ModalButtons = ({
  actonFunction,
  buttonTitle,
  onClose,
  actionButtonStatus,
}) => {
  return (
    <>
      <button className="action-button" onClick={onClose}>
        Close
      </button>
      <button
        disabled={actionButtonStatus}
        className="action-button"
        onClick={actonFunction}
      >
        {buttonTitle}
      </button>
    </>
  );
};

export default CreateFolder;
