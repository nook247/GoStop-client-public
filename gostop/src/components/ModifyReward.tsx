import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import savereward from '../actions/rewardaction'
import fakeserver from '../fakeserver'
import styles from './cssStyles'

import AddOrModifyButton from './commonComponents/AddOrModifyButton'
import ResetButton from './commonComponents/ResetButton'
import DeleteButton from './commonComponents/DeleteButton'
import CoinSection from './commonComponents/CoinSection'
import ContentsSection from "./commonComponents/ContentsSection";

class ModifyReward extends Component<any, any> {
    rewardIdToModify: any;
    title: any;
    dataToModify: any;
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

        this.setState({
            title,
            description,                
            coin
        })   
        this.rewardIdToModify = dataToModify[0]["id"]  
    }

    clearText = () => {   
        this.setState({
            title: '',
            description: '',
            coin: ''            
        })
    }

    EditData = async(method) => { 
        let reward = this.state;
        let arr = this.props.rewardarr

        for (let i=0; i<arr.length; i++) {
            if (arr[i]["title"] === this.title) {
                if (method === 'DELETE') {
                    arr.splice(i, 1)
                }
                else {
                    arr[i] = reward;
                }
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

                        if (method === 'DELETE') {
                            let myInit = {
                                method : 'DELETE',
                                headers : header,
                                Cookie : token
                            }        
                    
                            fetch(`${fakeserver}/todos/${this.rewardIdToModify}`, myInit)
                            .then(res => console.log(res))
                            .catch(error => console.error(error));
                        }
                        else {
                            let myInit = {
                                method : 'PATCH',
                                body: JSON.stringify(reward),
                                headers : header,
                                Cookie : token
                            }        
                    
                            fetch(`${fakeserver}/rewards/${this.rewardIdToModify}`, myInit)
                            .then(res => console.log(res))
                            .catch(error => console.error('Error : ', error));
                        }
                    })

                }
            })
        }
        else {
            if (method === 'DELETE') {
                let myInit = {
                    method : 'DELETE',
                    headers : header,
                    Cookie : token
                }        
        
                fetch(`${fakeserver}/rewards/${this.rewardIdToModify}`, myInit)
                .then(res => console.log(res))
                .catch(error => console.error(error));
            }
            else {
                let myInit = {
                    method : 'PATCH',
                    body: JSON.stringify(reward),
                    headers : header,
                    Cookie : token
                }        
        
                fetch(`${fakeserver}/rewards/${this.rewardIdToModify}`, myInit)
                .then(res => console.log(res))
                .catch(error => console.error('Error : ', error));
            }
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>

                <View style={styles.topButtonContainer}>
                    <Text style={{fontSize: 20,
                        fontWeight: 'bold', color: 'white',
                        position: 'absolute', left: 10}}>Title</Text>

                    <AddOrModifyButton addOrModify='modify'
                    func={this.EditData} category='Reward'
                    navigation={this.props.navigation}/>

                    <DeleteButton EditData={this.EditData} category='Reward'
                    navigation={this.props.navigation} />
                </View>

                <ContentsSection 
                    titleDefaultValue={this.state.title}
                    onChangeTitle={(text) =>                         
                        { this.setState({ title: text })
                    }}
                    onChangeContents={(text) =>                         
                        { this.setState({ description: text })
                    }}
                    TextAreaDefaultValue={this.state.description}
                    category='Reward'
                />

                <CoinSection coin={this.state.coin}
                    onPressFunction={(coin) => 
                        { this.setState({ coin: coin })
                    }} 
                />

                <View style={{...styles.ButtonContainer, justifyContent: 'flex-end'}}>
                    <ResetButton clearText={this.clearText} />
                </View>

            </View>
        )
    }
}

// store 조회
const mapStateToProps = (state) => {
    return {
      rewardarr : state.rewardreducer.rewardarr
    }
}  

// store 변경
const mapDispatchToProps = dispatch => {
    return {      
      savereward : (arr) => {
        dispatch(savereward(arr));
      },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ModifyReward);