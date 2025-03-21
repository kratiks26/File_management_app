import React from 'react'
import "./RightFolderTree.scss";
import MainFolderTree from '../mainFolderTree/MainFolderTree';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNo } from '../../redux/slice/folderDataSlice';

const RightFolderTree = () => {
    const { folderData, pageNo } = useSelector((state) => state.folderData);
    const dispatch = useDispatch();


    const handlePrevButton = async () => {
        if (pageNo > 1) {
            let page = pageNo - 1
            dispatch(setPageNo(page))
        }
    }

    const handleNextButton = async () => {
        if (pageNo < folderData?.totalPages) {
            let page = pageNo + 1
            dispatch(setPageNo(page))
        }
    }

    return (
        <div className='right-folder-tree'>
            <div className='main-tree-header'>
                <span className='folder-name'>Name</span>
                <span className='description'>Description</span>
                <span className='created-at'>Created at</span>
                <span className='updated-at'>Updated at</span>
            </div>
            <div className='folder-tree-container'>
                <MainFolderTree />
            </div>

            <div className='pagination-bar'><button className='page-button' disabled={pageNo <= 1} onClick={handlePrevButton}>previous</button><div className='page-number-container'>

                {Array.from({ length: folderData?.totalPages }).map((_, index) => (
                    <div key={index} className={`box ${index+1 === pageNo && "box-active"}`}>
                        {index + 1}.
                    </div>
                ))}
            </div>
                <button className='page-button' disabled={pageNo >= folderData?.totalPages} onClick={handleNextButton}>next</button> </div>
        </div>
    )
}

export default RightFolderTree
