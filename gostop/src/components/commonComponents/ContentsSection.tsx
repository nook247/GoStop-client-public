import React from "react";
import { Text, View, TextInput } from "react-native";
import Textarea from 'react-native-textarea'
import styles from '../cssStyles'

export default function ContentsSection(props) {
    return (
        <View style={{
            ...styles.componentsContainer,
            backgroundColor: '#110133', paddingBottom: 15}}>
            
            <View>        
                <TextInput style={styles.Input} placeholder={props.category}
                defaultValue={props.titleDefaultValue}    
                selectionColor='white'    
                onChangeText={(text) => { props.onChangeTitle(text) }}
                />
            </View>
            
            <View>
                <Text style={{...styles.titleStyle, color:'white'}}>Notes</Text>
                
                <Textarea style={styles.Input} containerStyle={styles.textArea}                      
                placeholder='Notes' selectionColor='white'
                maxCharLimit={150} height={60} padding={5}
                defaultValue={props.TextAreaDefaultValue}                        
                onChangeText={(text) => { props.onChangeContents(text) }}
                />
            </View>

        </View>
    )
}