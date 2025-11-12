import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Image, Alert } from "react-native";
import { Title, IconButton } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const [news, setNews] = useState<any>(null);
  const [isFavorito, setIsFavorito] = useState(false);
  const [favoritoId, setFavoritoId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const idUser = await AsyncStorage.getItem("userId");
      if (idUser) setUserId(Number(idUser));
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!id || userId === null) return;

    const fetchNews = async () => {
      try {
        const res = await api.get(`/noticias/${id}`);
        setNews(res.data);

        // Verifica se já é favorito
        const favRes = await api.get(`/favoritos/${userId}`);
        const fav = favRes.data.find((f: any) => f.noticiaId === Number(id));
        if (fav) {
          setIsFavorito(true);
          setFavoritoId(fav.id);
        }
      } catch (error) {
        console.error("Erro ao buscar notícia ou favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, userId]);

  const toggleFavorito = async () => {
    if (!userId) return;

    try {
      if (isFavorito && favoritoId) {
        await api.delete(`/favoritos/${favoritoId}`);
        setIsFavorito(false);
        setFavoritoId(null);
      } else {
        const res = await api.post("/favoritos", { usuarioId: userId, noticiaId: Number(id) });
        setIsFavorito(true);
        setFavoritoId(res.data.id); // assume que retorna o id do favorito criado
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      Alert.alert("Erro ao atualizar favorito");
    }
  };

  if (loading) return <Title>Carregando...</Title>;
  if (!news) return <Title>Notícia não encontrada</Title>;

  return (
    <ScrollView style={styles.container}>
      {news.urlImagem && <Image source={{ uri: news.urlImagem }} style={styles.image} />}
      <Title style={styles.title}>{news.titulo}</Title>

      <IconButton
        icon={isFavorito ? "heart" : "heart-outline"}
        iconColor="#e91e63"
        size={28}
        onPress={toggleFavorito}
      />

      <Title style={styles.content}>{news.conteudo || news.descricao}</Title>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24 },
});
