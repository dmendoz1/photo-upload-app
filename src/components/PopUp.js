import React, {useState, useCallback} from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImage from '../helpers/cropImage';

const PopUp = ({photoId, photos, setPhotos, togglePopUp}) => {
  let image = photos.filter( photo => photo.id === photoId );
  const [crop, setCrop] = useState({ x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropChange = crop => {
    setCrop({crop});
  };

  const updateCroppedImg = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImage(
        image[0].url,
        croppedAreaPixels
      )

      let croppedPhotosArr = photos.map(img => {
        if (img.id === photoId) {
          img.url = croppedImage;
          img.class = '';
        }
        return img;
      });
      setPhotos(croppedPhotosArr);


    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  };


  const handleRemove = () => {
    let newPhotos = photos.filter( photo => photo.id !== photoId );
    setPhotos(newPhotos);
    togglePopUp('');
  }


  return (
    <div>
      <div className="popup-overlay" onClick={()=> togglePopUp('')}>
      </div>
      <div className="full-image-component">
        <div className="close-btn" onClick={()=> togglePopUp('')}>x</div>
        <div className="image-fullsize-container">
          <Cropper
          image={image[0].url}
          crop={crop}
          zoom={zoom}
          aspect={1/1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
        <div className="image-actions">
          <p className="note">Drag the cropping grid to a portion of the photo you would like to crop. Using a trackpad allows you to zoom
            into your photo</p>
          <button className="btn primary-btn crop-btn" onClick={updateCroppedImg}>Crop</button>
          <button className="danger-btn remove btn" onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
