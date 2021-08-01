// import React, { Component } from "react";
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

  console.log(reqStatus);

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
        console.log(fetchImagesArray);

        if (fetchImagesArray.length === 0) {
          setReqStatus("idle");
          return notify();
        }

        const newImagesArray = [...images, ...fetchImagesArray];
        setImages(newImagesArray);
        setReqStatus("idle");

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
    console.log(imageName);
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  const onLoadButton = () => {
    setPage((prevState) => {
      return prevState + 1;
    });
  };

  const onImageClick = (largeImageURL) => {
    setOpenImageUrl(largeImageURL);
  };

  const closeModal = () => {
    setOpenImageUrl(null);
  };

  const fillArray = reqStatus === "idle" && images.length > 0;
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

///////////////////////////////////////////////////////////////////////////////////////////////////

// class App extends Component {
//   state = {
//     imageName: null,
//     images: [],
//     page: 1,
//     reqStatus: "idle",
//     openImageUrl: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { imageName, images, page } = this.state;

//     if (
//       prevState.imageName !== this.state.imageName ||
//       prevState.page !== this.state.page
//     ) {
//       const notify = () =>
//         toast.error("No results were found for your search.", {
//           duration: 3000,
//           position: "top-right",
//         });

//       try {
//         this.setState({
//           reqStatus: "loading",
//         });
//         const fetchImagesArray = await fetchImages(imageName, page);

//         if (fetchImagesArray.length === 0) {
//           this.setState({ reqStatus: "idle" });
//           return notify();
//         }

//         const newImagesArray = [...images, ...fetchImagesArray];

//         this.setState({
//           images: newImagesArray,
//           reqStatus: "idle",
//         });

//         if (page > 1) {
//           window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: "smooth",
//           });
//         }
//       } catch (error) {
//         notify();

//         this.setState({
//           reqStatus: "rejected",
//         });
//       }
//     }
//   }

//   handleFormSubmit = (imageName) => {
//     this.setState({ imageName, images: [], page: 1 });
//   };

//   onLoadButton = () => {
//     this.setState((prevState) => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   onImageClick = (largeImageURL) => {
//     this.setState({
//       openImageUrl: largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({ openImageUrl: null });
//   };

//   render() {
//     const { imageName, images, reqStatus, openImageUrl } = this.state;
//     const fillArray = reqStatus === "idle" && images.length > 0;
//     const currentStatus = reqStatus === "loading";

//     return (
//       <div>
//         <Searchbar onFormSubmit={this.handleFormSubmit} />
//         <Toaster />
//         {currentStatus && <Spinner />}
//         <ImageGallery images={images} onImageClick={this.onImageClick} />
//         {openImageUrl && (
//           <Modal closeModal={this.closeModal}>
//             <img src={openImageUrl} alt={imageName} />
//           </Modal>
//         )}
//         {fillArray && <Button onLoadButton={this.onLoadButton} />}
//       </div>
//     );
//   }
// }

export default App;
