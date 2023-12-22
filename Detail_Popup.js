import React, { useState} from 'react';
import { StyleSheet,Animated, View, Modal, TouchableOpacity,Text } from 'react-native';
import Column_Detail from './column_Detail';


const Detail_Popup = ({ visible, onClose,data,address }) => {
  if (!visible) {
    return null;
  }

  const handleOverlayPress = () => {
    onClose();
  };
    return (
        <Modal visible={visible} transparent>
             <TouchableOpacity  activeOpacity={1} onPress={handleOverlayPress}>
        <View style={styles.modalContainer}  >
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>

             <View style={styles.popupContainer}>

                 <View 
                            style = {{
                                flexDirection: "row",
                                }}>
                            <Text 
                                style = {{
                                    color: "#000000",
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    marginRight: 4,
                                    flex: 1,
                                }}>     
                                {address}
                            </Text>
                 </View>
                  <Text 
                            style = {{
                                color: "#eb1010",
                                fontSize: 20,
                                marginTop: 10,
                            }}>
                            AQI: {data.aqi}
                 </Text>
                 <View  style={styles.inforContainer}>
                 <Column_Detail num={data.so2} name="SO2" />
            <Column_Detail num={data.no2} name="NO2" />
            <Column_Detail num={data.pm10} name="PM10" />
            <Column_Detail num={data.pm2_5} name="PM2.5" />
            <Column_Detail num={data.o3} name="O3" />
            <Column_Detail num={data.co} name="CO" />
                 </View>
			 </View>
       </TouchableOpacity>

        </View>
        </TouchableOpacity>

        </Modal>

  );
}

const styles = StyleSheet.create({
    popupContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginTop: 586,
        marginHorizontal: 20,
      },
      inforContainer:{
        color: "#525252",
        fontSize: 14,
        marginBottom: 18,
        width: 500,
        flexDirection: "row",
        marginVertical: 40
    },
    })

export default Detail_Popup;
