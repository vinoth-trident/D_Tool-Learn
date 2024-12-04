/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon2 from 'react-native-vector-icons/MaterialIcons';
import {
  CALENDAR_STACK,
  DASHBOARD_STACK,
  INSTALLER_STACK,
  SERVICE_STACK,
  SETUP_STACK,
  TASK_STACK,
} from '../constants/screens';
import { COLORS } from '../styles/CommonStyle';
import { CalendarStack, InstallerStack, ServiceStack, TaskStack } from './ProtectedNavigation';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';

const Tab = createBottomTabNavigator();

type MyTabBarProps = {
  state: BottomTabBarProps['state'];
  descriptors: BottomTabBarProps['descriptors'];
  navigation: BottomTabBarProps['navigation'];
};

// Custom Tab Bar
const MyTabBar = ({ state, descriptors, navigation }: MyTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const iconName =
          label === DASHBOARD_STACK
            ? 'view-dashboard'
            : label === CALENDAR_STACK
            ? 'calendar-month'
            : label === TASK_STACK
            ? 'task'
            : label === SERVICE_STACK
            ? 'home-repair-service'
            : label === INSTALLER_STACK
            ? 'people'
            : label === SETUP_STACK
            ? 'app-settings-alt'
            : '';

        const IconComponent = label === DASHBOARD_STACK ? MIcon : MIcon2;
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.reset({
            index: 0,
            routes: [{ name: route.name }],
          });
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
          >
            <IconComponent
              name={iconName}
              size={24}
              color={isFocused ? COLORS.primary : COLORS.dark}
            />
            <Text style={{ color: isFocused ? COLORS.primary : COLORS.dark, fontSize: 10 }}>
              {label?.split('_')?.[0] || ''}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

// Lazy loaded components wrapped in Suspense
const DashboardComponent = () => (
  <Suspense fallback={<LoadingFallback />}>
    <DashboardScreen />
  </Suspense>
);

const SetupComponent = () => (
  <Suspense fallback={<LoadingFallback />}>
    <></>
  </Suspense>
);

const BottomTabNavigation = () => {
  return (
    <>

      <Tab.Navigator
        initialRouteName={DASHBOARD_STACK}
        screenOptions={({route})=>({
          headerShown: true,
          headerTitle:'Mobile Install',
          headerStyle:{
            backgroundColor:COLORS.primary,
            elevation:0,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color:'white',
          },
          tabBarPosition:'bottom',
          headerLeft: () => {
            console.log(route.name);
            return <Image source={require('../assets/images/dtools_logo.jpg')} style={styles.logo} />
            return(
            route.name !== TASK_STACK  ? <MIcon2 name="arrow-back" size={24} color={'white'} style={{marginHorizontal:10}} /> 
            : <Image source={require('../assets/images/dtools_logo.jpg')} style={styles.logo} />
          )}
        })}
        tabBar={(props: React.JSX.IntrinsicAttributes & MyTabBarProps) => <MyTabBar {...props} />}
      >
        <Tab.Screen name={DASHBOARD_STACK} component={DashboardComponent} />
        <Tab.Screen name={CALENDAR_STACK} component={CalendarStack} />
        <Tab.Screen name={TASK_STACK} component={TaskStack} />
        <Tab.Screen name={SERVICE_STACK} component={ServiceStack} />
        <Tab.Screen name={INSTALLER_STACK} component={InstallerStack} />
        <Tab.Screen name={SETUP_STACK} component={SetupComponent} />
      </Tab.Navigator>
    </>
  );
};

// Fallback loading component for lazy loading
const LoadingFallback = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={COLORS.primary} />
    <Text>Loading...</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: COLORS.light,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tabItem: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  logo: {
    width: 45,
    height: 45,
  },
});

export default BottomTabNavigation;
