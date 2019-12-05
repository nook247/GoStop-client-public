import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import styles from '../cssStyles'

function EachCoin(props) {
    return (
        <TouchableHighlight
            style={
                props.coin === props.coinDefault ? 
                styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                onPress={() => {
                    props.onPressFunction(props.coinDefault)
                }} >
            <Text style={styles.buttonText}>{props.coinDefault}</Text>
        </TouchableHighlight>
    )
}

export default function CoinSection(props) {
    let coin = [ 10, 20, 30 ]
    return (
        <View style={styles.componentsContainer}> 

            <Text style={styles.titleStyle}>Coin</Text>
            
            <View style={{
                ...styles.ButtonContainer,
                marginBottom:0, marginTop: 10}}>
                
                {coin.map((element, index) => {
                    return (
                        <EachCoin
                        coin={props.coin}
                        coinDefault={element}
                        onPressFunction={props.onPressFunction}
                        key={index} />
                    ) })   
                }
              
            </View>

        </View> 
    )
}