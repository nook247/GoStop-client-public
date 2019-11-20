import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Button } from 'react-native';
import { readBuilderProgram } from 'typescript';
import { FlatList } from 'react-native-gesture-handler';

class Sidebar extends Component {
    constructor() {
        super()
        this.contentsList = ['Tasks', '회원정보', '파티', '랭킹', '캐릭터 꾸미기', '아이템 샵', '알림 목록', 
        '보석 구매', '로그아웃', 'About']
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleSection}>
                    <View><Text style={styles.text}>Sidebar</Text></View>
                </View>

                <View style={styles.contentSection}>
                    <FlatList data={this.contentsList} 
                    
                    renderItem={({item, index}) => 
                    <TouchableOpacity style={styles.contents}
                    onPress={() => {
                        alert('Move to ' + item)
                    }}>
                        <View>
                        <Text key={index} style={styles.text}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                        }
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '40%'
    },
    titleSection: {
        flex:1,
        backgroundColor: '#498c5b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentSection: {
        flex: 10,
        backgroundColor: '#abed87',
        paddingLeft: 15,
        paddingTop: 10
    },
    contents: {
        marginTop: 15
    },
    text: {
        fontSize: 20
    }
})
export default Sidebar;