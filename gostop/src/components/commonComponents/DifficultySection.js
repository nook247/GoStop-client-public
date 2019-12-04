import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import styles from '../cssStyles'

function EachDifficulty(props) {
    return (
        <TouchableHighlight
            style={
                props.difficulty === props.diffDefault ? 
                styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                onPress={() => {
                    props.onPressFunction(props.diffDefault)
                }} >
            <Text style={styles.buttonText}>{props.diffStr}</Text>
        </TouchableHighlight>
    )
}

export default function DifficultySection(props) {
    let diff = [ [1,'Easy'], [2,'Medium'], [3,'Hard'] ]
    return (
        <View style={styles.componentsContainer}> 

            <Text style={styles.titleStyle}>Difficulty</Text>
            
            <View style={{
                ...styles.ButtonContainer,
                marginBottom:0, marginTop: 10}}>
                
                {diff.map((element, index) => {
                    return (
                        <EachDifficulty 
                        difficulty={props.difficulty}
                        diffDefault={element[0]} diffStr={element[1]}
                        onPressFunction={props.onPressFunction}
                        key={index} />
                    ) })   
                }
              
            </View>

        </View> 
    )
}