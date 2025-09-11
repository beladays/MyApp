import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function NewsList() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=87325e4de6b549b88d135dd420c62349`)
      .then(res => res.json())
      .then(data => setArticles(data.articles || []));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimas Notícias</Text>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push({ pathname: "/noticias/[id]", params: { id: index, article: JSON.stringify(item) } })}
          >
            <Text style={styles.headline}>{item.title}</Text>
            <Text numberOfLines={2}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, marginBottom: 10, textAlign: "center" },
  card: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  headline: { fontWeight: "bold" }
});
