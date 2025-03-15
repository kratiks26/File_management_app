import React, { useState } from "react";
import "./MainFolderTree.scss";
import FolderIcon from "../../icons/folderIcon";
import OptionsThreeDots from "../../icons/optionsThreeDots";
import FileColoredOption from "../../icons/fileColoredOption";
import ArrowIcon from "../../icons/arrowIcon";
import FolderOptionsContainer from "../folderOptionsContainer/FolderOptionsContainer";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumb } from "../../redux/slice/folderDataSlice";

const MainFolderTree = () => {
  const { folderData, breadcrumb } = useSelector((state) => state.folderData);
  const dispatch = useDispatch();

  const updateBreadcrumb = (node) => {
    const newPath = [...breadcrumb];
    newPath.push(node.name);
    dispatch(setBreadcrumb(newPath));
  };
  return (
    <div className="folder-tree">
      {folderData?.folders?.map((item, index) => (
        <NodeTree
          key={index}
          node={item}
          isArrowActive={false}
          updateBreadcrumb={updateBreadcrumb}
        />
      ))}
    </div>
  );
};

const NodeTree = ({ node, isArrowActive, updateBreadcrumb }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOptionsActive, setIsOptionsActive] = useState(false);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleOptionsButton = (e) => {
    e.stopPropagation();
    setIsOptionsActive(!isOptionsActive);
  };

  const handleFileView = (url) => {
    window.open(url);
  };

  const handleFolderClick = () => {
    if (node?.type === "folder") {
      setIsExpanded(!isExpanded);
      updateBreadcrumb(node);
    }
  };

  return (
    <>
      {node?.type === "folder" ? (
        <div
          className="tree-node-base"
          style={{ marginLeft: node?.type == "folder" ? 20 : 10 }}
        >
          <div
            className={`tree-node ${isExpanded && "tree-node-open"}`}
            onClick={handleFolderClick}
          >
            <div
              className="open-folder-arrow"
              style={{
                display: isArrowActive || isExpanded ? "block" : "none",
              }}
            >
              <ArrowIcon />
            </div>
            <FolderIcon className="node-folder-icon" />
            <div className="folder-count">{node?.children?.length}</div>
            <span className="node-name">{node?.name}</span>
            <span className="node-description">{node?.description}</span>
            <span className="node-created-at">
              {formatDateTime(node?.createdAt)}
            </span>
            <span className="node-updated-at">
              {formatDateTime(node?.updatedAt)}
            </span>
            <div className="node-options-icon" onClick={handleOptionsButton}>
              <OptionsThreeDots />
            </div>
            <FolderOptionsContainer
            name = {node?.name}
            description = {node?.description}
              type={node?.type}
              id={node?.id}
              isOptionsActive={isOptionsActive}
              setIsOptionsActive={setIsOptionsActive}
            />
          </div>
          {isExpanded &&
            node?.children?.map((child, index) => {
              return (
                <NodeTree
                  key={index}
                  node={child}
                  isArrowActive={true}
                  updateBreadcrumb={updateBreadcrumb}
                />
              );
            })}
        </div>
      ) : (
        <div
          className="tree-node-base"
          style={{ marginLeft: node?.type == "folder" ? 20 : 10 }}
        >
          <div
            className={`tree-node ${isExpanded && "tree-node-open"}`}
            style={{ marginLeft: 40 }}
            onClick={() => handleFileView(node?.filePath)}
          >
            <div className="open-folder-arrow">
              <ArrowIcon />
            </div>
            <FileColoredOption className="node-file-icon" />
            <span className="node-name">{node?.name}</span>
            <span className="node-description">{node?.description}</span>
            <span className="node-created-at">
              {formatDateTime(node?.createdAt)}
            </span>
            <span className="node-updated-at">
              {formatDateTime(node?.updatedAt)}
            </span>
            <div className="node-options-icon" onClick={handleOptionsButton}>
              <OptionsThreeDots />
            </div>
            <FolderOptionsContainer
              type={node?.type}
              id={node?.id}
              isOptionsActive={isOptionsActive}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MainFolderTree;
