import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Login fica como a tela inicial */}
      <Stack.Screen name="index" />

      {/* Ao logar, redireciona para o layout de abas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Tela de detalhe da notícia (fica fora das tabs) */}
      <Stack.Screen name="news/[id]" options={{ title: "Detalhe da Notícia" }} />
    </Stack>
  );
}

