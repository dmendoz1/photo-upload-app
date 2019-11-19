import React from 'react';
import ImageComponent from './ImageComponent';
import {Droppable} from 'react-beautiful-dnd';

const Dashboard = ({photos, handlePhotoOnClick, isSortModeOn}) => {
  let noImagesDiv = <div className="no-photos"> Step up your photography game. Upload your first photo :) </div>;
  return (
    <Droppable droppableId='dashboard'>
      { provided => (
        <div
          className="dashboard-wrapper"
          id="dashboard"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {isSortModeOn && <h2 className="reordering-msg">Drag any of your images below to reorder your gallery</h2>}
          {photos.length ?
              photos.map((image, idx) => <ImageComponent
                  key={idx}
                  image={image}
                  handlePhotoOnClick={handlePhotoOnClick}
                  className={`image-container ${image.class}`}
                  photoId={idx}
                  isSortModeOn={isSortModeOn}

                />):
              noImagesDiv}
              {provided.placeholder}
            </div>
        )}
    </Droppable>
  )
}

export default Dashboard;
