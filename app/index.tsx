import '@/app/globals.css';
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import 'react-native-url-polyfill/auto';

export default function Index() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkSession();

    // Oturum değişikliklerini dinle
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          router.replace("/home");
        } else if (event === 'SIGNED_OUT') {
          router.replace("/auth");
        }
      }
    );

    // Cleanup
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      // Mevcut oturumu kontrol et
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Oturum kontrolü hatası:', error);
        router.replace("/auth");
        return;
      }

      // Küçük bir gecikme ekleyerek splash screen'i göster
      setTimeout(() => {
        if (session && session.user) {
          // Oturum varsa home'a yönlendir
          router.replace("/home");
        } else {
          // Oturum yoksa auth'a yönlendir
          router.replace("/auth");
        }
        setIsChecking(false);
      }, 1500);
      
    } catch (error) {
      console.error('Beklenmeyen hata:', error);
      router.replace("/auth");
      setIsChecking(false);
    }
  };

  if (!isChecking) {
    return null;
  }

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: "#0A0B0D" // bg-background rengi
    }}>
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={{ 
        color: "#FFFFFF", 
        marginTop: 16,
        fontSize: 16
      }}>
        Yükleniyor...
      </Text>
    </View>
  );
}