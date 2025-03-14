import React from "react";
import "./breadcrumbNav.scss";
import ContextMenu from "../contextMenu/ContextMenu";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const BreadcrumbNav = () => {
  return (
    <div className="breadcrumb-nav">
      <Breadcrumb />
      <div className="addfile-and-filter">
        <ContextMenu />
      </div>
    </div>
  );
};

export default BreadcrumbNav;
