import React from "react";
import "./FilterContainer.scss";
import CrossIcon from "../../icons/crossIcon";
import { useDispatch } from "react-redux";
import { setFolderData } from "../../redux/slice/folderDataSlice";
import { getFolders } from "../../utils/folderHandler";

const FilterContainer = ({
  isFilterCollapsed,
  filterOptions,
  setFilterOptions,
  handleFilterButton,
}) => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchFilteredData = async () => {
    getFolders(1, 8, filterOptions)
      .then((data) => {
        dispatch(setFolderData(data));
        handleFilterButton();
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  };

  const handleFilterClear = () => {
    getFolders(1, 8)
      .then((data) => {
        dispatch(setFolderData(data));
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  };

  return (
    <div className={`filter-container ${isFilterCollapsed && "filter-open"}`}>
      <div className="filted-header">
        <div className="filter-container-title">Filter</div>
        <div className="filter-right-box">
          <div className="clear-button" onClick={handleFilterClear}>
            Clear filter
          </div>
          <div className="close-button" onClick={handleFilterButton}>
            <CrossIcon />
          </div>
        </div>
      </div>

      <div className="filter-item-container">
        <div className="filter-item">
          <div className="filter-lable">Name</div>
          <input
            className="input-box"
            value={filterOptions.name}
            name="name"
            type="text"
            placeholder="Folder name"
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-item">
          <div className="filter-lable">Description</div>
          <input
            className="input-box"
            value={filterOptions.description}
            name="description"
            type="text"
            placeholder="Description"
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-item">
          <div className="filter-lable">Date</div>
          <input
            className="input-box"
            value={filterOptions.createdAt}
            name="createdAt"
            type="date"
            placeholder="DD-MM-YYYY"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="filter-footer">
        <button className="action-button" onClick={handleFilterButton}>
          Close
        </button>
        <button className="action-button" onClick={fetchFilteredData}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterContainer;
