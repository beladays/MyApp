import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView,StyleSheet,View,Alert,ImageSourcePropType,} from "react-native";
import {ActivityIndicator,Button,Card,Paragraph,Text,Title,} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// atributos p prisma
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

  // verificaçao de usuario
  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  };

  //  API noticias
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/noticias"); 
      const data = await response.json();

       // ajusta os nomes para o frontend
    const formatted = data.map((item: any) => ({
      id: item.id,
      title: item.titulo,
      summary: item.descricao,
      imageUrl: item.urlImagem,
      content: item.conteudo,
      publishedAt: item.createdAt || "",
    }));

      setArticles(formatted || []);
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    checkLogin();
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
        <Text style={{ marginTop: 10 }}>Carregando notícias...</Text>
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>Nenhuma notícia encontrada.</Text>
      </View>
    );
  }

  const principal = articles[0];
  const outras = articles.slice(1);

  // abre notícia
  const abrirNoticia = (article: Article) => {
    if (!isLoggedIn) {
      Alert.alert(
        "Acesso restrito",
        "Você precisa estar logado para ler a notícia completa.",
        [
          { text: "Fazer login", onPress: () => router.push("../index") },
          { text: "Cancelar" },
        ]
      );
      return;
    }

    router.push({
      pathname: "/noticias/[id]",
      params: { article: JSON.stringify(article) },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Últimas Notícias</Title>
        <Button
          mode="text"
          icon="account-circle"
          onPress={() =>
            isLoggedIn ? router.push("/perfil") : router.push("../index")
          }
          textColor="#6a0dad"
        />
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

// css
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
    fontSize: 32,
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    lineHeight: 30,
    color: "#6a0dad",
  },
  mainDesc: {
    fontSize: 16,
    color: "#4a4a4a",
    lineHeight: 24,
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
