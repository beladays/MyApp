import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  function handleLogout() {
    router.replace("/"); // volta para a tela de login
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text>Nome: Usuário Teste</Text>
      <Text>Email: usuario@email.com</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Sair" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 10 }
});
