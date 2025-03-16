import React, { useEffect, useRef, useState } from "react";
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
  onClose,
}) => {
  const [actionButtonStatus, setActionButtonStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    toEdit: false,
    toDelete: false,
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadActive, setUploadActive] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const optionContainerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionContainerRef.current &&
        !optionContainerRef.current.contains(event.target)
      ) {
        onClose(); 
      }
    };

    if (isOptionsActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionsActive, onClose]);


  const handleEditOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toEdit: true,
    }));
    if (setIsOptionsActive) {
      setIsOptionsActive(false);
    }
  };

  const handleDeleteOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toDelete: true,
    }));
    if (setIsOptionsActive) {
      setIsOptionsActive(false);
    }
  };

  const handleCreateOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toCreate: true,
    }));
    if (setIsOptionsActive) {
      setIsOptionsActive(false);
    }
  };
  const handleUploadOption = () => {
    setIsModalOpen((prev) => ({
      ...prev,
      toUpload: true,
    }));
    if (setIsOptionsActive) {
      setIsOptionsActive(false);
    }
  };

  const handleDeleteFolder = () => {
    setActionButtonStatus(true);
    setIsDeleting(true);
    if (type === "folder") {
      setActionButtonStatus(false);
      deleteFolder(id)
        .then((data) => {
          const socket = getSocket();
          socket.emit("folderDeleted", id);
          setIsModalOpen({ toCreate: false, toUpload: false, toEdit: false });
          setActionButtonStatus(false);
          setIsDeleting(false);
        })
        .catch((error) => {
          alert(error);
          console.error(error);
          setIsDeleting(false);
        });
    } else {
      deleteFile(id)
        .then((data) => {
          const socket = getSocket();
          socket.emit("fileDeleted", id);
          setIsModalOpen({ toCreate: false, toUpload: false, toEdit: false });
          setActionButtonStatus(false);
        })
        .catch((error) => {
          alert(error);
          console.error(error);
        });
    }
  };

  const handleEditfolder = () => {
    setActionButtonStatus(true);
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

  const DeleteContainer = isDeleting ? (
    <div className="delete-container">Deleting...</div>
  ) : (
    <div className="delete-container">
      Are you sure you want to delete{" "}
      <span style={{ color: "red" }}>{name}</span> ?{" "}
    </div>
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
    <div className="upload-progress-container">
      <div className="file-name">
        <FileColoredOption />
        {toUploadFile && <span>{toUploadFile.name}</span>}
      </div>
      <div className="upload-progress">
        <div
          className="progress-bar"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
      <span className="progress-count">{uploadProgress}% upload completed</span>
    </div>
  ) : (
    <>
      <div className="create-lable">Browser document</div>
      <label for="upload-file-container" className="file-upload-button">
        <FileUploadIcon />
        {toUploadFile && <span>{toUploadFile.name}</span>}
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
    : isModalOpen.toEdit
    ? true
    : isModalOpen.toDelete;

  const modelTitleProps = isModalOpen.toCreate
    ? "Create Folder"
    : isModalOpen.toUpload
    ? "Upload Document"
    : isModalOpen.toEdit
    ? "Edit Folder"
    : "Delete";

  const modelChildProps = isModalOpen.toCreate
    ? CreateContainer
    : isModalOpen.toUpload
    ? UploadContainer
    : isModalOpen.toEdit
    ? EditContainer
    : DeleteContainer;

  const modelFooterProps = (
    <>
      <ModalButtons
        actonFunction={
          isModalOpen.toCreate
            ? () => handleCreateFolder()
            : isModalOpen.toUpload
            ? () => handleUploadfile()
            : isModalOpen.toEdit
            ? () => handleEditfolder()
            : () => handleDeleteFolder()
        }
        buttonTitle={
          isModalOpen.toCreate
            ? "Create"
            : isModalOpen.toEdit
            ? "Update"
            : isModalOpen.toUpload
            ? "Upload"
            : "Delete"
        }
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
      ref={optionContainerRef}
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
      {type === "folder" && (
        <div className="node-options edit" onClick={handleEditOption}>
          {" "}
          <EditPencil /> Edit
        </div>
      )}
      <div className="node-options delete" onClick={handleDeleteOption}>
        {" "}
        <DeleteIcon /> Delete
      </div>
      {type === "folder" && (
        <div
          className="node-options create-folder"
          onClick={handleCreateOption}
        >
          <CreateFolderIcon /> Create Folder
        </div>
      )}
      {type === "folder" && (
        <div
          className="node-options upload-document"
          onClick={handleUploadOption}
        >
          {" "}
          <UploadFileIcon /> Upload Document
        </div>
      )}
    </div>
  );
};

export default FolderOptionsContainer;
