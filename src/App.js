import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import fetchImages from "./services";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Spinner from "./components/Loader";
import Button from "./components/Button";
import Modal from "./components/Modal";

function App() {
  const [imageName, setImageName] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [reqStatus, setReqStatus] = useState("idle");
  const [openImageUrl, setOpenImageUrl] = useState(null);

  useEffect(() => {
    if (imageName === null) {
      return;
    }

    const notify = () =>
      toast.error("No results were found for your search.", {
        duration: 3000,
        position: "top-right",
      });

    async function getImages() {
      try {
        setReqStatus("loading");

        const fetchImagesArray = await fetchImages(imageName, page);

        if (fetchImagesArray.length === 0) {
          setReqStatus("idle");
          return notify();
        }

        setImages((prevState) => [...prevState, ...fetchImagesArray]);
        setReqStatus("resolve");

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      } catch (error) {
        notify();
        setReqStatus("idle");
      }
    }
    getImages();
  }, [imageName, page]);

  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  const onLoadButton = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onImageClick = (largeImageURL) => {
    setOpenImageUrl(largeImageURL);
  };

  const closeModal = () => {
    setOpenImageUrl(null);
  };

  const fillArray = images.length > 0;
  const currentStatus = reqStatus === "loading";

  return (
    <div>
      <Searchbar onFormSubmit={handleFormSubmit} />
      <Toaster />
      {currentStatus && <Spinner />}
      {fillArray && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {openImageUrl && (
        <Modal closeModal={closeModal}>
          <img src={openImageUrl} alt={imageName} />
        </Modal>
      )}
      {fillArray && <Button onLoadButton={onLoadButton} />}
    </div>
  );
}

export default App;
