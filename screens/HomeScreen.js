import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop:5 }}>

      <View style={{ flexDirection: "row", paddingHorizontal: 6, alignItems: "center" }}>
        <View style={{ width: 60, height: 60, backgroundColor: "black", borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#00BCC9", fontSize: 24, fontWeight: "bold" }}>Go</Text>
        </View>

        <Text style={{ color: "#2A2B4B", fontSize: 24, fontWeight: "bold" }}>Discover</Text>
      </View>
      
      <View style={{ paddingHorizontal: 6, marginTop: 8, marginBottom: 24 }}>
        <Text style={{ color: "#3C6072", fontSize: 42 }}>Enjoy the trip with</Text>
        <Text style={{ color: "#00BCC9", fontSize: 38, fontWeight: "bold" }}>Good Moments</Text>

        <Text style={{ color: "#3C6072", fontSize: 16, textAlign: "center", marginTop:20}}>
  Explore breathtaking destinations, unlock hidden treasures, and immerse yourself in diverse cultures. Whether you're a seasoned traveler or embarking on your first journey, Go Travel is your ultimate companion.
</Text>
      </View>

      {/* Circle Section */}
      <View style={{ width: 400, height: 400, backgroundColor: "#00BCC9", borderRadius: 200, position: "absolute", bottom: -36, right: -36 }}></View>
      <View style={{ width: 400, height: 400, backgroundColor: "#E99265", borderRadius: 200, position: "absolute", bottom: -28, left: -36 }}></View>

      {/* Image container */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={HeroImage}
          style={{ width: "100%", height: "100%", objectFit: "cover", marginTop: 20 }}
        />

        <View style={{ flexDirection: "row", position: "absolute", bottom: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cadastro")}
            style={{ width: 120, height: 120, borderWidth: 2, borderColor: "#00BCC9", borderTopWidth: 4, borderRadius: 60, alignItems: "center", justifyContent: "center", marginRight: 16 }}
          >
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              style={{ width: 120, height: 50, borderRadius: 40, backgroundColor: "#00BCC9", alignItems: "center", justifyContent: "center" }}
            >
              <Text style={{ color: "white", fontSize:17, fontWeight: "bold" }}>Cadastrar</Text>
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ width: 120, height: 120, borderWidth: 2, borderColor: "#00BCC9", borderTopWidth: 4, borderRadius: 60, alignItems: "center", justifyContent: "center", marginLeft: 16 }}
          >
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              style={{ width: 120, height: 50, borderRadius: 40, backgroundColor: "#00BCC9", alignItems: "center", justifyContent: "center" }}
            >
              <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>Login</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
