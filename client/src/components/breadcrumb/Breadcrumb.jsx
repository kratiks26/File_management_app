import React from 'react';
import "./Breadcrumb.scss";
import ChevronIconRight from '../../icons/chevronIconRight';
import { useSelector } from 'react-redux';

const Breadcrumb = () => {
    const path = useSelector((state) => state.folderData.breadcrumb);

  return (
    <div className='breadcrumb-bar'>
      {/* {path?.map((value, index) => {
        return (
          < div key={index}>
            {index + 1 !== path.length ? (
              <div className='breadcrumb-container'>
                <div className='breadcrumb'>{value}</div>
                <div className='chevron' ><ChevronIconRight /></div>
              </div>
            ) : (
              <div className='breadcrumb'>{value}</div>
            )}
          </div>
        );
      })} */}
    </div>
  );
};

export default Breadcrumb;

