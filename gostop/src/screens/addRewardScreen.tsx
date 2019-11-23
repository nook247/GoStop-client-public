import React from 'react';
import { Button, Text, View } from 'react-native';

export default class AddRewardScreen extends React.Component <any, any> {
  public render() {
    return (
      <View>
           <Button title = "go back" onPress={() => this.props.navigation.goBack()} />
        <Text>여기에 addRewards 들어간다</Text>
      </View>
    );
  }
}

// const MainNavigator = createStackNavigator({
//     AddRewardscreen : { screen : AddRewardscreen },
// });
// const AddRewardScreen = createAppContainer(MainNavigator);
// export default AddRewardScreen;
