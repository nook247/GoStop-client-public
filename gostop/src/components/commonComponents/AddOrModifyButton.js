import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from '../cssStyles'

export default function AddOrModifyButton(props) {
    return (
        <TouchableOpacity
            style={styles.AMRButton} activeOpacity={0.5}
            onPress={() => {
                props.func();

                props.addOrModify === 'add' ?
                alert("추가되었습니다") : alert('수정되었습니다')

                props.navigation.navigate(props.category)
            }} >
            <Text style={
                {...styles.buttonText, fontSize: 20, fontWeight: 'bold'}}>
                {props.addOrModify === 'add' ? 'ADD' : 'MODIFY'}</Text>
        </TouchableOpacity> 
    )
}