import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleRegistrar() {
    if (nome && email && senha) {
      alert("Conta criada com sucesso!");
      router.replace("/"); // volta para login
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nome completo" 
        value={nome} 
        onChangeText={setNome} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address"
        value={email} 
        onChangeText={setEmail} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry
        value={senha} 
        onChangeText={setSenha} 
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão de voltar */}
      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f2f2f2", 
    padding: 20 
  },
  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    marginBottom: 40, 
    color: "#0852a1ff" 
  },
  input: { 
    width: "90%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    backgroundColor: "#fff", 
    marginBottom: 15, 
    padding: 12, 
    borderRadius: 40, 
    fontSize: 16 
  },
  button: { 
    backgroundColor: "#0852a1ff", 
    paddingVertical: 14, 
    borderRadius: 50, 
    width: "52%", 
    alignItems: "center", 
    marginTop: 20 
  },
  backButton: {
    backgroundColor: "#888", 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});
