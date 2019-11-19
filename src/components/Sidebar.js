import React from 'react';

const Sidebar = (props) => {
  const {handleImageUpload, handleMosaicView, handleSortPhotosClick, isSortModeOn, photos} = props;
  return (
    <div className="sidebar-wrapper">
      <label className="btn primary-btn input-file-button" disabled={isSortModeOn}>
        <input type="file" onChange={handleImageUpload} disabled={isSortModeOn}/>
        UPLOAD PHOTO
      </label>
      {(photos.length > 1) && <button id="mosaic-btn" className="btn secondary-btn mosaic-view-btn" disabled={isSortModeOn} onClick={handleMosaicView}>
        MOSAIC VIEW
      </button>}
      {(photos.length > 1) && <button id="sort-btn" className="btn" onClick={handleSortPhotosClick}>
        SORT IMAGES
      </button>}
    </div>
  )
}

export default Sidebar;
