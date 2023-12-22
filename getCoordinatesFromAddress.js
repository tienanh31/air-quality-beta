import axios from 'axios';

const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyAjs3nWfI8gdj9O2SWcDoEZmApmKMW8mgc`
    );

    if (
      response.data.status === 'OK' &&
      response.data.results.length > 0
    ) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

export default getCoordinatesFromAddress;