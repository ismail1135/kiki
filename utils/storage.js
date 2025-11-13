import AsyncStorage from "@react-native-async-storage/async-storage";

export const chechkFirstLaunch = async () => {
  try {
    const hasLaunched = await AsyncStorage.getItem("hasComplatedOnboarding");
    return hasLaunched === null;
  } catch (e) {
    console.log("Storeage hatası:", e);
    return true;
  }
};

export const serOnboardingComplated = async (preferences) => {
  try {
    await AsyncStorage.setItem("hasComplatedOnboarding", "true");
    await AsyncStorage.setItem("preferences", JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.log("kayıt hatası:", error);
  }
};
