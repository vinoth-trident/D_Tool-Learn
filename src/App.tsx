import React from 'react';
import LoginScreen from './screens/Auth/LoginScreen';
import DashboardScreen from './screens/Dashboard/DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProtectedParamsList } from './types/screens';
import { useIsLoggedIn } from './store/reducers/actions';
import { BOTTOM_TABS, LOGIN_SCREEN } from './constants/screens';
import BottomTabNavigation from './navigations/BottomTabs';

const Auth = createStackNavigator();
const ProtectedStack = createStackNavigator<ProtectedParamsList>();

export default function App(): JSX.Element {
  const isLogin = useIsLoggedIn();

  return (
    <NavigationContainer>
    {!isLogin ?
    <ProtectedStack.Navigator initialRouteName={BOTTOM_TABS}  screenOptions={() => {
      return {
        headerShown: false,
      };
    }}>
      <ProtectedStack.Screen name={BOTTOM_TABS} component={BottomTabNavigation} />
    </ProtectedStack.Navigator>
    :
    <Auth.Navigator
    initialRouteName={LOGIN_SCREEN}
    screenOptions={{ headerShown: false }}
  >
    <Auth.Screen name={LOGIN_SCREEN} component={LoginScreen} />
  </Auth.Navigator> }
  </NavigationContainer>
  );
}
