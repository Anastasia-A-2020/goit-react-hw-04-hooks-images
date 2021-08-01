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
