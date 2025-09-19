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
      <Text style={styles.infoLabel}>Nome:</Text>
      <Text style={styles.infoValue}>Isabela Dias</Text>
      <Text style={styles.infoLabel}>Email:</Text>
      <Text style={styles.infoValue}>isabela@gmail.com</Text>

      <Button
        mode="contained"
        buttonColor="#6a0dad"
        onPress={handleLogout}
        style={styles.button}
        contentStyle={{ paddingVertical: 10 }}
      >
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#f5f0fa", // roxo clarinho de fundo
  },

  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 30, 
    color: "#6a0dad",
    textAlign: "center",
  },

  infoLabel: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 18,
    color: "#222",
    marginBottom: 15,
  },

  button: { 
    marginTop: 30, 
    borderRadius: 30, 
    width: "60%", 
    elevation: 3, // leve sombra
  },
});
