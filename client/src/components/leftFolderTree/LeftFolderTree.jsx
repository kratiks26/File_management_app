import React, { useEffect, useState } from "react";
import "./LeftFolderTree.scss";
import ChevronIconLeft from "../../icons/chevronIconLeft";
import FolderIcon from "../../icons/folderIcon";
import FileIcon from "../../icons/fileIcon";
import FolderTree from "../folderTree/FolderTree";
import { countFileAndFolder } from "../../utils/folderHandler";
import { useSelector } from "react-redux";

const LeftFolderTree = () => {
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [fileFolderCount, setFileFolderCount] = useState({});
  const { folderData } = useSelector((state) => state.folderData);

  const handleSideBar = () => {
    setIsBarOpen(!isBarOpen);
  };

  const handleFileAndFolderCount = () => {
    countFileAndFolder()
      .then((data) => {
        setFileFolderCount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("Count:", fileFolderCount, folderData);
  useEffect(() => {
    handleFileAndFolderCount();
  }, [folderData]);

  return (
    <div
      className={`leftFolderTree-main-container ${
        isBarOpen ? "toggle-open" : ""
      }`}
    >
      <div className="toggle-button" onClick={handleSideBar}>
        <div className="chevron-icon">
          <ChevronIconLeft />
        </div>
      </div>

      <div
        className={`leftFolderTree-container ${isBarOpen ? "bar-open" : ""}`}
      >
        <div className="folders-and-documents">
          <div className="title">Folders & Documents</div>
          <div className="data-container">
            <div className="number-of-fld-doc">
              <FolderIcon className="icon" />
              <span className="box-title"> Folders </span>
              <div className="dynamic-count">{fileFolderCount.folderCount}</div>
            </div>
            <div className="line"></div>
            <div className="number-of-fld-doc">
              <FileIcon className="icon" />
              <span className="box-title"> Documents </span>
              <div className="dynamic-count">{fileFolderCount.fileCount}</div>
            </div>
          </div>
        </div>
        <div className="folder-tree">
          <FolderTree />
        </div>
      </div>
    </div>
  );
};

export default LeftFolderTree;
