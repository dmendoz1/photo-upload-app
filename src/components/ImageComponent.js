import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
const ImageComponent = (props) => {

  const {photoId, image, handlePhotoOnClick, isSortModeOn} = props;
  return (
    <Draggable
      draggableId={`imageContainer${photoId}`}
      index={photoId}
      isDragDisabled={!isSortModeOn}
    >
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`image-container ${image.class}`}
          onClick={() => handlePhotoOnClick(image.id)}
          id={`imageContainer${photoId}`}
        >
          <img
            className='photo'
            src={image.url}
            alt={photoId}
          />
        </div>
      )}
    </Draggable>
  )
}

export default ImageComponent;
