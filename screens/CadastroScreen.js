import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



const CadastroScreen = () => {
   const navigation = useNavigation();
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [confirmarSenha, setConfirmarSenha] = useState('');

   const handleCadastro = () => {
    axios
      .post('http://localhost:3001/cadastro', { email, senha, confirmarSenha })
      .then(() => {
        console.log('usuario cadastrado');
        navigation.navigate('Discover');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
 
    <View style={styles.container}>
    <View style={{ flexDirection: "row", paddingHorizontal: 6, marginBottom: 100, alignItems: "center" }}>
      <View style={{ width: 60, height: 60, backgroundColor: "black", borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#00BCC9", fontSize: 30, fontWeight: "bold" }}>Go</Text>
      </View>
  
      <Text style={{ color: "#2A2B4B", fontSize: 30, fontWeight: "bold" }}>Discover</Text>
    </View>
  
    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      onChangeText={text => setEmail(text)}
    />
  
    <Text style={styles.label}>Senha</Text>
    <TextInput
      style={styles.input}
      placeholder="Senha"
      secureTextEntry={true}
      onChangeText={text => setSenha(text)}
    />
  
    <Text style={styles.label}>Confirmar Senha</Text>
    <TextInput
      style={styles.input}
      placeholder="Confirmar Senha"
      secureTextEntry={true}
      onChangeText={text => setConfirmarSenha(text)}
    />
  
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#00BCC9" }]} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#00BCC9" }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>
      <Text style={styles.footerText}>GoTravel App - All rights reserved © 2023</Text>
    </View>
  </View>
)}

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
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
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

export default CadastroScreen;
