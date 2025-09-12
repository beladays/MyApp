import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, Paragraph, Text, Title, } from "react-native-paper";

export default function ListaNoticias() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=87325e4de6b549b88d135dd420c62349`
    )
  .then((res) => res.json())
      .then((data) => setArticles(data.articles || []));
  }, 
  []);

  if (articles.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
    <Text style={{ marginTop: 10 }}>Carregando notícias...</Text>
      </View>
    );
  }

  const principal = articles[0];
  const outras = articles.slice(1);

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Últimas Notícias</Title>


      <Card
        style={styles.mainCard}
        onPress={() =>
          router.push({
          pathname: "/noticias/[id]",
            params: { id: 0, article: JSON.stringify(principal) },
          })
        }
      >
        {principal.urlToImage && (
          <Card.Cover source={{ uri: principal.urlToImage }} />
        )}
        <Card.Content>
          <Title style={styles.mainHeadline}>{principal.title}</Title>
          <Paragraph numberOfLines={3} style={styles.mainDesc}> {principal.description}
          </Paragraph>
        </Card.Content>
      </Card>

      <FlatList
        data={outras}
        keyExtractor={(item, index) => (index + 1).toString()}
        renderItem={({ item, index }) => (
          <Card
            style={styles.smallCard}
            onPress={() =>
              router.push({
                pathname: "/noticias/[id]", params: { id: index + 1, article: JSON.stringify(item) },
              })
            }
          >
            {item.urlToImage && (
              <Card.Cover source={{ uri: item.urlToImage }} style={styles.smallThumb} />
            )}
            <Card.Content style={styles.smallContent}>
              <Title numberOfLines={2} style={styles.smallHeadline}>
                {item.title}
              </Title>
              <Paragraph numberOfLines={2} style={styles.smallDesc}>
                {item.description}
              </Paragraph>
              <Button
                compact
                mode="text"
                labelStyle={styles.leiaMais}
                onPress={() =>
                  router.push({
                    pathname: "/noticias/[id]",
                    params: { id: index + 1, article: JSON.stringify(item) },
                  })
                }
              >
                
                
                Leia mais...


              </Button>
            </Card.Content>
          </Card>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#f9f9f9" },
  title: {fontSize: 26,fontWeight: "bold",
    marginBottom: 14,textAlign: "center",color: "#222",
  },

//princ
  mainCard: { marginBottom: 20 },
  mainHeadline: { fontSize: 20, fontWeight: "bold", marginTop: 8,lineHeight: 26, 
    color: "#111",
  },
  mainDesc: { 
    fontSize: 15, color: "#444", 
    marginTop: 6,  lineHeight: 22,
  },

  // Noutras
  smallCard: {
    marginBottom: 14, borderRadius: 12,overflow: "hidden", backgroundColor: "#fff",
  },
  smallThumb: {
    height: 120,
    resizeMode: "cover",
  },
  smallContent: { paddingVertical: 8 },
  smallHeadline: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6, lineHeight: 22,color: "#222",
  },
  smallDesc: { 
    fontSize: 13, 
    color: "#666", lineHeight: 20, marginBottom: 6,
  },
  leiaMais: { 
    fontSize: 13,  color: "#1976D2", 
    fontWeight: "500",
    textTransform: "uppercase",letterSpacing: 0.5,
  }, 

  loading: {
    flex: 1, justifyContent: "center",
    alignItems: "center", marginTop: 50,
  },
});
