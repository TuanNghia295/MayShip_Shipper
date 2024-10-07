module.exports = {
  assets: ['./src/assets/fonts'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    ios: {
      assets: ['./src/assets/fonts'],
    },
    android: {},
  },
};