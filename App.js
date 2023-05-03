import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Root from './nagivation/root';
import { JWTProvider } from './JWTContext';

export default function App() {
  return (
    <JWTProvider>
      <View style={styles.container}>
        <Root />
        <StatusBar style="auto" />
      </View>
    </JWTProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
