import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, Title } from "react-native-paper";
import api from "../app/services/api";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


async function handleRegistrar() {
  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await api.post("/auth/register", { nome, email, senha });
    alert("Conta criada com sucesso!");
    router.replace("/");
  } catch (error) {
    alert("Erro ao criar conta. Verifique os dados.");
    console.error(error);
  }
}

  return (
    <View style={styles.container}>

      <Image
        source={ require('../assets/images/provisoria.png')}
        style={styles.logo}
      />

      <Title style={styles.title}>Cadastro</Title>
      <Text style={styles.subtitle}>Preencha os campos abaixo para criar sua conta</Text>

      <TextInput
        label="Nome completo"
        mode="outlined"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
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
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleRegistrar}
        style={styles.button}
        contentStyle={{ paddingVertical: 5 }}
      >
        Cadastrar
      </Button>

      <Button
        mode="text"
        onPress={() => router.back()}
        labelStyle={{ color: "#6a0dad", fontWeight: "bold" }}
        style={styles.backButton}
      >
        Voltar
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
    backgroundColor: "#ffffff" 
  },
  logo: { 
    width: 80, 
    height: 80, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 5, 
    textAlign: "center", 
    color: "#6a0dad" 
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    textAlign: "center"
  },
  input: { 
    width: "100%", 
    marginBottom: 15 
  },
  button: { 
    marginTop: 20, 
    borderRadius: 30, 
    width: "100%",
    backgroundColor: "#6a0dad" 
  },
  backButton: {
    marginTop: 15
  }
});
