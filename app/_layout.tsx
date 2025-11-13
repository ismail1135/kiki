import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="auth" options={{ headerShown: false }} />
    <Stack.Screen name="home" options={{ headerShown: false }} />
    <Stack.Screen name="login" options={{ headerShown: false,  }} />
    <Stack.Screen name="sing_up" options={{ headerShown: false, }} />
    <Stack.Screen name="reset-password" options={{ headerShown: false, animation:'fade_from_bottom' }} />
    <Stack.Screen name="studio" options={{ headerShown: false, }} />
  </Stack>;
}
