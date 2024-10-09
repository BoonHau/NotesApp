# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Runtime Environment and SDK Versions

- **Node.js**: >= 18

### SDK Versions

- **React Native**: 0.75.4
- **React**: 18.3.1
- **TypeScript**: 5.0.4

### Development Tools

- **Yarn**: 3.6.4
- **Jest**: 29.6.3
- **ESLint**: 8.19.0
- **Prettier**: 2.8.8

### Dependencies

- **@react-navigation/native**: 6.1.18
- **@react-navigation/stack**: 6.4.1
- **@reduxjs/toolkit**: 2.2.7
- **react-redux**: 9.1.2
- **immer**: 10.1.1
- **react-native-gesture-handler**: 2.20.0
- **react-native-reanimated**: 3.15.4
- **react-native-sqlite-storage**: 6.0.1
- **react-native-vector-icons**: 10.2.0
