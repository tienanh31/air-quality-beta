import React, { useEffect, useState,useRef } from 'react';
import MapView,  {PROVIDER_GOOGLE }    from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View,Button, Modal, TouchableOpacity,Text } from 'react-native';
import { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';


const Column_Detail = ({num, name}) => {
    return (

        <View  style={styles.column_Detail}>
                <Text style={styles.text}>{num}</Text>

                <Text style={styles.text_color}>{name}</Text>

            <Text style={styles.text}>
                {"μg/m3 "}
            </Text>
     </View>

  )
}

const styles = StyleSheet.create({
      inforContainer:{
        color: "#525252",
        fontSize: 14,
        marginBottom: 18,
        width: 500,
        flexDirection: "row",
        marginVertical: 10
    },
      column_Detail:{
        color: "#525252",
        fontSize: 14,
        marginBottom: 18,
        width: 50,
        marginHorizontal: 7,
        flexDirection: "column",
        marginRight: 7
    },
      text :{
        color: "#525252",
        fontSize: 14,
        marginBottom: 18,
        width: 50,
    },
    text_color :{
      color: "#b57070",
      fontSize: 14,
      marginBottom: 18,
      width: 50,
  }
    })

export default Column_Detail;
