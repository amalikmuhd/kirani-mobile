import AsyncStorage from '@react-native-async-storage/async-storage';

export const load = async (name: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch {
    return null;
    // error reading value
  }
};

export const save = async (key: string, value: unknown) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch {}
};
