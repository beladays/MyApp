import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Title, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function Favorites() {
  const [favoritos, setFavoritos] = useState([]);

  const fetchFavoritos = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const response = await api.get(`/favoritos/${userId}`);
      setFavoritos(response.data);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Favoritos</Title>

      {favoritos.length === 0 ? (
        <Text>Nenhum favorito ainda.</Text>
      ) : (
        favoritos.map((fav: any) => (
          <Card key={fav.id} style={styles.card}>
            <Card.Content>
              <Title>{fav.noticia.titulo}</Title>
              <Text>{fav.noticia.descricao}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 15, backgroundColor: "#fff" },
});
