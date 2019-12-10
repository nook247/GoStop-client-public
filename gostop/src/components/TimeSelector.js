import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TimePicker from "react-native-24h-timepicker";

export default class TimeSelector extends Component {
    constructor() {
      super();
      this.state = {
        time: ""
      };
    }
   
    onCancel() {
      this.TimePicker.close();
    }
   
    onConfirm(hour, minute) {
      this.setState({ time: `${hour}:${minute}` });
      this.TimePicker.close();
    }
   
    render() {
      return (
        <View style={styles.container}>       
          <Text style={styles.text}>알림 : {this.state.time}</Text>   
          
          <TouchableOpacity
            onPress={() => this.TimePicker.open()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>알림 설정</Text>
          </TouchableOpacity>
          
          <TimePicker
            ref={ref => {
              this.TimePicker = ref;
            }}
            onCancel={() => this.onCancel()}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //alignItems: "center",
      //flexDirection: 'row',
      backgroundColor: "#fff",
      //justifyContent: 'space-around'
      //paddingTop: 100
    },
    text: {
      // fontSize: 20,
    },
    button: {
      backgroundColor: "#4EB151",
      paddingVertical: 5,
      borderRadius: 3,
      alignItems: 'center',
      alignSelf: 'flex-end',
      width: 90
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 15,
    }
  });