import React, { useEffect, useState } from "react";
import "./ContextMenu.scss";
import PlusIcon from "../../icons/PlusIcon";
import FilterFunnel from "../../icons/filterFunnel";
import CreateFolder from "../createFolder/CreateFolder";
import FilterContainer from "../filterContainer/FilterContainer";

const ContextMenu = () => {
  const [isCreateFileCollapsed, setIsCreateFileCollaps] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    name: "",
    description: "",
    createdAt: "",
  });

  const [apiData, setData] = useState({});

  const handleFilterButton = () => {
    if (isCreateFileCollapsed === true) {
      setIsCreateFileCollaps(false);
    }
    setIsFilterCollapsed(!isFilterCollapsed);
    setFilterOptions({ name: "", description: "", createdAt: "" });
  };

  const handleCreateButton = () => {
    if (isFilterCollapsed === true) {
      setIsFilterCollapsed(false);
    }
    setIsCreateFileCollaps(!isCreateFileCollapsed);
  };


  return (
    <div className="context-menu-container">
      <div
        className={`context-button ${isFilterCollapsed && "is-active"}`}
        onClick={handleFilterButton}
      >
        <FilterFunnel />
      </div>
      <div
        className={`context-button ${isCreateFileCollapsed && "is-active"}`}
        onClick={handleCreateButton}
      >
        <PlusIcon color={"white"} width={"19px"} height={"19px"} />
      </div>
      <CreateFolder
        isCreateFileCollapsed={isCreateFileCollapsed}
        setIsCreateFileCollaps={setIsCreateFileCollaps}
      />
      <FilterContainer
        isFilterCollapsed={isFilterCollapsed}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        handleFilterButton={handleFilterButton}
      />
    </div>
  );
};

export default ContextMenu;
