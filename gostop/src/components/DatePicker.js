import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';

// 날짜
import saveStartDate from '../actions/startdateaction'
import saveEndDate from '../actions/enddateaction'

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date : ''
    };
  }

  componentDidMount() {
    if (this.props.forModify) {
      let dateToConvert = new Date(this.props.forModify)
      let dateToRender = this.DateConverter(dateToConvert)
      
      this.setState({
        date: dateToRender.forRender
      })
    }
  }
 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  DateConverter = (date) => {
    let dateArr = date.toString().split(' ')
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

    let str1 = year + '년 ' + monthConvert[month] + '월 ' + day + '일 ' + dayOfWeekConvert[dayOfWeek];
    let str2 = year + '-' + monthConvert[month] + '-' + day;

    let dateObj = {
      forRender: str1,
      forSave: str2
    }

    return dateObj;
  }
 
  handleDatePicked = date => {
    //console.log("A date has been picked: ", date, typeof(date));
    let dateConverted = this.DateConverter(date)

    this.setState({ date : dateConverted.forRender })

    //let dateToInsert = new Date(date)
    let dateToInsert = dateConverted.forSave
    console.log('날짜 형식 변환 : ', dateToInsert)

    if (this.props.startOrEnd === 'Start') {
      this.props.saveStartDate(dateToInsert)
      let StartDateStore = this.props.StartDate;
      console.log('시작 날짜 정보(DatePicker) : ', StartDateStore)
    }
    else if (this.props.startOrEnd === 'End') {
      this.props.saveEndDate(dateToInsert)
      let EndDateStore = this.props.EndDate;
      console.log('끝 날짜 정보(DatePicker) : ', EndDateStore)
    }
    
    this.hideDateTimePicker();
  };
 
  render() {
    const date = this.state.date 

    // let today = new Date(); 
    // let year = today.getFullYear(); // 년도
    // let month = today.getMonth() + 1;  // 월
    // let date2 = today.getDate();  // 날짜

    // returntoday = year + '/' + month + '/' + date2
    return (
      <View>
        <Text>{this.props.startOrEnd === 'Start' ? '시작' : '완료' } 날짜 : {date} </Text>
        

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

const mapStateToProps = (state) => {
  return {
    StartDate : state.StartDateReducer.date,
    EndDate : state.EndDateReducer.date
  }
}  

const mapDispatchToProps = dispatch => {
  return {      
    saveStartDate : (date) => {
      dispatch(saveStartDate(date));
    },
    saveEndDate : (date) => {
      dispatch(saveEndDate(date));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);

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