/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskScreen from '../screens/Tasks/TaskScreen';
import {  CALENDAR_SCREEN, INSTALLER_SCREEN, SERVICE_SCREEN, TASK_SCREEN, TASKID_SCREEN } from '../constants/screens';
import TaskDetailScreen from '../screens/Tasks/TaskDetailScreen';
import ServiceScreen from '../screens/Service/ServiceScreen';
import InstallerScreen from '../screens/Installer/InstallerScreen';
import MyBigCalendar from '../screens/Calendar/Calendar';


const Stack = createStackNavigator();


/* ------------------------- TASK STACK ------------------------------------- */

export function CalendarStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName={CALENDAR_SCREEN}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFF',
          height:50,
          padding: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          padding:0,
        },
        headerTitle: '',
      }}
      >
      <Stack.Screen options={{
        headerShown:false,
      }} name={CALENDAR_SCREEN} component={MyBigCalendar} />
    </Stack.Navigator>
  );
}



/* ------------------------- TASK STACK ------------------------------------- */

export function TaskStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName={TASK_SCREEN}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFF',
          height:50,
          padding: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          padding:0,
        },
      }}
      >
      <Stack.Screen options={{
        headerShown:false,
      }} name={TASK_SCREEN} component={TaskScreen}   />
      <Stack.Screen options={{
        headerLeft: () => null,
      }} name={TASKID_SCREEN} component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}


/* ------------------------- SERVICE ORDERS STACK ------------------------------------- */

export function ServiceStack(): JSX.Element {
    return (
      <Stack.Navigator
        initialRouteName={SERVICE_SCREEN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SERVICE_SCREEN} component={ServiceScreen} />
      </Stack.Navigator>
    );
  }


/* ------------------------- INSTALLERS STACK ------------------------------------- */

  export function InstallerStack(): JSX.Element {
    return (
      <Stack.Navigator
        initialRouteName={INSTALLER_SCREEN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={INSTALLER_SCREEN} component={InstallerScreen} />
      </Stack.Navigator>
    );
  }
