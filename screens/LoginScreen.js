import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    axios
      .post('http://localhost:3001/login', { email, senha })
      .then(response => {
        console.log(response.data);
        // Após receber a resposta de sucesso da API de login
        navigation.navigate('Discover');
      })
      .catch(error => {
        console.error(error);
        // Lógica para tratar erros
      });
  };

  return (
    
    <View style={styles.container}>
        <View style={{ flexDirection: "row", paddingHorizontal: 6, marginBottom: 100, alignItems: "center" }}>
          <View style={{ width: 60, height: 60, backgroundColor: "black", borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#00BCC9", fontSize: 24, fontWeight: "bold" }}>Go</Text>
          </View>
  
          <Text style={{ color: "#2A2B4B", fontSize: 24, fontWeight: "bold" }}>Discover</Text>
        </View>
      <TextInput
      
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={text => setSenha(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
      <Text style={styles.footerText}>GoDiscover App - All rights reserved © 2023</Text>
      </View>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 0.1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
  button: {
    backgroundColor: "#00BCC9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 18,
  },
  buttonText: {
    color: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#00BCC9',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
  },
});

export default LoginScreen;