import React, {useState, useEffect} from 'react';
import SideBar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PopUp from './components/PopUp';

import {DragDropContext} from 'react-beautiful-dnd';

const PhotoManager = () => {

  let myLocalStorageItems = JSON.parse(localStorage.getItem("myPhotosLocalStorage"));

  const [photos, setPhotos] = useState(myLocalStorageItems || []);
  const [popUp, setPopUp] = useState({
    show: false,
    photoId: ''
  });

  const [isSortModeOn, setSortMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('myPhotosLocalStorage', JSON.stringify(photos));
  }, [photos]);


  const handlePhotoOnClick = (id) => {
    setPopUp( {
      show: !popUp.show,
      photoId: id
    });
  }


  const handleImageUpload = (e) => {

    var theImage = e.target.files[0];

    /* if not an image, dont do anything */
    if (!theImage.type.match("image.*")) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        let img = new Image();
        console.log('evt', evt);
        img.src = evt.target.result;
        let imgSrc = img.src;
        img.onload = () => {
          let imgWidth = img.naturalWidth;
          let imgHeight = img.naturalHeight;
          let imageClass = '';

          if(imgWidth > 800 && imgHeight > 700) {
            imageClass = 'big';
          } else if(imgWidth > imgHeight && (imgWidth / imgHeight) > 1.5) {
            imageClass = 'horizontal'
          } else if(imgHeight > imgWidth && (imgHeight / imgWidth) > 1.5) {
            imageClass = 'vertical';
          }
          let finalImgObj = {
            url : imgSrc,
            class : imageClass,
            id : photos.length
          };
          const photosPile = [...photos, finalImgObj];
          setPhotos(photosPile);
        }

    }

    reader.readAsDataURL(theImage);
  }

  const handleMosaicView = () => {
    let dashboard = document.querySelector('.dashboard-wrapper');
    let mosaicBtn = document.querySelector('#mosaic-btn');
    let mosaicBtnOptOne = 'MOSAIC VIEW';
    let mosaicBtnOptTwo = 'GRID VIEW';
    let btnText = dashboard.classList.contains('mosaic-view') ? mosaicBtnOptOne : mosaicBtnOptTwo;
    dashboard.classList.toggle('mosaic-view');
    mosaicBtn.textContent = btnText;
  }

  const handleSortPhotosClick = () => {
    let dashboard = document.querySelector('.dashboard-wrapper');
    let sortBtn = document.querySelector('#sort-btn');
    let btnOptOne = 'SORT IMAGES';
    let btnOptTwo = 'DONE SORTING';
    let btnText = dashboard.classList.contains('sort-activated') ? btnOptOne : btnOptTwo;
    dashboard.classList.toggle('sort-activated');
    sortBtn.textContent = btnText;
    setSortMode(!isSortModeOn);
  }

  const onDragEnd = result => {
    const {destination, source} = result;

    console.log('RESULT', result);
    if(!destination) return;
    if(
      destination.droppedId === source.droppableId &&
      destination.index === source.index
    ) return;
    const reorderedPhotos = [...photos];
    let movingEl = reorderedPhotos[source.index];
    reorderedPhotos.splice(source.index, 1);
    reorderedPhotos.splice(destination.index, 0,movingEl);
    setPhotos(reorderedPhotos);
  }

  return (
    <div className="photo-manager-wrapper">
      <div className="photo-manager-dashboard">
        <SideBar
          setPhotos={setPhotos}
          handleImageUpload={handleImageUpload}
          handleMosaicView={handleMosaicView}
          handleSortPhotosClick={handleSortPhotosClick}
          isSortModeOn={isSortModeOn}
          photos={photos}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Dashboard
            handlePhotoOnClick={handlePhotoOnClick}
            photos={photos}
            isSortModeOn={isSortModeOn}
        />
        </DragDropContext>
        { popUp.show ? <PopUp
            photos={photos}
            photoId={popUp.photoId}
            togglePopUp={handlePhotoOnClick}
            setPhotos={setPhotos}
          /> :
          null }
      </div>
    </div>
  );
}

export default PhotoManager;
