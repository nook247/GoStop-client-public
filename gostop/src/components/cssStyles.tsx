import { StyleSheet } from "react-native";

/*
노랑 #ffdc34
남색 #110133
파랑 #00918e
초록 #4dd599
#F4F4F5 (whitesmoke)
#C3C0C7 (silver)
*/
const styles = StyleSheet.create({
    mainContainer: {        // 화면 전체를 감싸는 박스
        flex:1
    },
    Input: {        // 입력창
        marginBottom: 10,
        borderRadius: 2,
        backgroundColor: '#00918e',
        height: 40
    },
    textArea: {
        height: 60
    },

    // 공용 컴포넌트 스타일
    componentsContainer: {
        borderColor: 'red',
        //borderWidth: 1,
        padding: 10,
        //backgroundColor: '#ffdc34',
        marginBottom: 10
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitleStyle: {
        fontSize:17, 
        fontWeight: 'normal', 
        marginBottom: 10
    },
    ButtonContainer: {      //여러 개의 버튼을 묶는 요소    
        flexDirection: 'row',   
        borderColor: 'red',
        //backgroundColor: '#ffdc34',
        //borderWidth: 1,
        marginBottom: 10
    },
    buttonStyle: {      // positive, 난이도, 요일, 코인 등 각 버튼 요소        
        padding: 5,
        borderRadius: 2,
        backgroundColor:'#C3C0C7',
        marginLeft: 'auto',
        marginRight: 'auto' 
    },
    buttonSelected: {       // 버튼을 선택했을 때의 스타일
        padding: 5,
        borderRadius: 2,
        backgroundColor: "#110133",
        marginLeft: 'auto',
        marginRight: 'auto' 
    },    
    alarmButton: {      // 알림 버튼
        padding: 5,
        borderRadius: 2,
        backgroundColor: "#00918e"
        
    },
    AMRButton: {        // 추가/수정/리셋 버튼
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#00918e",
        borderRadius: 2
    },
    buttonText: {       // 버튼 내 텍스트 스타일
        fontSize: 15, 
        color: 'white',
        margin: 'auto'
    }
})

export default styles;