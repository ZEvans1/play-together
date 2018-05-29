import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

class Register extends Component {

    constructor(props){
        super(props)
        this.unsubscriber = null;
        this.state = {
            
            isAuthenticated: false,
            user: null,
            error: '',
            credentials: {
                email: '',
                password: ''
            }
        };
    }

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }


    updateText(text, field) {
        let newCredentials = Object.assign(this.state.credentials);
        newCredentials[field] = text;
        this.setState({
            credentials: newCredentials
        });
    }

    register = () => {
        const email = this.state.credentials.email;
        const password = this.state.credentials.password;
        console.log('email', email);
        console.log('password', password);
        
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((loggedUser) => {
                this.setState({user: loggedUser})
                this.props.navigation.navigate('main');
            })
            .catch((error) => {
                console.log('auth failed', error);
                
            })
    }

    render(){
        return (
            <View style={{ 
                height: 100+'%', 
                width: 100+'%', 
                flex:1, 
                justifyContent:'center',
                alignItems:'center'
                }}>
                <Text>register screen</Text>
                <TextInput 
                autoCorrect={false}
                value={this.state.email}
                onChangeText={text => this.updateText(text, 'email')}
                placeholder='Email' 
                style={styles.input}>
                </TextInput>
                <TextInput 
                autoCorrect={false}
                value={this.state.password}
                onChangeText={text => this.updateText(text, 'password')}
                secureTextEntry
                placeholder='Password' 
                style={styles.input}>
                </TextInput>
                <Button onPress={()=>{this.register()}} title='Signup'>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: 100+'%',
        paddingHorizontal: 50,
        marginBottom: 10
    }
});

export default Register;