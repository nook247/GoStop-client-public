import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import saveStartDate from '../actions/startdateaction'
import saveEndDate from '../actions/enddateaction'
import styles from './cssStyles'

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  componentDidMount() {
    this.props.saveStartDate('')
    this.props.saveEndDate('')
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  DateConverter = (date) => {
    let dateArr = date.toString().split(' ')
    let [, month, day, year] = dateArr;

    let monthConvert = { 
      'Jan' : '01', 'Feb' : '02', 'Mar' : '03', 'Apr' : '04', 'May' : '05', 
      'Jun' : '06', 'Jul' : '07', 'Aug' : '08', 'Sep' : '09', 'Oct' : '10', 
      'Nov' : '11', 'Dec' : '12'
    }

    let str = year + '-' + monthConvert[month] + '-' + day;
    return str
  }
 
  handleDatePicked = date => {
    let dateConverted = this.DateConverter(date)

    if (this.props.startOrEnd === 'Start') {
      this.props.saveStartDate(dateConverted)
    }
    else if (this.props.startOrEnd === 'End') {
      this.props.saveEndDate(dateConverted)
    }
    
    this.hideDateTimePicker();
  };

  render() {
    let startOrEnd = this.props.startOrEnd
    let forModify = this.props.forModify
    return (
      <View style={styles.componentsContainer}>

        {startOrEnd === 'Start' ? 
        <Text style={styles.subtitleStyle}>시작 날짜 : 
         {forModify === false ? 
        this.props.StartDate.toString() : this.props.StartDate.toString() || this.props.forModify}</Text> :
        
        <Text style={styles.subtitleStyle}>완료 날짜 : 
         {forModify === false ? 
        this.props.EndDate.toString() : this.props.EndDate.toString() || this.props.forModify}</Text>
        }

        <TouchableOpacity
            onPress={this.showDateTimePicker}
            style={{
              padding:5, borderRadius: 2, display: 'flex', 
              alignItems:'center', backgroundColor:'#C3C0C7'}}
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