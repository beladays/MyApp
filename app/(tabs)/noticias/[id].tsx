import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Image, Alert, View } from "react-native";
import { Title, IconButton, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [news, setNews] = useState<any>(null);
  const [isFavorito, setIsFavorito] = useState(false);
  const [favoritoId, setFavoritoId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) setUserId(Number(storedUserId));
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!id || userId === null) return;

    const fetchNews = async () => {
      try {
        const { data: newsData } = await api.get(`/noticias/${id}`);
        setNews(newsData);

        const { data: favList } = await api.get(`/favoritos/${userId}`);
        const favItem = favList.find((f: any) => f.noticiaId === Number(id));

        if (favItem) {
          setIsFavorito(true);
          setFavoritoId(favItem.id);
        } else {
          setIsFavorito(false);
          setFavoritoId(null);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Erro ao carregar notícia");
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
        Alert.alert("Notícia removida dos favoritos");
      } else {
        const { data } = await api.post("/favoritos", { usuarioId: userId, noticiaId: Number(id) });
        setIsFavorito(true);
        setFavoritoId(data.id);
        Alert.alert("Notícia adicionada aos favoritos");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao atualizar favorito");
    }
  };

  if (loading) return <Title style={styles.centerText}>Carregando...</Title>;
  if (!news) return <Title style={styles.centerText}>Notícia não encontrada</Title>;

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Imagem da notícia */}
        {news.urlImagem && <Image source={{ uri: news.urlImagem }} style={styles.image} />}

        {/* Título da notícia */}
        <Title style={styles.title}>{news.titulo}</Title>

        {/* Botão de favorito abaixo do título, canto esquerdo */}
        <View style={styles.favButtonContainer}>
          <IconButton
            icon={isFavorito ? "heart" : "heart-outline"}
            iconColor="#fff"
            size={30}
            onPress={toggleFavorito}
            style={isFavorito ? styles.favActive : styles.favInactive}
          />
        </View>

        {/* Conteúdo da notícia */}
        <Title style={styles.content}>{news.conteudo || news.descricao}</Title>
      </ScrollView>

      {/* Botão de voltar fixo embaixo */}
      <View style={styles.backButtonContainer}>
        <Button
          icon="arrow-left"
          mode="contained"
          onPress={() => router.push("/noticias")}
          style={styles.backButton}
          contentStyle={styles.backButtonContent}
        >
          Voltar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  favButtonContainer: {
    alignSelf: "flex-start", // canto esquerdo
    marginBottom: 16,
  },
  favActive: {
    backgroundColor: "#e91e63",
    borderRadius: 50,
  },
  favInactive: {
    backgroundColor: "#ccc",
    borderRadius: 50,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  backButtonContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  backButton: {
    borderRadius: 24,
    width: 160,
  },
  backButtonContent: {
    height: 50,
  },
  centerText: {
    textAlign: "center",
    marginTop: 20,
  },
});
