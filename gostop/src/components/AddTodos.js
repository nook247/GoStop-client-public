import React, { Component } from "react";
import { TextInput, Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { readBuilderProgram } from "typescript";
import DatePicker from './DatePicker';
import TimeSelector from './TimeSelector';

class AddTodos extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity
                    style={styles.sideBar} activeOpacity={0.5}
                    onPress={() => { alert("You pressed the button"); }} >
                    <Text style={styles.textStyle}>사이드바</Text>
                </TouchableOpacity>  

                <View style={styles.subContainer}>
                
                <View style={styles.InputContainer}>            
                    <Text>제목 : </Text>
                    <TextInput style={styles.Input} placeholder='Todo'/>
                </View>
                
                <View style={styles.InputContainer}>
                    <Text>내용 : </Text>
                    <TextInput style={styles.Input} placeholder='Contents'/>
                </View>

                <View style={styles.ButtonContainer}>
                    <Text>난이도 : </Text>
                    <TouchableOpacity
                    style={styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { alert("You pressed the button"); }} >
                    <Text style={styles.textStyle}>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { alert("You pressed the button"); }} >
                    <Text style={styles.textStyle}>2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { alert("You pressed the button"); }} >
                    <Text style={styles.textStyle}>3</Text>
                    </TouchableOpacity>            
                </View>

                <View>
                    <DatePicker />
                </View>
                
                <View>
                    <TimeSelector />
                </View>

                <TouchableOpacity
                    style={styles.addButton} activeOpacity={0.5}
                    onPress={() => { alert("You pressed the button"); }} >
                    <Text style={styles.textStyle}>추가</Text>
                </TouchableOpacity>  

            </View>
            </View>
        )
    }
}

export default AddTodos;

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth:2
    },
    subContainer: {
        borderColor: 'black',
        borderWidth:2
    },
    sideBar: {
        padding: 10,
        backgroundColor: "#fcba03",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: 'auto'
    },
    InputContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    Input: {
        width: 200,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1
    },
    ButtonContainer: {        
        flexDirection: 'row',        
    },
    buttonStyle: {
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#fcba03",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff"
    },
    addButton: {
        padding: 5,
        backgroundColor: "#fcba03",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: 'center',
        width: 60
    }
})