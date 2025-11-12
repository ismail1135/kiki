import Snackbar from "@/componet/snack-bar";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import "expo-sqlite/localStorage/install";
import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabaseClient";

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

// Snackbar state için interface
const PhoneSingUpUI = () => {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const [userName, setUserName] = useState("");
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

  async function signUpWithEmail() {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: userName,
        },
      },
    });
    if (error) {
      console.log(error);
      setIsLoad(false);
      return;
    } else {
      setIsLoad(false);
      showSnackbar("Hesap oluşturuldu!", {
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

  async function chechUsernameIsAvailable() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_name", userName)
      .single();

    if (data) {
      console.log("username is not available");
      showSnackbar("Kullanıcı adı kullanılıyor!", {
        position: "top",
        backgroundColor: "#D32F2F",
        icon: <Text>⚠️</Text>,
        buttonText: "TAMAM",
        onButtonPress: () =>
          setSnackbar((prev) => ({ ...prev, visible: false })),
      });
      return;
    }
  }

  const singUp = async () => {
    setIsLoad(true);
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );

    if (!strongRegex.test(email)) {
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
      signUpWithEmail();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={0}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={300}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="flex-1 justify-end bg-background p-8 pb-24 ">
          <Text className="text-white text-3xl font-bold mb-8">
            Hesabınızı Oluşturun
          </Text>
          <Text className="text-muted text-base font-normal mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            doloribus corporis temporibus sapiente.
          </Text>
          <TextInput
            className="w-full bg-border px-4 py-6 rounded-lg mb-4"
            placeholder="@Kullanıcı Adı"
            placeholderTextColor="#56585D"
            returnKeyType='next'
            onChange={() => {
              chechUsernameIsAvailable();
              setUserName(userName);
            }}
          />
          <TextInput
            className="w-full bg-border px-4 py-6 rounded-lg mb-4"
            placeholder="E-posta"
            placeholderTextColor="#56585D"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            className="w-full bg-border px-4 py-6 rounded-lg mb-4"
            placeholder="Şifre"
            placeholderTextColor="#56585D"
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={(password) => setPassword(password)}
          />
          <View className="mb-4 flex-row items-center justify-start">
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#6D4FED" : undefined}
            />
            <Text className="text-muted ml-4 text-base font-normal">
              Kiki E-posta adersimi teklif, tanıtımlar ve içerik güncellemeleri
              göndermek için kullanabilir.
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-muted text-base font-normal">
              Hesap oluşturarak{" "}
              <Text className="text-secondary text-base font-semibold underline">
                Kullanım Şartları
              </Text>{" "}
              ve{" "}
              <Text className="text-secondary text-base font-semibold underline">
                Gizlilik Politikası
              </Text>
              {"'nı "}
              kabul etmiş olursunuz. Daha fazla bilgi edinmek için ziyaret edin.
            </Text>
          </View>
          <TouchableOpacity
            className="w-full bg-primary py-6 rounded-2xl mb-8"
            onPress={() => singUp()}
            disabled={isLoad}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Hesap Oluştur
            </Text>
          </TouchableOpacity>
          <View className="w-full justify-center items-center">
            <Text className="text-muted font-normal text-base justify-center items-center">
              Zaten bir hesabınız var mı?{" "}
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-border font-semibold text-base">
                  Giriş Yapın
                </Text>
              </TouchableOpacity>
            </Text>
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
  );
};

const TabletSingUpUI = () => {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const [userName, setUserName] = useState("");
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

  async function signUpWithEmail() {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: userName,
        },
      },
    });
    if (error) {
      console.log(error);
      setIsLoad(false);
      return;
    } else {
      setIsLoad(false);
      showSnackbar("Hesap oluşturuldu!", {
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

  async function chechUsernameIsAvailable() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_name", userName)
      .single();

    if (data) {
      console.log("username is not available");
      showSnackbar("Kullanıcı adı kullanılıyor!", {
        position: "top",
        backgroundColor: "#D32F2F",
        icon: <Text>⚠️</Text>,
        buttonText: "TAMAM",
        onButtonPress: () =>
          setSnackbar((prev) => ({ ...prev, visible: false })),
      });
      return;
    }
  }

  const singUp = async () => {
    setIsLoad(true);
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );

    if (!strongRegex.test(email)) {
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
      signUpWithEmail();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <View className="w-full flex-row items-end justify-end mb-8 mr-24">
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-white font-semibold text-lg">Giriş Yapın</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-col w-1/2 h-5/6 shadow-lg overflow-hidden rounded-3xl p-16 bg-[#222428]">
        <Text className="text-white text-4xl font-semibold mb-4">
          Hesabınızı Oluşturun
        </Text>
        <Text className="text-muted text-base font-normal mb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quae
          veritatis ipsa commodi voluptate necessitatibus quidem.{" "}
        </Text>
        <TextInput
          className="w-full bg-border px-4 py-6 rounded-lg mb-4"
          placeholder="@Kullanıcı Adı"
          placeholderTextColor="#56585D"
          onChangeText={(userName) => {
            setUserName(userName);
            chechUsernameIsAvailable();
          }}
          returnKeyType="next"
        ></TextInput>
        <TextInput
          className="w-full bg-border px-4 py-6 rounded-lg mb-4"
          placeholder="E-posta"
          placeholderTextColor="#56585D"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
          returnKeyType="next"
        ></TextInput>
        <TextInput
          className="w-full bg-border px-4 py-6 rounded-lg mb-4"
          placeholder="Şifre"
          placeholderTextColor="#56585D"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          returnKeyType="done"
        ></TextInput>

        <View className="mb-4 flex-row items-center justify-start">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#6D4FED" : undefined}
          />
          <Text className="text-muted ml-4 text-base font-normal">
            Kiki E-posta adersimi teklif, tanıtımlar ve içerik güncellemeleri
            göndermek için kullanabilir.
          </Text>
        </View>
        <View className="mb-4">
          <Text className="text-muted text-base font-normal">
            Hesap oluşturarak{" "}
            <Text className="text-secondary text-base font-semibold underline">
              Kullanım Şartları
            </Text>{" "}
            ve{" "}
            <Text className="text-secondary text-base font-semibold underline">
              Gizlilik Politikası
            </Text>{" "}
            kabul etmiş olursunuz. Daha fazla bilgi edinmek için ziyaret edin.
          </Text>
        </View>
        <TouchableOpacity
          className="w-full bg-primary p-5  rounded-2xl"
          onPress={() => singUp()}
        >
          {isLoad === false ? (
            <Text className="text-white text-center text-lg font-semibold">
              Hesap Oluştur
            </Text>
          ) : (
            <ActivityIndicator size="small" color="#FFFFFF" />
          )}
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
        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
      />
    </View>
  );
};

const SignUpScreen = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768; // Tailwind's 'md' breakpoint
  return isTablet ? <TabletSingUpUI /> : <PhoneSingUpUI />;
};

export default SignUpScreen;

const styles = StyleSheet.create({});
