import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Login  */}
      <Stack.Screen name="index" />

      {/* layout de abas dps q loga */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* detalhes das news */}
      <Stack.Screen name="noticias/[id]" options={{ title: "Detalhe da Notícia" }} />
    </Stack>
  );
}

