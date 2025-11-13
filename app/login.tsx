import Snackbar from "@/componet/snack-bar";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
// Snackbar state için interface
interface SnackbarState {
  visible: boolean;
  message: string;
  position?: "top" | "bottom" | "center";
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonPress?: () => void;
  duration?: number;
}

const PhoneLoginhUI = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: "",
    position: "top",
    backgroundColor: "#D32F2F",
    textColor: "#FFFFFF",
    icon: undefined,
    buttonText: undefined,
    onButtonPress: undefined,
    duration: 3000,
  });

  const showSnackbar = (
    message: string,
    options: Partial<SnackbarState> = {}
  ) => {
    setSnackbar({
      visible: true,
      message,
      position: "top",
      backgroundColor: "#D32F2F",
      textColor: "#FFFFFF",
      duration: 3000,
      ...options,
    });
  };

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    if (error) {
      console.log(error);
      setIsLoad(false);
      return;
    } else {
      setIsLoad(false);
      showSnackbar("Oturum açıldı!", {
        position: "top",
        backgroundColor: "#388E3C",
        icon: <Text>✓</Text>,
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/home"); // veya istediğiniz sayfa
      }, 1000);
    }
  }

  const signIn = () => {
    setIsLoad(true);
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );
    if (email.trim() === "" || password === "") {
      showSnackbar("Lütfen tüm alanları doldurunuz!", {
        position: "top",
        backgroundColor: "#D32F2F",
        icon: <Text>⚠️</Text>,
      });
      setIsLoad(false);
      return false;
    } else {
      if (!strongRegex.test(email.trim())) {
        console.log("email is not valid");
        showSnackbar("Email geçerli değil!", {
          position: "top",
          backgroundColor: "#D32F2F",
          icon: <Text>⚠️</Text>,
          buttonText: "TAMAM",
          onButtonPress: () =>
            setSnackbar((prev) => ({ ...prev, visible: false })),
        });
        setIsLoad(false);
        return false;
      } else if (password.length < 8) {
        console.log("password is not valid");
        showSnackbar("Şifre en az 8 karakter olmalı!", {
          position: "top",
          backgroundColor: "#D32F2F",
          icon: <Text>⚠️</Text>,
          buttonText: "TAMAM",
          onButtonPress: () =>
            setSnackbar((prev) => ({ ...prev, visible: false })),
        });
        setIsLoad(false);
        return false;
      }
      try {
        signInWithEmail();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#ffffff"
      />
      <SafeAreaView className="flex-1 bg-background">
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={0}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardOpeningTime={300}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View className="flex-1 items-center justify-end bg-background p-8 pb-24 ">
            <Text className="text-white text-3xl font-bold mb-8">
              Devam etmek için e-posta adresinizi girin
            </Text>
            <Text className="text-muted text-base font-normal mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              doloribus corporis temporibus sapiente.
            </Text>
            <TextInput
              className="w-full bg-border text-text px-4 py-6 rounded-lg mb-4"
              placeholder="E-posta"
              placeholderTextColor="#56585D"
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              returnKeyType="next"
            />
            <TextInput
              className="w-full bg-border text-text px-4 py-6 rounded-lg mb-4"
              placeholder="Şifre"
              placeholderTextColor="#56585D"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              returnKeyType="done"
            />
            <View className="w-full justify-center items-end">
              <TouchableOpacity
                className="mb-4"
                onPress={() => router.push("/reset-password")}
              >
                <Text className="text-secondary">Şifremi Unuttum</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="w-full bg-primary py-6 rounded-2xl mb-8">
              {isLoad === false ? (
                <Text
                  className="text-white text-center text-lg font-semibold"
                  onPress={() => signIn()}
                >
                  Devam Et
                </Text>
              ) : (
                <ActivityIndicator size="small" color="#FFFFFF" />
              )}
            </TouchableOpacity>
            <View className="flex-row justify-center items-center">
              <Text className="text-muted font-normal text-base">
                Hesabınız yok mu?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/sing_up")}>
                <Text className="text-border font-semibold text-base">
                  Kayıt Olun
                </Text>
              </TouchableOpacity>
            </View>

            <Snackbar
              visible={snackbar.visible}
              message={snackbar.message}
              position={snackbar.position}
              backgroundColor={snackbar.backgroundColor}
              textColor={snackbar.textColor}
              icon={snackbar.icon}
              buttonText={snackbar.buttonText}
              onButtonPress={snackbar.onButtonPress}
              duration={snackbar.duration}
              onDismiss={() =>
                setSnackbar((prev) => ({ ...prev, visible: false }))
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const TabletLoginUI = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: "",
    position: "top",
    backgroundColor: "#D32F2F",
    textColor: "#FFFFFF",
    icon: undefined,
    buttonText: undefined,
    onButtonPress: undefined,
    duration: 3000,
  });

  const showSnackbar = (
    message: string,
    options: Partial<SnackbarState> = {}
  ) => {
    setSnackbar({
      visible: true,
      message,
      position: "top",
      backgroundColor: "#D32F2F",
      textColor: "#FFFFFF",
      duration: 3000,
      ...options,
    });
  };

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    if (error) {
      console.log(error);
      setIsLoad(false);
      return;
    } else {
      setIsLoad(false);
      showSnackbar("Oturum açıldı!", {
        position: "top",
        backgroundColor: "#388E3C",
        icon: <Text>✓</Text>,
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/home"); // veya istediğiniz sayfa
      }, 1000);
    }
  }

  const signIn = () => {
    setIsLoad(true);
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );

    if (email.trim() === "" || password === "") {
      showSnackbar("Lütfen tüm alanları doldurunuz!", {
        position: "top",
        backgroundColor: "#D32F2F",
        icon: <Text>⚠️</Text>,
      });
      setIsLoad(false);
      return false;
    } else {
      if (!strongRegex.test(email.trim())) {
        console.log("email is not valid");
        showSnackbar("Email geçerli değil!", {
          position: "top",
          backgroundColor: "#D32F2F",
          icon: <Text>⚠️</Text>,
          buttonText: "TAMAM",
          onButtonPress: () =>
            setSnackbar((prev) => ({ ...prev, visible: false })),
        });
        setIsLoad(false);
        return false;
      } else if (password.length < 8) {
        console.log("password is not valid");
        showSnackbar("Şifre en az 8 karakter olmalı!", {
          position: "top",
          backgroundColor: "#D32F2F",
          icon: <Text>⚠️</Text>,
          buttonText: "TAMAM",
          onButtonPress: () =>
            setSnackbar((prev) => ({ ...prev, visible: false })),
        });
        setIsLoad(false);
        return false;
      }
      try {
        signInWithEmail();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <View className="w-full flex-row items-end justify-end mb-8 mr-24">
        <TouchableOpacity onPress={() => router.push("/sing_up")}>
          <Text className="text-white font-semibold text-lg">
            Hemen Kayıt olun
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-col w-1/2 h-4/6 shadow-lg overflow-hidden rounded-3xl p-16 bg-[#222428]">
        <Text className="text-white text-4xl font-semibold mb-4">
          Devam etmek için e-posta adresinizi girin
        </Text>
        <Text className="text-muted text-base font-normal mb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quae
          veritatis ipsa commodi voluptate necessitatibus quidem.{" "}
        </Text>
        <TextInput
          className="w-full bg-border text-text px-4 py-6 rounded-lg mb-4"
          placeholder="E-posta"
          keyboardType="email-address"
          placeholderTextColor="#56585D"
          value={email}
          onChangeText={(email) => setEmail(email)}
          returnKeyType="next"
        />
        <TextInput
          className="w-full bg-border text-text px-4 py-6 rounded-lg mb-4"
          placeholder="Şifre"
          secureTextEntry={true}
          placeholderTextColor="#56585D"
          value={password}
          onChangeText={(password) => setPassword(password)}
          returnKeyType="done"
        />
        <TouchableOpacity
          className="w-full bg-primary p-5 rounded-2xl"
          onPress={() => signIn()}
        >
          {isLoad === false ? (
            <Text className="text-white text-center text-lg font-semibold">
              Devam Et
            </Text>
          ) : (
            <ActivityIndicator size="small" color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="pt-8"
        onPress={() => router.push("/reset-password")}
      >
        <Text className="text-secondary text-center text-base font-normal">
          Giriş yapmak için yardıma ihtiyacınız var mı?
        </Text>
      </TouchableOpacity>

      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        position={snackbar.position}
        backgroundColor={snackbar.backgroundColor}
        textColor={snackbar.textColor}
        icon={snackbar.icon}
        buttonText={snackbar.buttonText}
        onButtonPress={snackbar.onButtonPress}
        duration={snackbar.duration}
        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
      />
    </View>
  );
};

const LoginScreens = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return isTablet ? <TabletLoginUI /> : <PhoneLoginhUI />;
};

export default LoginScreens;

const styles = StyleSheet.create({});
