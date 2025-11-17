import {
  ArrowRight2,
  Brush,
  Bubble,
  Designtools,
  PictureFrame,
} from "iconsax-react-native";
import React from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface StudioItems {
  id: number;
  icon: React.ReactNode;
  color: string;
  title: string;
  description?: string;
} 

const studioItems: StudioItems[] = [
  {
    id: 1,
    icon: <Designtools size={24} color="#000" variant="Bulk" />,
    color: "#FED63E",
    title: "Kütüphane yapısını ayarla",
  },
  {
    id: 2,
    icon: <Brush size={24} color="#000" variant="Bulk" />,
    color: "#FFA2F6",
    title: "Kütüphane içeriğini düzenle",
  },
  {
    id: 3,
    icon: <PictureFrame size={24} color="#000" variant="Bulk" />,
    color: "#CAA149",
    title: "Çerçeveni düzenle",
  },
  {
    id: 4,
    icon: <Bubble size={24} color="#000" variant="Bulk" />,
    color: "#6ED2CE",
    title: "Duvar kağıdını ayarla",
  },
];

const Phone_studio = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F3F3F3] p-4">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="w-full py-3 bg-white rounded-3xl">
        <FlatList
          data={studioItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => console.log("tıklandı")}
              android_ripple={{
                color: "rgba(100, 100, 255, 0.3)",
                borderless: false,
              }}
              style={({ pressed }) => [
                styles.listItem,
                pressed &&
                  Platform.OS === "ios" && { backgroundColor: "#e0e0e0" },
              ]}
            >
              <View className="flex-row items-center justify-between px-4 py-3 mb-4 bg-white rounded-3xl ">
                <View
                  className="p-2"
                  style={{ backgroundColor: item.color, borderRadius: 10 }}
                >
                  {item.icon}
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-base font-normal text-text">
                    {item.title}
                  </Text>
                </View>
                <ArrowRight2 size={18} color="#B0B5BC" variant="Linear" />
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const Tablet_studio = () => {
  return (
    <SafeAreaView className="flex-1 flex-row bg-[#F3F3F3] p-4">
      <View className="items-center justify-center w-4/6">
      <Text className="text-base font-normal text-center text-text">Düzenlemek için yandaki menüden seçim yapınız.</Text>
      </View>
      <View className="w-2/6 px-3 overflow-hidden bg-white rounded-3xl">
        <FlatList
          data={studioItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => console.log("tıklandı")}
              android_ripple={{
                color: "rgba(100, 100, 255, 0.3)",
                borderless: false,
              }}
              style={({ pressed }) => [styles.listItem]}
            >
              <View className="flex-row items-center justify-between px-4 py-3 mb-4 bg-white rounded-3xl ">
                <View
                  className="p-2"
                  style={{ backgroundColor: item.color, borderRadius: 10 }}
                >
                  {item.icon}
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-base font-normal text-text">
                    {item.title}
                  </Text>
                </View>
                <ArrowRight2 size={18} color="#B0B5BC" variant="Linear" />
              </View>
            </Pressable>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

const Studio_screens = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  return isTablet ? <Tablet_studio /> : <Phone_studio />;
};

export default Studio_screens;

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    fontSize: 16,
  },
});
