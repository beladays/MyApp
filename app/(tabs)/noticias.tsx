import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api"; // ← use seu axios aqui

// Tipos para as notícias (compatível com Prisma)
interface Article {
  id: number;
  title: string;
  summary?: string;
  content: string;
  author?: string;
  imageUrl?: string;
  publishedAt: string;
}

export default function Noticias() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔐 Verifica se o usuário está logado
  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      Alert.alert(
        "Acesso restrito",
        "Você precisa estar logado para acessar as notícias.",
        [{ text: "Fazer login", onPress: () => router.replace("/") }]
      );
      return false;
    }
    setIsLoggedIn(true);
    return true;
  };

  // 🌐 Busca as notícias da API
  const fetchArticles = async () => {
    try {
      const response = await api.get("/noticias");
      const data = response.data;

      const formatted = data.map((item: any) => ({
        id: item.id,
        title: item.titulo,
        summary: item.descricao,
        imageUrl: item.urlImagem,
        content: item.conteudo,
        publishedAt: item.createdAt || "",
      }));

      setArticles(formatted);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      Alert.alert("Erro", "Não foi possível carregar as notícias.");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Inicialização
  useEffect(() => {
    const init = async () => {
      const logged = await checkLogin();
      if (logged) fetchArticles();
    };
    init();
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["userToken", "userId"]);
    router.replace("/");
  };

  // 📖 Abrir notícia
const abrirNoticia = (article: Article) => {
  router.push(`/noticias/${article.id}`);
};

  // 🌀 Carregando
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" color="#6a0dad" />
        <Text style={{ marginTop: 10 }}>Carregando notícias...</Text>
      </View>
    );
  }

  // 📰 Nenhuma notícia
  if (articles.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>Nenhuma notícia encontrada.</Text>
      </View>
    );
  }

  const principal = articles[0];
  const outras = articles.slice(1);

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Title style={styles.title}>Últimas Notícias</Title>
        <Button
          mode="text"
          icon="logout"
          onPress={handleLogout}
          textColor="#6a0dad"
        >
          Sair
        </Button>
      </View>

      {/* Notícia principal */}
      <Card style={styles.mainCard} onPress={() => abrirNoticia(principal)}>
        {principal.imageUrl && (
          <Card.Cover source={{ uri: principal.imageUrl }} />
        )}
        <Card.Content>
          <Title style={styles.mainHeadline}>{principal.title}</Title>
          <Paragraph numberOfLines={3} style={styles.mainDesc}>
            {principal.summary}
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Outras notícias */}
      <FlatList
        data={outras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.smallCard} onPress={() => abrirNoticia(item)}>
            <View style={styles.smallCardContent}>
              {item.imageUrl && (
                <Card.Cover
                  source={{ uri: item.imageUrl }}
                  style={styles.smallThumb}
                />
              )}
              <View style={styles.smallTextContent}>
                <Title numberOfLines={2} style={styles.smallHeadline}>
                  {item.title}
                </Title>
                <Paragraph numberOfLines={2} style={styles.smallDesc}>
                  {item.summary}
                </Paragraph>
              </View>
            </View>
          </Card>
        )}
      />
    </ScrollView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f6ff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6a0dad",
  },
  mainCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 6,
  },
  mainHeadline: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
    lineHeight: 28,
    color: "#6a0dad",
  },
  mainDesc: {
    fontSize: 15,
    color: "#4a4a4a",
    lineHeight: 22,
  },
  smallCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  smallCardContent: {
    flexDirection: "row",
    padding: 12,
  },
  smallThumb: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  smallTextContent: {
    flex: 1,
  },
  smallHeadline: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
    color: "#6a0dad",
  },
  smallDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
