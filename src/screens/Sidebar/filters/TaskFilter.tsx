/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon library
import { COLORS } from '../../../styles/CommonStyle';


type PropsType = {
    navigator: any;
    setNavigator: (data:any) => void;
  };
const TaskFilter : React.FC<PropsType> = ({navigator,setNavigator}) => {

  const sidebarList = [
    { name: 'General', icon: 'account-cog' },
    { name: 'Items', icon: 'clipboard-list', count: 10 },
    { name: 'Repair Items', icon: 'wrench', count: 9 },
    { name: 'Site Items', icon: 'home-city', count: 7 },
    { name: 'Site Notes', icon: 'note', count: 4 },
    { name: 'Site Images', icon: 'image', count: 14 },
    { name: 'Check List', icon: 'check-circle' },
    { name: 'Custom Fields', icon: 'text-box' },
    { name: 'Approve', icon: 'check-all' },
    { name: 'Installers', icon: 'account-group', count: 12 },
    { name: 'Time Sheets', icon: 'calendar-clock', count: 5 },
    { name: 'Documents', icon: 'folder', count: 3 },
    { name: 'Analysis', icon: 'chart-line' },
  ];

  return (
    <FlatList
      data={sidebarList}
      contentContainerStyle={{ padding: 5 }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setNavigator(item?.name)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding:5,
            borderRadius: 4,
            gap: 8,
            marginVertical: 4,
            backgroundColor: navigator === item?.name ? COLORS.primary : 'white',
          }}
        >
          <Icon
            name={item.icon}
            size={24}
            color={navigator === item?.name ? 'white' : 'black'}
          />
          <Text style={{ color: navigator === item?.name ? 'white' : 'black' }}>
            {item?.name} {item?.count && `(${item?.count})`}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default TaskFilter;
