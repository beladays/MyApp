import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({ nome: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const nome = await AsyncStorage.getItem("userNome");
      const email = await AsyncStorage.getItem("userEmail");
      if (nome && email) setUser({ nome, email });
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Perfil do Usuário</Title>
      <Text style={styles.infoLabel}>Nome:</Text>
      <Text style={styles.infoValue}>{user.nome}</Text>
      <Text style={styles.infoLabel}>Email:</Text>
      <Text style={styles.infoValue}>{user.email}</Text>

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
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30, color: "#6a0dad" },
  infoLabel: { fontSize: 16, color: "#555", fontWeight: "600" },
  infoValue: { fontSize: 18, color: "#222", marginBottom: 15 },
  button: { marginTop: 30, borderRadius: 30, width: "60%", elevation: 3 },
});
