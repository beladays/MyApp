import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
 
      <Stack.Screen name="index" />


      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />


      <Stack.Screen name="noticias/[id]" options={{ title: "Detalhe da Notícia" }} />
    </Stack>
  );
}

