import axios from "axios";

const MY_API_KEY = "15831772-a93111deddd9ec3e88224ce89";
const BASE_URL = "https://pixabay.com/api";
const params = "fields=id;webformatURL;largeImageURL";
axios.defaults.baseURL = BASE_URL;

const fetchImages = async (imageName, page) => {
  const response = await axios.get(
    `/?image_type=photo&orientation=horizontal&q=${imageName}&page=${page}&per_page=12&key=${MY_API_KEY}&${params}`
  );
  return response.data.hits;
};

export default fetchImages;

//   componentDidUpdate(prevProps, prevState) {
//     const prevImage = prevProps.imageName;
//     const nextImage = this.props.imageName;
//     const page = this.state.page;
//     const MY_API_KEY = "15831772-a93111deddd9ec3e88224ce89";

//     if (prevImage !== nextImage) {
//       console.log("prevProps", prevImage);
//       console.log("this", nextImage);
//       fetch(
//         `https://pixabay.com/api/?q=${nextImage}&page=${page}&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then(res => res.json())
//         .then(imageArr => imageArr.hits)
//         .then(images => this.setState({ images }))
//         .catch(error => console.log(error));
//     }
//   }
