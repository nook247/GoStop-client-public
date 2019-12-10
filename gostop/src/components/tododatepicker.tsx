import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import savedate from '../actions/dateaction';
import { connect } from 'react-redux';
 
class TodoDatePicker extends Component<any, any> {
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

    let dayOfWeekConvert = {
       'Mon' : '월요일', 'Tue' : '화요일', 'Wed' : '수요일', 'Thu' : '목요일', 
       'Fri' : '금요일', 'Sat' : '토요일', 'Sun' : '일요일'
      }
    let monthConvert = { 
      'Jan' : '01', 'Feb' : '02', 'Mar' : '03', 'Apr' : '04', 'May' : '05', 
      'Jun' : '06', 'Jul' : '07', 'Aug' : '08', 'Sep' : '09', 'Oct' : '10', 
      'Nov' : '11', 'Dec' : '12'
    }

     let str = year + '/' + monthConvert[month] + '/' + day 

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

    let returntoday = '';
    returntoday = year + '/' + month + '/' + date2
    return (
      <View style = {{ alignItems : 'flex-end',    justifyContent : 'center'}}>
     
        <TouchableOpacity
            onPress={this.showDateTimePicker}
            style={styles.button}
        >
          <Text style={styles.buttonText}>날짜 선택</Text>
                <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        </TouchableOpacity>

        <Text style = {styles.dateText}> {date || returntoday} </Text>
  
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    savedate : value => dispatch(savedate(value)),

  };
};

export default connect(null, mapDispatchToProps)(TodoDatePicker);


const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    borderRadius: 2,
    width: 90
  },
  buttonText: {
    color: "#110133",
    fontSize: 14,
  },
  dateText : {
    paddingRight : 10,
    paddingBottom : 10,
  }
})