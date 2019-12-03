import React, { Component } from "react";
import { TextInput, Text, StyleSheet, View, Button, TouchableOpacity,
TouchableHighlight, AsyncStorage } from "react-native";
import { readBuilderProgram } from "typescript";
import TimeSelector from './TimeSelector'
import { connect } from 'react-redux';
import savereward from '../actions/rewardaction'
import fakeserver from '../fakeserver'

class ModifyReward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            coin: ''
            
        }
        this.rewardIdToModify;
        this.title;
        this.dataToModify;       
    }

    componentDidMount() {
        this.title = this.props.navigation.state.params.title
        let dataToModify = this.props.rewardarr.filter(
            element => element.title === this.props.navigation.state.params.title
        )
        this.dataToModify = dataToModify[0]
        let { title, description, coin } = dataToModify[0] 

        this._titleInput.setNativeProps({text: title})
        this._contentsInput.setNativeProps({text: description})

        this.setState({
            title,
            description,                
            coin
        })   
        this.rewardIdToModify = dataToModify[0]["id"]  
    }

    clearText = () => {
        this._titleInput.setNativeProps({text: ''});
        this._contentsInput.setNativeProps({text: ''})        
        this.setState({
            title: '',
            description: '',
            coin: ''            
        })
    }

    // alarmOn = () => {
    //     this.setState({alarm: true})
    // }

    EditData = async() => {  // 수정 요망
        let reward = this.state;
        let arr = this.props.rewardarr

        for (let i=0; i<arr.length; i++) {
            if (arr[i]["title"] === this.title) {
                arr[i] = reward;
                break;
            }
        }

        this.props.savereward([...arr])

        let token = '';
        await AsyncStorage.getItem('token', (err, result) => {
            token = result
        })
        let header = new Headers();
        header.append('Cookie', token)
        header.append('Content-Type', 'application/json')

        const getInit = {
            method : 'GET',
            headers : header,
            Cookie : token
        }

        if (this.rewardIdToModify === undefined) {
            fetch(`${fakeserver}/users/rewards`, getInit)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then((data) => {
                        let rewardData = data.rewards.filter(element => element.title === this.props.navigation.state.params.title)
                        this.rewardIdToModify = rewardData[0]["_id"]

                        const myInit = {
                            method : 'PATCH',
                            body: JSON.stringify(reward),
                            headers : header,
                            Cookie : token
                        }        
                
                        fetch(`${fakeserver}/rewards/${this.rewardIdToModify}`, myInit)
                        .then(res => res.json())
                        .then(res => console.log('Success : ', JSON.stringify(res)))
                        .catch(error => console.error('Error : ', error));
                    })

                }
            })
        }
        else {
            const myInit = {
                method : 'PATCH',
                body: JSON.stringify(reward),
                headers : header,
                Cookie : token
            }        
    
            fetch(`${fakeserver}/rewards/${this.rewardIdToModify}`, myInit)
            .then(res => res.json())
            .then(res => console.log('Success : ', JSON.stringify(res)))
            .catch(error => console.error('Error : ', error));
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>

                <View style={styles.subContainer}>
                
                <View style={styles.InputContainer}>            
                    <Text>제목 : </Text>
                    <TextInput style={styles.Input} placeholder='Reward'
                    ref={component => this._titleInput = component}
                    onChangeText={(text) => 
                        { this.setState({title: text})
                    }}/>
                </View>
                
                <View style={styles.InputContainer}>
                    <Text>내용 : </Text>
                    <TextInput style={styles.Input} placeholder='Contents'
                    ref={component => this._contentsInput = component}
                    onChangeText={(text) => 
                        { this.setState({description: text})
                    }}/>
                </View>

                <View style={styles.ButtonContainer}>
                    <Text>코인 : </Text>
                    <TouchableHighlight
                    style={
                        this.state.coin === 10 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({coin: 10}) }} >
                    <Text style={styles.textStyle}>10</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    style={
                        this.state.coin === 20 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({coin: 20}) }} >
                    <Text style={styles.textStyle}>20</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    style={
                        this.state.coin === 30 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({coin: 30})}} >
                    <Text style={styles.textStyle}>30</Text>
                    </TouchableHighlight>            
                </View>

                <TouchableOpacity
                    style={styles.addButton} activeOpacity={0.5}
                    onPress={() => {
                        this.EditData();
                        alert("수정되었습니다")
                        this.props.navigation.navigate('Reward')
                    }} >
                    <Text style={styles.textStyle}>수정</Text>
                </TouchableOpacity>  

            </View>
            </View>
        )
    }
}

// export default ModifyReward;

const mapStateToProps = (state) => {  
    console.log('state 나와', state)
    return {
      rewardarr : state.rewardreducer.rewardarr
    }
}  

// 데이터 수정하기
const mapDispatchToProps = dispatch => {
    return {      
      savereward : (arr) => {
        dispatch(savereward(arr));
      },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ModifyReward);

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
    buttonSelected: {
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#ff5500",
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