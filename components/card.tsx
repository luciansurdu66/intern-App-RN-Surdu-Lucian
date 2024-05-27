import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface CardProps {
  title: string;
  description: string;
  onDelete: (key: string) => void; 
  key: string; 
}

const Card: React.FC<CardProps> = ({ title, description, onDelete, key }) => {
  const [showDelete, setShowDelete] = useState(false); 
  const handleDelete = () => {
    onDelete(key); 
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPressIn={() => setShowDelete(true)}
        onPress={handleDelete}
      >
        {showDelete && <Image source={require('@/assets/images/deleteIcon.jpg')} style={styles.deleteIcon} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    flexDirection: 'row', 
  },
  cardContent: {
    flex: 1, 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
  },
  deleteButton: {
    padding: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
});

export default Card;
