// UserCard.tsx
import React from 'react';
import { View, Image } from 'react-native';
import {ThemedText} from './ThemedText';

const Photo = ({ url }: { url: string }) => (
    <Image
      source={{ uri: url }}
      style={{ width: 40, height: 50 }}
    />
  );

type Gender = 'female' | 'male' | '';


type User = {
    gender: Gender;
    login: {
      uuid: string;
    };
    name: {
      first: string;
      last: string;
    };
    picture: {
      thumbnail: string;
      large: string;
      medium:  string;
    };
  };

interface UserCardProps {
  user: User;
  textColor: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, textColor }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginVertical: 5, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
    <Photo url={user.picture.thumbnail} />
    <View style={{ marginLeft: 10 }}>
      <ThemedText style={{ color: textColor, fontSize: 18 }}>
        {user.name.first} {user.name.last}
      </ThemedText>
      <ThemedText style={{ color: textColor }}>
        {user.gender}
      </ThemedText>
    </View>
  </View>
);

export default UserCard;