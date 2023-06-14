import React, { useLayoutEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();

  const data = route?.params?.param;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <View style={{ position: "relative", backgroundColor: "white", shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
            }}
            style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 20 }}
          />

          <View style={{ position: "absolute", flexDirection: "row", left: 20, top: 20, justifyContent: "space-between", width: "100%" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Discover")} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
              <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#06B2BE" }}>
              <FontAwesome5 name="heartbeat" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ position: "absolute", flexDirection: "row", left: 20, bottom: 20, justifyContent: "space-between", width: "100%" }}>
            <View style={{ flexDirection: "row", alignItems: "center", spaceX: 2 }}>
              {data?.price ? (
                <>
                  <Text style={{ fontSize: 12, fontWeight: "bold", color: "#FFF" }}>{data?.price_level}</Text>
                  <Text style={{ fontSize: 32, fontWeight: "bold", color: "#FFF" }}>{data?.price}</Text>
                </>
              ) : (
                <Text style={{ fontSize: 12, fontWeight: "bold", color: "#FFF" }}>Gratuito</Text>
              )}
            </View>

            <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: "#1abc9c" }}>
              <Text style={{ color: "#FFF" }}>{data?.open_now_text}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ color: "#428288", fontSize: 24, fontWeight: "bold" }}>{data?.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", spaceX: 2, marginTop: 8 }}>
            <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
            <Text style={{ color: "#8C9EA6", fontSize: 20, fontWeight: "bold" }}>{data?.location_string}</Text>
          </View>
        </View>

        <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          {data?.rating && (
            <View style={{ flexDirection: "row", alignItems: "center", spaceX: 2 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFD1BA", alignItems: "center", justifyContent: "center", shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
                <FontAwesome name="star" size={24} color="#D58574" />
              </View>
              <View>
                <Text style={{ color: "#515151" }}>{data?.rating}</Text>
                <Text style={{ color: "#515151" }}>Avaliações</Text>
              </View>
            </View>
          )}

          {data?.price_level && (
            <View style={{ flexDirection: "row", alignItems: "center", spaceX: 2 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFD1BA", alignItems: "center", justifyContent: "center", shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
                <MaterialIcons name="attach-money" size={24} color="black" />
              </View>
              <View>
                <Text style={{ color: "#515151" }}>{data?.price_level}</Text>
                <Text style={{ color: "#515151" }}>Preço</Text>
              </View>
            </View>
          )}

          {data?.bearing && (
            <View style={{ flexDirection: "row", alignItems: "center", spaceX: 2 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFD1BA", alignItems: "center", justifyContent: "center", shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
                <FontAwesome5 name="map-signs" size={24} color="black" />
              </View>
              <View>
                <Text style={{ color: "#515151", textTransform: "capitalize" }}>{data?.bearing}</Text>
                <Text style={{ color: "#515151" }}>Zona</Text>
              </View>
            </View>
          )}
        </View>

        {data?.description && (
          <Text style={{ marginTop: 16, letterSpacing: 1, fontSize: 16, fontWeight: "bold", color: "#97A6AF" }}>
            {data?.description}
          </Text>
        )}

        {data?.cuisine && (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", flexWrap: "wrap", marginTop: 16 }}>
            {data?.cuisine.map((n) => (
              <TouchableOpacity
                key={n.key}
                style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: "#34D399" }}
              >
                <Text>{n.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ marginTop: 16, backgroundColor: "#E5E7EB", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12 }}>
          {data?.phone && (
            <View style={{ flexDirection: "row", alignItems: "center", spaceX: 6 }}>
              <FontAwesome name="phone" size={24} color="#428288" />
              <Text style={{ fontSize: 18 }}>{data?.phone}</Text>
            </View>
          )}
          {data?.email && (
            <View style={{ flexDirection: "row", alignItems: "center", spaceX: 6 }}>
              <FontAwesome name="envelope" size={24} color="#428288" />
              <Text style={{ fontSize: 18 }}>{data?.email}</Text>
            </View>
          )}
          {data?.address && (
            <View style={{ flexDirection: "row", alignItems: "center", spaceX: 6 }}>
              <FontAwesome name="map-pin" size={24} color="#428288" />
              <Text style={{ fontSize: 18 }}>{data?.address}</Text>
            </View>
          )}

          <View style={{ marginTop: 16, paddingHorizontal: 16, paddingVertical: 16, borderRadius: 20, backgroundColor: "#06B2BE", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", textTransform: "uppercase", color: "white" }}>
              Entrar em contato
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
