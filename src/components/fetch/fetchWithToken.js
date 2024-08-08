import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchWithToken = async (url, options = {}) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    return fetch(url, {
        ...options,
        headers,
    });
};

export default fetchWithToken;