import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

// Phone UI Component
const PhoneAuthUI = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-end bg-background p-8 pb-24">
      <View className="absolute inset-0">
        <Image
          source={require("../assets/images/stranger_things.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
        <Image
          source={require("../assets/images/black_frame.png")}
          className=" absolute w-full h-4/6 bottom-[-60]"
          resizeMode="cover"
        />
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
