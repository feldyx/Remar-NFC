import { Preferences } from "@capacitor/preferences";

// Writing data to preferences
export async function writeDataToPreferences(key, value) {
    await Preferences.set({
      key: key,
      value: value
    });
  }
  
  // Reading data from preferences
export async function readDataFromPreferences(key) {
    const { value } = await Preferences.get({ key: key });
    return value;
  }

// Delete all data from preferences
export async function deleteAllDataFromPreferences() {
  await Preferences.clear();
}

// Delete a certain key from preferences
export async function deleteDataFromPreferences(key) {
  await Preferences.remove({ key: key });
}

export async function readAllDataFromPreferences() {
  const { keys } = await Preferences.keys();
  const values = await Promise.all(keys.map(async (key) => {
    const { value } = await Preferences.get({ key: key });
    return { key: key, value: value };
  }));
  return { keys: keys, values: values };
}
