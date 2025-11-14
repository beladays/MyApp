import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Title, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function Favorites() {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const fetchFavoritos = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/favoritos/${userId}`);
      setFavoritos(res.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao carregar favoritos');
    }
  };

  // Carrega userId
  React.useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) setUserId(Number(id));
    };
    loadUser();
  }, []);

  // Atualiza favoritos toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchFavoritos();
    }, [userId])
  );
//remover favs
  const removerFavorito = async (favoritoId: number) => {
    try {
      await api.delete(`/favoritos/${favoritoId}`);
      fetchFavoritos(); // atualiza a lista após remoção
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao remover favorito');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Favoritos</Title>

      {favoritos.length === 0 ? (
        <Text>Nenhum favorito ainda.</Text>
      ) : (
        favoritos.map(f => (
          <Card key={f.id} style={styles.card}>
            <Card.Content>
              <Title>{f.noticia.titulo}</Title>
              <Text>{f.noticia.descricao}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="heart"
                iconColor="#e91e63"
                size={24}
                onPress={() => removerFavorito(f.id)}
              />
            </Card.Actions>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { marginBottom: 15, backgroundColor: '#fff' },
});
