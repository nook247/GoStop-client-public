import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import savedate from '../actions/dateaction';
import { connect } from 'react-redux';
 
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date : ''
    };
  }
 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  DateConverter = (dateArr) => {
    let [dayOfWeek, month, day, year] = dateArr;
    console.log('요일 : ', dayOfWeek)
    console.log('월 : ', month)
    console.log('일 : ', day)
    console.log('년 : ', year)

    let dayOfWeekConvert = {
       'Mon' : '월요일', 'Tue' : '화요일', 'Wed' : '수요일', 'Thu' : '목요일', 
       'Fri' : '금요일', 'Sat' : '토요일', 'Sun' : '일요일'
      }
    let monthConvert = { 
      'Jan' : '01월', 'Feb' : '02월', 'Mar' : '03월', 'Apr' : '04월', 'May' : '05월', 
      'Jun' : '06월', 'Jul' : '07월', 'Aug' : '08월', 'Sep' : '09월', 'Oct' : '10월', 
      'Nov' : '11월', 'Dec' : '12월'
    }

    let str = year + '년 ' + monthConvert[month] + ' ' + day + '일 ' + dayOfWeekConvert[dayOfWeek];

    return str;
  }
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.props.savedate(date);
    let dateArr = date.toString().split(' ')

    let dateConverted = this.DateConverter(dateArr)
    
    
    this.setState({ date : dateConverted })
    this.hideDateTimePicker();
  };
 
  render() {
    const date = this.state.date 

    let today = new Date(); 
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date2 = today.getDate();  // 날짜

    returntoday = year + '/' + month + '/' + date2
    return (
      <View>
        <Text>날짜 : {date || returntoday} </Text>
        

        <TouchableOpacity
            onPress={this.showDateTimePicker}
            style={styles.button}
        >
          <Text style={styles.buttonText}>날짜 선택</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    savedate : value => dispatch(savedate(value)),

  };
};

export default connect(null, mapDispatchToProps)(DatePicker);


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4287f5",
    paddingVertical: 5,
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 90
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
  }
})