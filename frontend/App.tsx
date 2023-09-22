import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import AccountScreen from "./screens/Account/AccountScreen";
import AdminDashboardScreen from "./screens/AdminDashboard/AdminDashboardScreen";
import HistoryScreen from "./screens/History/HistoryScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import ManualLogAddScreen from "./screens/ManualLogAdd/ManualLogAddScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import StatisticsScreen from "./screens/Statistics/StatisticsScreen";

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={LoginScreen} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen} />
          <Stack.Screen
            name="Account"
            component={AccountScreen} />
          <Stack.Screen
            name="History"
            component={HistoryScreen} />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen} />
          <Stack.Screen
            name="ManualLogAdd"
            component={ManualLogAddScreen} />
          <Stack.Screen
            name="Statistics"
            component={StatisticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;