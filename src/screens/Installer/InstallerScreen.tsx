import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListView } from '../../styles/ListViewStyle';
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from '../../styles/CommonStyle';
import { InstallerMockData } from '../../mock_data';

interface User {
  name: string;
  email: string;
  mobile: string;
  role: string;
  editActualHrsOnAllResources: string;
  inactive: string;
}


const InstallerScreen: React.FC = (): JSX.Element => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000);
  }

  const renderItem = ({ item }: { item: User }) => (
    <View style={ListView.card}>
      <View style={{flexDirection:'row',gap:5,justifyContent:'space-between'}}>
        <View>
       
        <Text style={[ListView.taskName,]}>{item.name}</Text>
        </View>
        <View style={{flexDirection:'row',gap:5,}}>
          <TouchableOpacity
            style={[ListView.actionButton,{paddingVertical:10,paddingHorizontal:5}]}
          // onPress={() => {
          //   console.log(`Action: ${action.label} on Task: ${item.id}`);
          //   closeDropdown();
          // }}
          >
            <Icon name={"email"} size={18} color={true? "#A1A1A1" :"#E5E5E5"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[ListView.actionButton,{paddingVertical:10,paddingHorizontal:5}]}
          // onPress={() => {
          //   console.log(`Action: ${action.label} on Task: ${item.id}`);
          //   closeDropdown();
          // }}
          >
            <Icon name={"edit"} size={18} color={true? "#A1A1A1" :"#E5E5E5"} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={ListView.description} >Email: {item.email}</Text>
      <Text style={ListView.details} >Mobile: {item.mobile}</Text>
      <Text style={ListView.details} >Role: {item.role}</Text>
      <Text style={ListView.details} >Edit Hrs: {item.editActualHrsOnAllResources}</Text>
      <Text style={ListView.details} >Inactive: {item.inactive}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={{backgroundColor:COLORS.primary,flexDirection:'row',alignItems:'center',marginBottom:10,gap:5,width:100,padding:5,borderRadius:7}}>
        <AntDesign name='export' size={17} color='white' />
        <Text style={{color:'white'}}>Export Time </Text>
      </TouchableOpacity>
      <FlatList
        data={InstallerMockData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default InstallerScreen;
