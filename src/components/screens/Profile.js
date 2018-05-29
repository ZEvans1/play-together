import React, {Component} from 'react';
import { View, Text } from 'react-native';

class Profile extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View>
                <Text>Made it to the Profile screen</Text>
            </View>
        )
    }
}

export default Profile;