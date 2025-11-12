import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text, Title, Card, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { useRouter } from "expo-router";

export default function Favorites() {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  const fetchFavoritos = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/favoritos/${userId}`);
      setFavoritos(res.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao carregar favoritos");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem("userId");
      if (id) setUserId(Number(id));
    };
    loadUser();
  }, []);

  useEffect(() => {
    fetchFavoritos();
  }, [userId]);

  const toggleFavorito = async (favoritoId: number, noticiaId: number, isFav: boolean) => {
    try {
      if (isFav) {
        await api.delete(`/favoritos/${favoritoId}`);
      } else {
        await api.post("/favoritos", { usuarioId: userId, noticiaId });
      }
      fetchFavoritos();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao atualizar favorito");
    }
  };

  const irParaNoticia = (noticiaId: number) => {
    router.push(`/noticias/${noticiaId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Favoritos</Title>

      {favoritos.length === 0 ? (
        <Text>Nenhum favorito ainda.</Text>
      ) : (
        favoritos.map(f => (
          <Card key={f.id} style={styles.card}>
            <TouchableOpacity onPress={() => irParaNoticia(f.noticia.id)}>
              <Card.Content>
                <Title>{f.noticia.titulo}</Title>
                <Text>{f.noticia.descricao}</Text>
              </Card.Content>
            </TouchableOpacity>
            <Card.Actions>
              <IconButton
                icon={f ? "heart" : "heart-outline"}
                iconColor="#e91e63"
                size={24}
                onPress={() => toggleFavorito(f.id, f.noticia.id, true)}
              />
            </Card.Actions>
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
