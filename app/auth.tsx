import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const contentData = [
  {
    id: 1,
    name: "Alice",
    character: "Alice",
    source: "Alice in Wonderland",
    type: "Klasik Edebiyat",
    image:
      "https://www.prints-online.com/p/164/alice-wonderland-7177197.jpg.webp",
    info: "Telif hakkı: Kamu Malı (1865)",
  },
  {
    id: 2,
    name: "Sherlock Holmes",
    character: "Sherlock Holmes",
    source: "Sherlock Holmes Hikayeleri",
    type: "Dedektif",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Williamgillette1.jpg/500px-Williamgillette1.jpg?20120830195246",
    info: "Telif hakkı: Kamu Malı (1887)",
  },
  {
    id: 3,
    name: "Pinocchio",
    character: "Pinocchio",
    source: "Pinocchio'nun Maceraları",
    type: "Klasik Masal",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Pinocchio%2C_il_burattino_di_Collodi.jpg/500px-Pinocchio%2C_il_burattino_di_Collodi.jpg?20240328202240",
    info: "Telif hakkı: Kamu Malı (1883)",
  },
  {
    id: 4,
    name: "Peter Pan",
    character: "Peter Pan",
    source: "Peter Pan",
    type: "Fantezi",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    info: "Telif hakkı: Kamu Malı (1911)",
  },
  {
    id: 5,
    name: "Dracula",
    character: "Count Dracula",
    source: "Dracula",
    type: "Gotik Korku",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/GB_London_Peter_Pen_Monument.JPG/500px-GB_London_Peter_Pen_Monument.JPG?20121203212949",
    info: "Telif hakkı: Kamu Malı (1897)",
  },
  {
    id: 6,
    name: "Frankenstein",
    character: "Victor Frankenstein",
    source: "Frankenstein",
    type: "Bilim Kurgu",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    info: "Telif hakkı: Kamu Malı (1818)",
  },
  {
    id: 7,
    name: "Moby Dick",
    character: "Captain Ahab",
    source: "Moby Dick",
    type: "Macera",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Moby_Dick_final_chase.jpg/500px-Moby_Dick_final_chase.jpg?20160507144520",
    info: "Telif hakkı: Kamu Malı (1851)",
  },
  {
    id: 8,
    name: "Little Prince",
    character: "Küçük Prens",
    source: "Küçük Prens",
    type: "Felsefe",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Pitit_Prince_26.jpg/500px-Pitit_Prince_26.jpg?20230806211257",
    info: "Telif hakkı: Kamu Malı (1943)",
  },
  {
    id: 9,
    name: "Robinson Crusoe",
    character: "Robinson Crusoe",
    source: "Robinson Crusoe",
    type: "Macera",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/A._F._Lydon_Robinson_Crusoe_Plate_08_%281865%29.JPG/500px-A._F._Lydon_Robinson_Crusoe_Plate_08_%281865%29.JPG?20120225023016",
    info: "Telif hakkı: Kamu Malı (1719)",
  },
  {
    id: 10,
    name: "Don Quixote",
    character: "Don Quixote",
    source: "Don Kişot",
    type: "Klasik",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Don_Quixote_6.jpg/500px-Don_Quixote_6.jpg?20060402183430",
    info: "Telif hakkı: Kamu Malı (1605)",
  },
];

const PhoneAuthUI = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % contentData.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentContent = contentData[currentIndex];

  return (
    <View className="flex-1 items-center justify-end bg-background p-8 pb-24">
      <View className="absolute inset-0">
        <Animated.View
          style={{ opacity: fadeAnim, width: "100%", height: "100%" }}
        >
          <Image
            source={{ uri: currentContent.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </Animated.View>
        <Image
          source={require("../assets/images/black_frame.png")}
          className="absolute w-full h-4/6 bottom-[-60]"
          resizeMode="cover"
        />
      </View>

      {/* Content Info Badge */}
      <View className="absolute top-16 left-8 right-8 bg-black/70 rounded-2xl p-4">
        <Text className="text-white text-xl font-bold">
          {currentContent.character}
        </Text>
        <Text className="text-gray-300 text-sm mt-1">
          {currentContent.source}
        </Text>
        <Text className="text-gray-400 text-xs mt-2">
          {currentContent.info}
        </Text>
      </View>

      <Text className="text-white text-3xl font-bold mb-8">Kiki</Text>
      <Text className="text-muted text-base text-center font-normal mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe doloribus
        corporis temporibus sapiente.
      </Text>
      <TouchableOpacity
        className="w-full bg-primary py-6 rounded-2xl mb-4"
        onPress={() => router.push("/login")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Giriş Yap
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full border-2 border-primary py-6 rounded-2xl"
        onPress={() => router.push("/sing_up")}
      >
        <Text className="text-primary text-center text-lg font-semibold">
          Kayıt Ol
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Tablet UI Component
const TabletAuthUI = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-background p-8">
      <View className="flex-row w-full h-full  shadow-lg overflow-hidden">
        {/* Left side for image/branding */}
        <View className="w-1/2 h-full bg-primary rounded-tr-3xl rounded-br-3xl items-center justify-center p-8">
          <Text className="text-white text-4xl font-bold text-center">
            Hoş Geldiniz!
          </Text>
          <Text className="text-white text-lg text-center mt-4">
            kişiselleştirilmiş kitap kapağı, kullanıcı tıklayınca örnekk birkaç
            sayfa gözükür
          </Text>
        </View>
        {/* Right side for login form */}
        <View className="w-1/2 p-8 items-center justify-center">
          <Text className="text-white text-3xl font-bold mb-8">Kiki</Text>
          <Text className="text-muted text-base text-center font-normal mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            doloribus corporis temporibus sapiente.
          </Text>
          <TouchableOpacity
            className="w-full bg-primary py-6 rounded-2xl mb-4"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white text-center text-xl font-semibold">
              Giriş Yap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full border-2 border-primary py-6 rounded-2xl"
            onPress={() => router.push("/sing_up")}
          >
            <Text className="text-white text-center text-xl font-semibold">
              Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AuthScreen = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768; // Tailwind's 'md' breakpoint

  return isTablet ? <TabletAuthUI /> : <PhoneAuthUI />;
};

export default AuthScreen;
