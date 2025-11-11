import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Title, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { useState } from "react";

export default function NewsDetail() {
  const { article } = useLocalSearchParams();
  const news = JSON.parse(article);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) {
        alert("Você precisa estar logado para favoritar!");
        return;
      }

      if (isFavorite) {
        // remove favorito
        await api.delete(`/favoritos/${news.id}`);
        setIsFavorite(false);
      } else {
        // adiciona favorito
        await api.post("/favoritos", {
          usuarioId: Number(userId),
          noticiaId: news.id,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>{news.title}</Title>
        <IconButton
          icon={isFavorite ? "heart" : "heart-outline"}
          iconColor="#6a0dad"
          size={28}
          onPress={handleFavorite}
        />
      </View>

      <Text style={styles.author}>{news.author}</Text>
      <Text style={styles.content}>{news.content || news.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, flex: 1 },
  author: { fontStyle: "italic", marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 22 },
});
