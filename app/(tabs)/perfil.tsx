import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  function handleLogout() {
    router.replace("/"); 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text>Nome: Isabela Dias</Text>
      <Text>Email: isabela@gmail.com</Text>

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
