import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function NewsDetail() {
  const { article } = useLocalSearchParams();
  const news = JSON.parse(article);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.author}>{news.author}</Text>
      <Text style={styles.content}>{news.content || news.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  author: { fontStyle: "italic", marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 22 }
});
