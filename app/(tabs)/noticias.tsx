import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function NewsList() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=87325e4de6b549b88d135dd420c62349`)
      .then(res => res.json())
      .then(data => setArticles(data.articles || []));
  }, []);

  if (articles.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>Carregando notícias...</Text>
      </View>
    );
  }

  const mainArticle = articles[0]; 
  const otherArticles = articles.slice(1);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Últimas Notícias</Text>

      
      <TouchableOpacity 
        style={styles.mainCard}
        onPress={() => router.push({ pathname: "/noticias/[id]", params: { id: 0, article: JSON.stringify(mainArticle) } })}
      >
        {mainArticle.urlToImage && (
          <Image source={{ uri: mainArticle.urlToImage }} style={styles.mainImage} />
        )}
        <Text style={styles.mainHeadline}>{mainArticle.title}</Text>
        <Text numberOfLines={3} style={styles.mainDesc}>{mainArticle.description}</Text>
      </TouchableOpacity>

    
      <FlatList
        data={otherArticles}
        keyExtractor={(item, index) => (index + 1).toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push({ pathname: "/noticias/[id]", params: { id: index + 1, article: JSON.stringify(item) } })}
          >
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.thumb} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.headline}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#f9f9f9" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 14, textAlign: "center" },

  // Noticia principal
  mainCard: { marginBottom: 20 },
  mainImage: { width: "100%", height: 200, borderRadius: 10 },
  mainHeadline: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  mainDesc: { fontSize: 14, color: "#555", marginTop: 4 },

  // Outras
  card: { flexDirection: "row", marginBottom: 12, backgroundColor: "#fff", borderRadius: 10, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  thumb: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  headline: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  desc: { fontSize: 12, color: "#555" },

  loading: { flex: 1, justifyContent: "center", alignItems: "center" }
});
