import Snackbar from "@/componet/snack-bar";
import { supabase } from "@/lib/supabaseClient";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
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

const Phone_reset_password = () => {
  useEffect(() => {
    const handleDeepLink = async (event?: Linking.EventType) => {
      const url = event ? event.url : await Linking.getInitialURL();
      console.log("🔗 Yakalanan URL:", url);
      if (!url) return;

      const parsed = Linking.parse(url);
      const token = parsed.queryParams?.token as string | undefined;

      if (token) {
        const { error } = await supabase.auth.exchangeCodeForSession(token);
        if (!error) {
          console.log("✅ Token doğrulandı, yönlendirme yapılıyor.");
          router.replace("/new_password");
        } else {
          console.error("❌ Token geçersiz:", error.message);
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    handleDeepLink();

    return () => {
      subscription.remove();
    };
  }, []);

  const [email, setEmail] = useState("");
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
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );

  async function resetPassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "kiki://reset-password",
    });
    const msg = error?.message || "";
    const match = error?.message.match("/(d+)s*seconds?/i");
    const seconds = match ? parseInt(match[1]) : 59;
    if (msg.includes("For security purposes")) {
      showSnackbar(
        `Çok fazla dneme Yaptınız ${seconds} saniye sonra tekrar deneyin`,
        {
          position: "top",
          backgroundColor: "#E6BD38",
          icon: <Text>⚠️</Text>,
        }
      );
      setIsLoad(false);
      return false;
    } else if (error) {
      console.log(error);
      showSnackbar("Bir sorun oluştu! daha sonra tekrar deneyin", {
        position: "top",
        backgroundColor: "#D32F2F",
        icon: <Text>⚠️</Text>,
      });
      setIsLoad(false);
      return false;
    } else if (msg.includes("For security purposes")) {
      showSnackbar(
        `Çok fazla dneme Yaptınız ${seconds} saniye sonra tekrar deneyin`,
        {
          position: "top",
          backgroundColor: "#E6BD38",
          icon: <Text>⚠️</Text>,
        }
      );
    } else {
      showSnackbar(
        "E-posta gönderildi! lütfen gelen kutunuzu veya spamlarınızı kontrol edin",
        {
          position: "top",
          backgroundColor: "#33D022",
          icon: <Text>✓</Text>,
        }
      );
      setIsLoad(false);
      return false;
    }
  }

  const sendMail = () => {
    setIsLoad(true);
    if (email.trim() === "") {
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
      } else {
      }
      try {
        resetPassword();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-background">
      <View className="w-full flex-col items-start justify-center p-8 mb-">
        <Text className="text-white text-3xl font-bold mb-8">
          E-posta Adresinizi Girin
        </Text>
        <Text className="text-muted text-base font-bold mb-8">
          Size şifre sıfırlama bağlantısı içren bir e-posta göndereceğiz.
        </Text>
        <TextInput
          className="w-full bg-border px-4 py-6 rounded-lg mb-4"
          placeholder="E-posta"
          keyboardType="email-address"
          placeholderTextColor="#56585D"
          value={email}
          onChangeText={(email) => setEmail(email)}
          returnKeyType="done"
        />
        <TouchableOpacity
          className="w-full bg-primary py-6 rounded-2xl mb-8"
          onPress={() => sendMail()}
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
    </SafeAreaView>
  );
};

const Tablet_reset_password = () => {
  return (
    <SafeAreaView className="flex-1 bg-background justify-center items-center">
      <View>
        <Text className="text-white">reset_password tablet</Text>
      </View>
    </SafeAreaView>
  );
};

const Reset_password_screens = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  return isTablet ? <Tablet_reset_password /> : <Phone_reset_password />;
};

export default Reset_password_screens;

const styles = StyleSheet.create({});
