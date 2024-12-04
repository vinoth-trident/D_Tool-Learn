import React, { useEffect, useRef } from 'react';
import {  DrawerLayoutAndroid, StyleSheet, View } from 'react-native';
import TaskFilter from './filters/TaskFilter';
import { Text } from 'react-native';

type PropsType = {
  children?: React.ReactNode;
  componentName?: string;
  navigator?: any;
  setNavigator?: (data: any) => void;
  open?: boolean;
  setOpen?:(val:any)=> void
};

const SidebarDrawer: React.FC<PropsType> = ({
  children,
  componentName,
  navigator,
  setNavigator,
  open,
  setOpen
}) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const navigationView = () => {
    switch (componentName) {
      case 'task':
        return (
          <View style={styles.drawerContent}>
            <TaskFilter navigator={navigator} setNavigator={setNavigator} />
          </View>
        );
      default:
        return (
          <View style={styles.drawerContent}>
            <Text>No Component Selected</Text>
          </View>
        );
    }
  };

  useEffect(() => {
    if (open) {
      drawer.current?.openDrawer();
    } else {
      drawer.current?.closeDrawer();
    }
  }, [open]);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      onDrawerClose={()=>setOpen(false)}
      drawerPosition="left"
      renderNavigationView={navigationView}>
      {/* Main Content */}
      {children}
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});

export default SidebarDrawer;
