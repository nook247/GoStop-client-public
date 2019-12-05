import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from '../cssStyles'

export default function ModifyButton(props) {
    return (
        <TouchableOpacity
            style={styles.AMRButton} activeOpacity={0.5}
            onPress={() => {
                
                props.EditData();
                alert("수정되었습니다")
                props.navigation.navigate(props.category)  
            }} >
            <Text style={
                {...styles.buttonText, fontSize: 20, fontWeight: 'bold'}
            }>MODIFY</Text>                    
        </TouchableOpacity> 
    )
}