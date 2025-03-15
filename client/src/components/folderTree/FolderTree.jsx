import React, { useState } from "react";
import "./FolderTree.scss";
import FolderIcon from "../../icons/folderIcon";
import PlusIcon from "../../icons/PlusIcon";
import FileColoredOption from "../../icons/fileColoredOption";
import { useSelector } from "react-redux";

const FolderTree = () => {
  const { folderData } = useSelector((state) => state.folderData);
  return (
    <div className="folder-tree">
      {folderData?.folders?.map((item, index) => (
        <NodeTree key={index} node={item} />
      ))}
    </div>
  );
};

const NodeTree = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      {node?.type === "folder" ? (
        <div
          className={`main-folder ${isExpanded && "main-folder-open"}`}
          style={{ marginLeft: node?.type === "folder" ? 20 : 10 }}
        >
          <div
            className={`folder-box ${isExpanded && "folderBoxOpen"}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FolderIcon className="folder-icon" />
            <div className="folder-tite">{node?.name}</div>
            <div className={`folder-open-icon ${isExpanded && "plus-active"}`}>
              <PlusIcon color={`${isExpanded ? "white" : "black"}`} />
            </div>
          </div>
          {isExpanded &&
            node?.children?.map((child, index) => {
              return <NodeTree key={index} node={child} />;
            })}
        </div>
      ) : (
        <div className="main-folder" style={{ marginLeft: 20 }}>
          <div className="folder-box">
            <FileColoredOption className="folder-icon" />
            <div className="folder-tite">{node?.name}</div>
            <div className={`folder-open-icon ${isExpanded && "plus-active"}`}>
              <PlusIcon color={`${isExpanded ? "white" : "black"}`} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderTree;
