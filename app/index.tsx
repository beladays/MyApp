import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, Title } from "react-native-paper";
import api from "../app/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha email e senha!");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, senha: password });
      const { token, usuario } = response.data;

     await AsyncStorage.setItem("userToken", response.data.token);
await AsyncStorage.setItem("userNome", response.data.usuario.nome);
await AsyncStorage.setItem("userEmail", response.data.usuario.email);


      router.push("/(tabs)/noticias");
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
      console.error(error);
    }
  }

  function handleRegistrar() {
    // Redireciona para a tela de cadastro
    router.push("/cadastro");
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/provisoria.png")}
        style={styles.logo}
      />

      <Title style={styles.title}>Bem-vindo</Title>
      <Text style={styles.subtitle}>Entre para ver as últimas notícias</Text>

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

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        contentStyle={{ paddingVertical: 5 }}
      >
        Entrar
      </Button>

      <Button
        mode="text"
        onPress={handleRegistrar}
        labelStyle={{ color: "#6a0dad", fontWeight: "bold" }}
        style={styles.register}
      >
        Criar conta
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
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#6a0dad",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  forgot: {
    marginTop: 5,
    color: "#6a0dad",
    alignSelf: "flex-end",
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    width: "100%",
    backgroundColor: "#6a0dad",
  },
  register: {
    marginTop: 15,
  },
});
