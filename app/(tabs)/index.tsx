import { Image, StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import Card from '../../components/card';
import CameraComponent from '@/components/cameraComponent';

type CardData = {
  id: string;
  title: string;
  description: string;
};

export default function HomeScreen() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handlePictureTaken = (uri: string) => {
    setCapturedImage(uri);
  };
  const addCard = (title: string, description: string) => {
    const newCard = { id: Math.random().toString(), title, description };
    setCards(prevCards => [...prevCards, newCard]);
  };

  const updateCard = (id: string, title: string, description: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { id, title, description } : card,
      ),
    );
  };

  const deleteCard = (id: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };
  

  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6b6b6b', dark: '#6b6b6b' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.webp')}
          style={styles.logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <CameraComponent onPictureTaken={handlePictureTaken} />
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
      )}
      <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => addCard(title, description)}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
      {cards.map((card) => (
        <Card key={card.id} title={card.title} description={card.description} onDelete={deleteCard}/>
      ))}
    </View>
      <ThemedView style={styles.stepContainer}></ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 63,
    left: 45,
    bottom: -30,
    position: 'relative',
  },
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  button: {
    color: '#fff',
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  capturedImage:{
    width: '100%',
    height: 200,
  }
});
