/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {TASKID_SCREEN} from '../../constants/screens';
import {tasksMockData} from '../../mock_data';
import SelectDropdown from 'react-native-select-dropdown';
import {CardColor, COLORS} from '../../styles/CommonStyle';
import {useNavigation} from '@react-navigation/native';
import {ListView} from '../../styles/ListViewStyle';

type Task = {
  id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    progress: string;
    publishedBy: string;
    category: string;
};

type Action = {
  name: string;
  label: string;
};

const actions: Action[] = [
  {name: 'image-outline', label: 'Site Note & Site Image'},
  {name: 'account-group-outline', label: 'Installers'},
  {name: 'calendar-plus', label: 'Add to Calendar'},
  {name: 'pencil-outline', label: 'Edit'},
];

const emojisWithIcons = [
  {
    value: 'taskName',
    title: 'Task Name',
    iconAsc: 'arrow-drop-down',
    iconDes: 'arrow-drop-up',
  },
  {
    value: 'description',
    title: 'Description',
    iconAsc: 'arrow-drop-down',
    iconDes: 'arrow-drop-up',
  },
  {
    value: 'startDate',
    title: 'Start Date',
    iconAsc: 'arrow-drop-down',
    iconDes: 'arrow-drop-up',
  },
  {
    value: 'endDate',
    title: 'End Date',
    iconAsc: 'arrow-drop-down',
    iconDes: 'arrow-drop-up',
  },
  {
    value: 'status',
    title: 'Status',
    iconAsc: 'arrow-drop-down',
    iconDes: 'arrow-drop-up',
  },
  {
    value: 'complete',
    title: 'Complete',
    iconAsc: 'arrow-drop-down',
    iconDes: 'arrow-drop-up',
  },
];

const TaskScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{title: string; type: string}>({
    title: '',
    type: '',
  });

  //  onRefreshing function
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };


  // notifications



  const toggleDropdown = (taskId: string) => {
    setOpenDropdown(prev => (prev === taskId ? null : taskId));
  };

  const closeDropdown = useCallback(() => {
    if (openDropdown) {
      setOpenDropdown(null);
    }
  }, [openDropdown]);

  const handleSearch = () => {
    const filteredTasks = tasksMockData.filter((task: any) =>
      Object.values(task).some((value: any) =>
        value.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setTasks(filteredTasks);
  };

  const handleSort = (title: string, sortType: string) => {
    if (title && sortType) {
      setSort({title, type: sortType});

      const sortedTasks = [...tasks].sort((a: any, b: any) => {
        if (sortType === 'asc') {
          return a[title].toString().localeCompare(b[title].toString());
        }
        return b[title].toString().localeCompare(a[title].toString());
      });

      setTasks(sortedTasks);
    }
  };

  useEffect(() => {
    if (search?.trim() === '') {setTasks(tasksMockData);}
  }, [search]);

  useEffect(() => {
    setTasks(tasksMockData);
  }, []);

  const renderItem = ({item}: {item: Task}) => (
    <TouchableWithoutFeedback onPress={(e)=>{e.preventDefault(); closeDropdown();}}>

    <View style={[ListView.card,{minHeight:170}]}>
      <View style={ListView.taskHeader}>
        <TouchableOpacity
          onPress={e => {
            e.preventDefault();
            navigate.navigate(TASKID_SCREEN as string, {id : item?.id});
          }}
          activeOpacity={0.7}>
          <Text style={ListView.taskName}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={ListView.iconButton}
          onPress={() => toggleDropdown(item.id.toString())}>
          <Icon name="dots-horizontal" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={[ListView.description , {paddingVertical:2}]}>
        {item.description.length < 80
          ? item.description
          : `${item.description.substring(0, 80)}...`}
      </Text>
      <Text style={[ListView.details , {paddingVertical:2}]}>
        {`${item.startDate} - ${item.endDate}`}
      </Text>
      <Text style={[ListView.details , {paddingVertical:2}]}>
        Status:{' '}
        <Text
          style={{
            color:
              CardColor?.[item.status?.split(' ')?.join('') ?? 'mutedGray'],
          }}>
          {item.status}
        </Text>{' '}
        | {item.progress} Complete
      </Text>
      <Text style={[ListView.details , {paddingVertical:2}]}>Published By: {item.publishedBy}</Text>

      {openDropdown === item.id.toString() && (
        <Pressable style={ListView.dropdown} onPress={closeDropdown}>
          <View>
            {actions?.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={ListView.actionButton}
                onPress={() => {
                  console.log(`Action: ${action.label} on Task: ${item.id}`);
                  closeDropdown();
                }}>
                <Icon name={action.name} size={18} color="#007AFF" />
                <Text style={ListView.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      )}
    </View>
    </TouchableWithoutFeedback>
  );

  return (
      <View style={ListView.container}>
      {/* <View>
        <FilterComponent screen={TASK_SCREEN} />
      </View> */}

      <View style={ListView.searchContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            flex: 4,
          }}>
          <SelectDropdown
            data={emojisWithIcons}
            onSelect={selectedItem => {
              console.log(selectedItem);
            }}
            renderButton={() => (
              <View>
                <Icon name="filter-variant" size={20} color="black" />
              </View>
            )}
            renderItem={item => (
              <View
                style={[
                  ListView.actionButton,
                  {
                    ...(item?.title === sort.title && {
                      backgroundColor: '#e1e1e1',
                    }),
                    padding: 10,
                  },
                ]}>
                <Text style={{width: 90}}>{item.title}</Text>
                <View style={ListView.sortIcons}>
                  <TouchableOpacity
                    onPress={() => handleSort(item.value, 'asc')}>
                    <IconM
                      name={item.iconAsc}
                      size={20}
                      color={
                        item?.value === sort.title && sort.type === 'asc'
                          ? COLORS.primary
                          : COLORS.dark
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSort(item.value, 'des')}>
                    <IconM
                      name={item.iconDes}
                      size={20}
                      color={
                        item?.value === sort.title && sort.type === 'des'
                          ? COLORS.primary
                          : COLORS.dark
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            dropdownStyle={{width: 160, padding: 10}}
          />
          <Text>Task List ({tasks.length})</Text>
        </View>

        <View style={[ListView.input, {flex: 6}]}>
          <TextInput
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={setSearch}
            value={search}
            placeholder="Search..."
            placeholderTextColor={'lightgray'}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={ListView.searchIcon}
            activeOpacity={0.7}>
            <IconM name="search" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 80}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>


  );
};

export default TaskScreen;
