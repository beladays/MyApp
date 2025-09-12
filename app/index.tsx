import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Title } from "react-native-paper";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (email && password) {
      router.push("/(tabs)/noticias");
    } else {
      alert("Preencha email e senha!");
    }
  }

  function handleCadastro() {
    router.push("/cadastro");
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Tela de Login</Title>

      <TextInput
        label="Email"
        mode="outlined"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        label="Senha"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Text style={styles.forgot}>Esqueceu a senha?</Text>

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>

      <Button mode="outlined" onPress={handleCadastro} style={styles.button}>
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#0852a1ff" },
  input: { marginBottom: 15 },
  forgot: { marginTop: 10, color: "#0852a1ff", textAlign: "right" },
  button: { marginTop: 20, borderRadius: 50, backgroundColor: "#0852a1ff"},
});
