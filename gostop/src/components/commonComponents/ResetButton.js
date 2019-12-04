import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from '../cssStyles'

export default function ResetButton(props) {
    return (
        <TouchableOpacity style={styles.AMRButton} activeOpacity={0.5}
        onPress={props.clearText}>
            <Text style={
                {...styles.buttonText, fontSize: 20, fontWeight: 'bold'}
            }>RESET</Text>
        </TouchableOpacity>
    )
}