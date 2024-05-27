import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import currentEnvironment from '@/constants/environment';
import { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { useColorScheme } from 'react-native';
import UserCard from '@/components/userCard';

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
    medium: string;
  };
};

const colorScheme = useColorScheme();
const textColor = colorScheme === 'light' ? 'black' : 'white';

export default function TabTwoScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsers = async (page: number, genderToGet: string) => {
    setIsLoading(true);
    try {
      const result = await fetch(
        `${currentEnvironment.api.baseUrl}?results=5&gender=${String(genderToGet)}&page=${String(page)}`,
      );
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await result.json();
      const usersResults = data.results as User[]; // Change this line
      setUsers(oldUsers =>
        page === 1 ? usersResults : [...oldUsers, ...usersResults],
      );
    } catch (error) {
      console.error('Fetch Error: ', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    void (async () => {
      getUsers(pageToGet, gender);
      console.log(users);
    })();
  }, [pageToGet, gender]);

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
        <ThemedText type="title">Users</ThemedText>
      </ThemedView>
      {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : (
        <>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Checkbox
              value={gender === 'female'}
              onValueChange={() => {
                setGender('female');
                setUsers([]);
              }}
              color={gender === 'female' ? '#4630EB' : undefined}
            />
            <ThemedText>Female</ThemedText>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Checkbox
              value={gender === 'male'}
              onValueChange={() => {
                setGender('male');
                setUsers([]);
              }}
              color={gender === 'male' ? '#4630EB' : undefined}
            />
            <ThemedText>Male</ThemedText>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Checkbox
              value={gender === ''}
              onValueChange={() => {
                setGender('');
                setUsers([]);
              }}
              color={gender === '' ? '#4630EB' : undefined}
            />
            <ThemedText>All</ThemedText>
          </View>
          {users.length > 0
            ? users.map((user: User) => (
                <UserCard
                  key={user.login.uuid}
                  user={user}
                  textColor={textColor}
                />
              ))
            : null}
          <TouchableOpacity
            style={styles.loadMore}
            onPress={() => {
              setPageToGet(v => v + 1);
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Load More
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 63,
    left: 45,
    bottom: -30,
    position: 'relative',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  loadMore: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 6,
  },
});

// 1. The logo spills out of its designated area.
// 2. TEC theme is not displayed on the header bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change checkbox.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card
// 10.Use the phone camera to take a picture and show it to the home screen.
