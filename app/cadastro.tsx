import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Title } from "react-native-paper";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleRegistrar() {
    if (nome && email && senha) {
      alert("Conta criada com sucesso!");
      router.replace("/");
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Cadastro</Title>

      <TextInput label="Nome completo" mode="outlined" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="Email" mode="outlined" keyboardType="email-address" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Senha" mode="outlined" secureTextEntry value={senha} onChangeText={setSenha} style={styles.input} />

      <Button mode="contained" onPress={handleRegistrar} style={styles.button}> Cadastrar</Button>

      <Button mode="outlined" onPress={() => router.back()} style={[styles.button, styles.backButton]}>
        Voltar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#0852a1ff" },
  input: { marginBottom: 15 },
  button: { marginTop: 20, borderRadius: 50, backgroundColor: "#0852a1ff"  },
  backButton: { backgroundColor: "#888", color: "white" },
});
