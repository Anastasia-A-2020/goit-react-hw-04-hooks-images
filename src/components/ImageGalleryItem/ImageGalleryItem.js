import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ imageSrc, tags, largeImageURL, onImageClick }) => {
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          src={imageSrc}
          alt={tags}
          className={s.ImageGalleryItemImage}
          onClick={(e) => {
            onImageClick(largeImageURL);
          }}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTipes = {
  imageSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
