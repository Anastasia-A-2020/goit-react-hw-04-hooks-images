import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import fetchImages from "./services";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Spinner from "./components/Loader";
import Button from "./components/Button";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    imageName: null,
    images: [],
    page: 1,
    reqStatus: "idle",
    openImageUrl: null,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, images, page } = this.state;

    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      const notify = () =>
        toast.error("No results were found for your search.", {
          duration: 3000,
          position: "top-right",
        });

      try {
        this.setState({
          reqStatus: "loading",
        });
        const fetchImagesArray = await fetchImages(imageName, page);

        if (fetchImagesArray.length === 0) {
          this.setState({ reqStatus: "idle" });
          return notify();
        }

        const newImagesArray = [...images, ...fetchImagesArray];

        this.setState({
          images: newImagesArray,
          reqStatus: "idle",
        });

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      } catch (error) {
        notify();

        this.setState({
          reqStatus: "rejected",
        });
      }
    }
  }

  handleFormSubmit = (imageName) => {
    this.setState({ imageName, images: [], page: 1 });
  };

  onLoadButton = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (largeImageURL) => {
    this.setState({
      openImageUrl: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ openImageUrl: null });
  };

  render() {
    const { imageName, images, reqStatus, openImageUrl } = this.state;
    const fillArray = reqStatus === "idle" && images.length > 0;
    const currentStatus = reqStatus === "loading";

    return (
      <div>
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <Toaster />
        {currentStatus && <Spinner />}
        <ImageGallery images={images} onImageClick={this.onImageClick} />
        {openImageUrl && (
          <Modal closeModal={this.closeModal}>
            <img src={openImageUrl} alt={imageName} />
          </Modal>
        )}
        {fillArray && <Button onLoadButton={this.onLoadButton} />}
      </div>
    );
  }
}

export default App;
