import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";

export default function DeleteButton(props) {
    return (
        <Text style={{
            fontSize: 20, fontWeight: 'normal', color: 'white', marginLeft: 10, marginRight: 10}}
                onPress={() => {
                    Alert.alert(
                        '해당 항목을 삭제합니다',
                        '정말로 삭제하시겠습니까?',
                        [
                            { text: 'No', onPress: () => console.log('Cancel Pressed.') },
                            { text: 'Yes', onPress: () => {
                                console.log('OK')
                                props.EditData('DELETE')
                                alert('삭제되었습니다')
                                props.navigation.navigate(props.category)
                            } }
                        ]
                    )
                }}>DELETE</Text>
    )
}