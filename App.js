import React, { useEffect, useState,useRef } from 'react';
import MapView,  {PROVIDER_GOOGLE }    from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View,Button, Modal,Alert, Text,TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import Detail_Popup from './Detail_Popup';


export default function App() {
  
  // Xử lý popup
  const [isPopupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
 
  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const handleMarkerPress = () => {
    togglePopup();
    // Xử lý tương tác khi nhấn vào Marker
  };
  //Xử lý nhập tìm kiếm địa chỉ bằng google place
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: 10,
    longitude: 106,
  });
  const handleSearch = async (data, details = null) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: data.description,
            key: 'AIzaSyAjs3nWfI8gdj9O2SWcDoEZmApmKMW8mgc',
          },
        }
      );

      if (
        response.data.status === 'OK' &&
        response.data.results.length > 0
      ) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ latitude: lat, longitude: lng });
        setAddress(data.description);

      }
    } catch (error) {
      console.error(error);

    }
    console.log(data.description);

  };

console.log(region);
//Xử lý cho phép truy cập vị trí hiện tại
const [currentLocation, setCurrentLocation] = useState({
  latitude: 0,
  longitude: 0,
});
const [aqi, setAqi] = useState(null);

useEffect(() => {
  getCurrentLocation(); 
}, []);

const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to fetch the AQI.');
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    setCurrentLocation({ latitude, longitude });
    fetchAQI(latitude, longitude);
    console.log(location);
  } catch (error) {
    console.log(error);
  }
};

const fetchAQI = async (latitude, longitude) => {
  try {
    const apiKey = '820ff3396499a79780bdf8a4900cf3f6';
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await axios.get(url);
    const aqiValue = response.data.list[0].main.aqi;
    setAqi(aqiValue);
  } catch (error) {
    console.log(error);
  }
  
};
console.log(aqi);

useEffect(() => {
  if (aqi && aqi >= 3) {
    Alert.alert('Cảnh báo nguy hiểm', 'Chất lượng không khí đang xấu, hãy rời khỏi nơi đây');
  } else if (aqi && aqi <3) {
    Alert.alert('Cảnh báo an toàn', 'Chất lượng không khí đang tốt, nằm trong mức cho phép');
  }
}, [aqi]);

// Xử lý lấy dự liệu openweather
  const [airQuality, setAirQuality] = useState(null);

  const handleMarkerPress1 = async (coordinates) => {
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/air_pollution',
        {
          params: {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            appid: '820ff3396499a79780bdf8a4900cf3f6',
          },
        }
      );

      if (response.data && response.data.list) {
        const { components,main } = response.data.list[0];
        const { aqi } = main;

        setAirQuality({ ...components, aqi });
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(airQuality);
  const handleMarkerPopupPress = (coordinate) => {
    handleMarkerPress1(coordinate);

    handleMarkerPress(coordinate);
  };
  return (
    <View style={styles.container}>
       
    {coordinates && (

       <MapView style={styles.map} 
       region={currentLocation && {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    
  provider={PROVIDER_GOOGLE}
  showsUserLocation={true}

  showsMyLocationButton={true}

  >
  <Marker coordinate={{latitude:coordinates.latitude, longitude:coordinates.longitude}} 
          onPress={({ nativeEvent }) => handleMarkerPopupPress(nativeEvent.coordinate)}
          title='AQI'
          calloutVisible tooltip
  />

   </MapView>)}
        {airQuality  && isPopupVisible &&(

      <Detail_Popup data={airQuality} address={address}visible={isPopupVisible} onClose={handleClosePopup} />
                  )}
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handleSearch}
        query={{
          key: 'AIzaSyAjs3nWfI8gdj9O2SWcDoEZmApmKMW8mgc',
          language: 'en',
          components: 'country:vn', // Có thể thay thế "us" bằng mã quốc gia tương ứng.
        }}
        debounce={300}
        styles={{
          container: styles.searchContainer,
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 100,
    left: 10,
    right: 10,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    height: 50,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    flex: 1,
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
});