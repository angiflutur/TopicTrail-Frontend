import React from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, Animated, StyleSheet, Button } from "react-native";
import { save, getValueFor } from "../Storage";

export default function Login(){
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = React.useState({
        username: [],
        email: [],
        password: []
    });
    const [submited, setSubmited] = React.useState(false);

    function handleChange(field, text){
        setFormData({...formData, [field]: text});
    }

    function handleSubmit(){
        const data = new FormData();
        data.append("username", formData.username);
        data.append("password", formData.password);
        fetch("http://192.168.0.106:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
        .then((response) => response.text())
        .then((data) => {
            save(data);
        })

        setSubmited(true);
    }

    return (
        <View>
            <TextInput 
                value={formData.username}
                onChangeText={(text) => handleChange('username', text)}
                style={styles.inputBox}
                placeholder="username"
            />
            <TextInput 
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                style={styles.inputBox}
                placeholder="password"
            />
            <Button onPress={handleSubmit} title="Login" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputBox: {
        borderColor: '#4D5B9E',
        borderWidth: 0.2,
        marginVertical: 5,
        fontSize: 18,
        padding: 12
    }
})