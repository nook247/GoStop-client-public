import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import styles from '../cssStyles'

function EachPositive(props) {
    return (
        <TouchableHighlight activeOpacity={0.5}
            style={
                props.positive === props.positiveDefault ?
                styles.buttonSelected : styles.buttonStyle}
                onPress={() => { 
                    props.onPressFunction(props.positiveDefault)
                }} >
            <Text style={styles.buttonText}>{props.positiveStr}</Text>
        </TouchableHighlight>
    )
}

export default function PositiveSection(props) {
    let positive = [ [true, 'Positive'], [false, 'Negative'] ]
    return (    
        <View style={styles.componentsContainer}>      
            <View style={{
                ...styles.ButtonContainer,
                width: 200, marginLeft: 'auto', marginRight: 'auto',
                marginBottom:0}}>
                
                {positive.map((element, index) => {
                    return (
                        <EachPositive 
                        positive={props.positive}
                        positiveDefault={element[0]} positiveStr={element[1]}
                        onPressFunction={props.onPressFunction}
                        key={index} />
                    ) })   
                }
                
            </View>
        </View> 
    )
}