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
    <View style={styles.header}>
      <Title style={styles.title}>Últimas Notícias</Title>
      <Button
        mode="text"
        icon="account-circle"
        onPress={() => router.push("/")}
        color="#6a0dad"
      />
    </View>

    <Card
      style={styles.mainCard}
      onPress={() =>
        router.push({
          pathname: "/noticias/[id]",
          params: { id: 0, article: JSON.stringify(principal) },
        })
      }
    >
      {principal.urlToImage && <Card.Cover source={{ uri: principal.urlToImage }} />}
      <Card.Content>
        <Title style={styles.mainHeadline}>{principal.title}</Title>
        <Paragraph numberOfLines={3} style={styles.mainDesc}>
          {principal.description}
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
              pathname: "/noticias/[id]",
              params: { id: index + 1, article: JSON.stringify(item) },
            })
          }
        >
          <View style={styles.smallCardContent}>
            {item.urlToImage && (
              <Card.Cover source={{ uri: item.urlToImage }} style={styles.smallThumb} />
            )}
            <View style={styles.smallTextContent}>
              <Title numberOfLines={2} style={styles.smallHeadline}>
                {item.title}
              </Title>
              <Paragraph numberOfLines={2} style={styles.smallDesc}>
                {item.description}
              </Paragraph>
            </View>
          </View>
        </Card>
      )}
    />
  </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, 
    backgroundColor: "#f9f6ff", // roxo claro
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
  
  // Principal
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

  // Outras
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