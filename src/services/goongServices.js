import axios from 'axios';

const API_KEY = 'ghSQzbKPqjrHMi63rkgwFaR4GFDo1L68fk9cs6wR';
const BASE_GOONG_URL = 'https://rsapi.goong.io/';

const AxiosGoong = axios.create({
  baseURL: BASE_GOONG_URL,
  responseType: 'json',
  timeout: 50000,
});

// Hàm xử lý phản hồi từ server
const handleResponse = response => {
  if (response.data && response.status === 200) {
    return response.data;
  }
  throw new Error('Something went wrong with the response');
};

// Hàm xử lý lỗi từ server
const handleError = error => {
  console.error('API GOONG MAP error:', error);
  throw error;
};

// Hàm lấy vị trí hiện tại
const getCurrentLocation = async (lat, lng) => {
  try {
    const response = await AxiosGoong.get('Geocode', {
      params: {
        latlng: `${lat},${lng}`,
        api_key: API_KEY,
      },
    });
    console.log('Kết nối mạng ổn định:', response.data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Hàm tìm kiếm vị trí
const searchLocation = async (textSearch, lat, lng) => {
  try {
    const response = await AxiosGoong.get('Place/AutoComplete', {
      params: {
        api_key: API_KEY,
        location: `${lat},${lng}`,
        input: textSearch,
        limit: 4,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Hàm lấy chi tiết địa điểm
const getDetailPlace = async placeId => {
  try {
    const response = await AxiosGoong.get('Place/Detail', {
      params: {
        api_key: API_KEY,
        place_id: placeId,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Hàm lấy khoảng cách giữa các địa điểm
const getDistanceOfPlaces = async (currentLocation, destinations) => {
  try {
    const response = await AxiosGoong.get('DistanceMatrix', {
      params: {
        api_key: API_KEY,
        origins: currentLocation,
        destinations,
        vehicle: 'car',
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const GoongService = {
  getCurrentLocation,
  searchLocation,
  getDetailPlace,
  getDistanceOfPlaces,
};

export default GoongService;
