import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Button } from "react-native";

class Underbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => {
            alert("You pressed the button");
          }}
        >
          <Text style={styles.textStyle}> Habits </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => {
            alert("You pressed the button");
          }}
        >
          <Text style={styles.textStyle}> Todos </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => {
            alert("You pressed the button");
          }}
        >
          <Text style={styles.textStyle}> Rewards </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f7e80a",
    padding: 20,
    borderRadius: 20
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  textStyle: {
    color: "#fff",
    textAlign: "center"
  }
});

export default Underbar;
