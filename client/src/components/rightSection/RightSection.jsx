import React from 'react';
import './RightSection.scss'
import BreadcrumbNav from '../breadcrumbNav/breadcrumbNav';
import RightFolderTree from '../rightFolderTree/RightFolderTree';

const RightSection = () => {
  return (
    <div className={`right-section-container` }>
      
      <BreadcrumbNav/>
      <RightFolderTree/>
    </div>
  )
}

export default RightSection;
