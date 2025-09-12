import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";

export default function Profile() {
  const router = useRouter();

  function handleLogout() {
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Perfil do Usuário</Title>
      <Text style={styles.info}>Nome: Isabela Dias</Text>
      <Text style={styles.info}>Email: isabela@gmail.com</Text>

      <Button mode="contained" buttonColor="red" onPress={handleLogout} style={styles.button}>
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },

  title: { fontSize: 24, marginBottom: 10 },

  info: { fontSize: 16, marginBottom: 5 },

  button: { marginTop: 20, borderRadius: 50 },
});
