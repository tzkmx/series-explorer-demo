import { View, ScrollView, Button } from "react-native"
import { styles } from "./styles"

export function HomeScreen ( { navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={{ backgroundColor: 'red', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'blue', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'green', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'yellow', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'orange', width: 200, height: 100 }} />
      </ScrollView>
      <ScrollView>
        <View style={{ backgroundColor: 'red', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'blue', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'green', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'yellow', width: 200, height: 100 }} />
        <View style={{ backgroundColor: 'orange', width: 200, height: 100 }} />
      </ScrollView>
    </View>
  );
}

export function TabHeader ({ onPress }) {
  return (
      <Button
        title="Logout"
        onPress={onPress}
      />
  );
}

