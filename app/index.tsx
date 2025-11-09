import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
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
      {/* Logo  */}
      <Image
        source={ require('../assets/images/provisoria.png')}
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
        onPress={handleCadastro}
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
  forgot: { 
    marginTop: 5, 
    color: "#6a0dad", 
    alignSelf: "flex-end" 
  },
  button: { 
    marginTop: 20, 
    borderRadius: 30, 
    width: "100%", 
    backgroundColor: "#6a0dad" 
  },
  register: {
    marginTop: 15
  }
});
