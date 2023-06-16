import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Hotels, NotFound, Restaurants } from "../assets";
import MenuContainer from "../components/MenuContainer";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData } from "../api";
import axios from 'axios';


const Discover = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const handleMenuPress = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    axios.post('http://localhost:3001/logout')
      .then((response) => {
        // Lógica após o logout bem-sucedido, como redirecionar o usuário para a página de login
        console.log(response.data.message);

        // Redirecionar para a tela inicial (HomeScreen)
        navigation.navigate('Home');
      })
      .catch((error) => {
        // Lógica para lidar com erros de logout
        console.error('Erro ao efetuar logout:', error);
      });
  };

  const handleDeleteAccount = () => {
    axios.delete('http://localhost:3001/deleteAccount')
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Erro ao excluir a conta:', error);
      });
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const handleNavigateToAdicionarLocal = () => {
    navigation.navigate('Local');
  };

  const searchPlace = async (query) => {
    try {
      const response = await axios.get('http://localhost:3001/autocomplete', {
        params: {
          input: query,
          language: 'pt-BR',
        },
      });
  
      const results = response.data.predictions;
      // Use os resultados de autocompletar no seu aplicativo
      console.log(results);
    } catch (error) {
      console.error('Erro ao fazer a solicitação de autocompletar:', error);
    }
  };

  


  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (

    <SafeAreaView className="flex-1 bg-white relative">
      <View style={{ flexDirection: "row", paddingHorizontal: 6, marginTop: 0, alignItems: "center", justifyContent: "flex-start" }}>
      <View style={{ width: 60, height: 60, backgroundColor: "black", borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ color: "#00BCC9", fontSize: 24, fontWeight: "bold" }}>Go</Text>
  </View>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ color: "#2A2B4B", fontSize: 24, fontWeight: "bold", marginRight: 10 }}>Discover</Text>
    </View>  
  <TouchableOpacity onPress={handleMenuPress}>
    <Feather name="menu" size={24} color="#2A2B4B" style={{ marginLeft: 210 }} />
  </TouchableOpacity>
  </View>
      {isMenuOpen && (
      <View style={styles.menuContainer}>
    <TouchableOpacity style={styles.menuItem} onPress={handleNavigateToAdicionarLocal}>
      <FontAwesome name="map-marker" size={16} color="#2A2B4B" style={styles.menuIcon} />
      <Text style={styles.menuItemText}>Registrar local</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
      <FontAwesome name="sign-out" size={16} color="#2A2B4B" style={styles.menuIcon}/>
      <Text style={styles.menuItemText}>Efetuar Logout</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
      <FontAwesome name="trash" size={16} color="#2A2B4B" style={styles.menuIcon} />
      <Text style={styles.menuItemText}>Deletar minha conta</Text>
    </TouchableOpacity>
  </View>
      )}
      <View className="flex-row items-center justify-between px-8 mt-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Descubra</Text>
          <Text className="text-[#527283] text-[36px]">O belo hoje</Text>
        </View>

        <View className="w-12 h-12 rounded-md items-center justify-center">
          
        </View>
      </View>

      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(details?.geometry?.viewport);
          setBl_lat(details?.geometry?.viewport?.southwest?.lat);
          setBl_lng(details?.geometry?.viewport?.southwest?.lng);
          setTr_lat(details?.geometry?.viewport?.northeast?.lat);
          setTr_lng(details?.geometry?.viewport?.northeast?.lng);

          // Chame a função searchPlace passando a consulta desejada
          searchPlace(data.description);
        }}
          query={{
            key: "Insira Aqui sua chave da API",
            language: "pt-BR",
          }}
        />
      </View>

      {isLoading ? (
        <View className=" flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View className=" flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title= "restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[28px] font-bold">
                Recomendações
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                  Explorar
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>
        
            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                     Ops.. nada encontrado
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 5,
    marginBottom: 10, // Ajuste o valor de acordo com a necessidade
    flexDirection: 'row', // Adicionado flexDirection: 'row'
    alignItems: 'center', // Adicionado alignItems: 'center' para centralizar verticalmente
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 12,
    color: 'black',
    marginLeft: 5, // Ajuste o valor de acordo com a necessidade
  },
})

export default Discover;
