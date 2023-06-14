import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

class AdicionarLocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      categoria: '',
      pais: '',
      cidade: '',
      estado: '',
      endereco: '',
      imagem: null,
    };
  }

  handleAdicionarImagem = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('A permissão para acessar a biblioteca de mídia foi negada.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.cancelled) {
        const formData = new FormData();
        formData.append('imagem', {
          uri: pickerResult.uri,
          name: 'imagem.jpg',
          type: 'image/jpg',
        });

        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { imagePath } = response.data;

        console.log('Imagem enviada para o servidor:', imagePath);

        this.setState({ imagem: imagePath });
      }
    } catch (error) {
      console.log('Erro ao enviar imagem:', error);
    }
  };




  handleAdicionarLocal = async () => {
    const { nome, categoria, pais, cidade, estado, endereco } = this.state;

    // Verifica se todas as informações estão preenchidas
    if (nome && categoria && pais && cidade && estado && endereco) {
      // Converte a imagem para base64

      // Cria o objeto com os dados do local
      const localData = {
        nome: nome,
        categoria: categoria,
        pais: pais,
        cidade: cidade,
        estado: estado,
        endereco: endereco,
      };
      console.log('Dados do local:', localData);

      try {
        const response = await axios.post('http://localhost:3001/adicionarLocal', localData);
        console.log('Local adicionado com sucesso:', response.data);
        // Lógica adicional, se necessário
      } catch (error) {
        console.log('Erro ao adicionar local:', error);
      }
    } else {
      console.log('Preencha todas as informações antes de adicionar o local');
    }
  };

  handleSelecionarImagem = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('A permissão para acessar a biblioteca de mídia foi negada.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.cancelled) {
        const source = { uri: pickerResult.uri };
        this.setState({ imagem: source }, () => {
          console.log('Imagem selecionada:', this.state.imagem);
          this.handleAdicionarLocal(); // Chama o método para adicionar o local após selecionar a imagem
        });
      }
    } catch (error) {
      console.log('Erro ao selecionar imagem:', error);
    }
  };

  convertImageToBase64 = async (image) => {
    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          console.log('Imagem convertida para base64:', reader.result);
          resolve(reader.result);
        };
        reader.onerror = reject;

        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.log('Erro ao converter a imagem:', error);
      throw error;
    }
  };
  handleRemoverImagem = () => {
    this.setState({ imagem: null });
  };

  render() {
    const { nome, categoria, pais, cidade, estado, endereco, imagem } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Adicionar Local</Text>
        <Text style={styles.text}>
          Impulsione a economia local, mostre um pouco do seu mundo ao mundo{' '}
        </Text>
        <TouchableOpacity style={styles.imageButton}>
          <View style={styles.imageButtonLabel}>
            <TouchableOpacity style={styles.imageButton} onPress={this.handleSelecionarImagem}>
              {!imagem && <Text style={styles.imageButtonText}>Selecionar Imagem</Text>}
            </TouchableOpacity>
            {imagem && (
              <>
                <Image source={imagem} style={styles.image} />
                <TouchableOpacity style={styles.removeButton} onPress={this.handleRemoverImagem}>
                  <FontAwesome name="times-circle" size={24} color="black" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(value) => this.setState({ nome: value })}
        />
        <View style={styles.input}>
          <Text style={styles.text}>Categoria</Text>
          <select
            defaultValue="" // Use defaultValue em vez de value
            style={styles.input}
            onChange={(event) => this.setState({ categoria: event.target.value })}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Hóteis">Hóteis</option>
            <option value="Atração">Atração</option>
            <option value="Restaurante">Restaurante</option>
          </select>
        </View>
        <TextInput
          style={styles.input}
          placeholder="País"
          value={pais}
          onChangeText={(value) => this.setState({ pais: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={(value) => this.setState({ cidade: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={estado}
          onChangeText={(value) => this.setState({ estado: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={(value) => this.setState({ endereco: value })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleAdicionarLocal}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageButton: {
    position: 'relative',
    marginBottom: 16,
  },
  imageButtonLabel: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  imageButtonText: {
    marginTop: 120,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BCC9',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#00BCC9',
    width: '100%',
    height: 40,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'light',
    color: '#2A2B4B',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default AdicionarLocalScreen;
