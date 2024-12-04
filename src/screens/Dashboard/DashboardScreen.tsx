import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Cardbox from '../../components/Cardbox';
import {CardColor, COLORS} from '../../styles/CommonStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterComponent from '../../components/FilterComponent';
import {DASHBOARD_SCREEN} from '../../constants/screens';
import SidebarDrawer from '../Sidebar/SidebarDrawer';

// Dummy data for the grid
const data = [
  {id: '1', title: 'All', value: 10},
  {id: '2', title: 'Not Started', value: 20},
  {id: '3', title: 'In Progress', value: 30},
  {id: '4', title: 'Completed', value: 40},
  {id: '5', title: 'Overdue', value: 50},
];

const DashboardScreen = () => {
  const colors = Object.values(CardColor)?.map(color => color);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <View>
        <FilterComponent screen={DASHBOARD_SCREEN} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}>
        <View>
          {/* Header Section */}
          <View style={styles.header}>
            <Icon name="clipboard-check" size={20} color={COLORS.primary} />
            <Text style={styles.headerTitle}>Tasks</Text>
          </View>

          {/* FlatList Section */}
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={({item, index}) => (
              <Cardbox
                title={item.title}
                value={item.value}
                bgColor={colors[index]}
              />
            )}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        </View>

        <View style={{marginTop: 20}}>
          {/* Header Section */}
          <View style={styles.header}>
            <Icon name="coffee-maker-check" size={20} color={COLORS.primary} />
            <Text style={styles.headerTitle}>Service Orders</Text>
          </View>

          {/* FlatList Section */}
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={({item, index}) => (
              <Cardbox
                title={item.title}
                value={item.value}
                bgColor={colors[index]}
              />
            )}
            columnWrapperStyle={styles.row}
            scrollEnabled={false} // Disable FlatList scrolling since it's wrapped in ScrollView
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // Optional background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5, // Adds spacing between the icon and text
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    gap: '3%',
    marginBottom: 10,
  },
});

export default DashboardScreen;
