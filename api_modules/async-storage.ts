import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeFavorites = async (favorites: string[]) => {
  try {
    await AsyncStorage.setItem('@favorites', JSON.stringify(favorites))
  } catch (e) {
    console.error('Error saving favorites', e)
  }
}

export const getFavorites = async () => {
  try {
    const value = await AsyncStorage.getItem('@favorites')
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (e) {
    console.error('Error getting favorites', e)
  }
}
