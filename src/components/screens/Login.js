import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

class Login extends Component {
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
        this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser) => {
            this.setState({ user: changedUser });
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

    login = () => {
        const email = this.state.credentials.email;
        const password = this.state.credentials.password;
        
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((loggedUser) => {
                this.props.navigation.navigate('main');
            })
            .catch((error) => {
                console.log('auth failed', error);
                
            })
    }

    render(){
        return (
            <View style={styles.loginScreen}>
                <Text>Login Below</Text>
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
                placeholder='Password'
                style={styles.input}>
                </TextInput>
                <TouchableOpacity
                    onPress={() => {this.login()}}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('register');}}>
                    <Text >Press here to create an account</Text>
                </TouchableOpacity>
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

export default Login;