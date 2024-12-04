/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { tasksMockData } from '../../../mock_data';
import { COLORS, commonStyles } from '../../../styles/CommonStyle';
import { openMap } from '../../../utils/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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
  priority: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

type RouteParams = {
  id: string;
  isDrawerOpen:boolean,
  setDrawerOpen:(val:any) => void
};

type Fields = Partial<Task>;

const GeneralScreen: React.FC<RouteParams> = ({id,isDrawerOpen ,setDrawerOpen}) => {
  const navigation = useNavigation();
  const [task, setTask] = useState<Task | null>(null);
  const [showEdit, setShowEdit] = useState<string>('');
  const [fields, setFields] = useState<Fields>({});

  // Fetch task data
  useEffect(() => {
    const taskDetails =
      tasksMockData.find((task: Task) => task.id === id) ?? null;
    setTask(taskDetails);
    setFields(taskDetails || {});
  }, [id]);

  // Set header options dynamically
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: task?.title ?? 'Task Detail',
      headerLeft:()=> <TouchableOpacity onPress={()=>setDrawerOpen((prev:any)=> !prev)}>{
        !isDrawerOpen ? <AntDesignIcon name="menu-unfold" style={styles.drawerIcon}/> :
        <AntDesignIcon name="menu-fold" style={styles.drawerIcon}/>
      }</TouchableOpacity>,
      headerStyle: {
        backgroundColor: COLORS.primary,
        height: 50,
        elevation: 0,
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
  }, [task, navigation, setDrawerOpen, isDrawerOpen]);

  // Date change handler
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (
      event?.type === 'dismissed' ||
      fields?.[showEdit]?.split('T')[0] ===
        selectedDate?.toISOString()?.split('T')[0]
    ) {
      setShowEdit('');
    } else if (selectedDate) {
      const formattedDate = selectedDate?.toISOString();
      setFields((prev) => ({
        ...prev,
        [showEdit]: formattedDate,
      }));
    }
  };

  // TextInput change handler
  const handleInputChange = (key: keyof Task, value: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={[{ fontSize: 14, paddingTop: 20,color:COLORS.primary,fontWeight:'600' }]}>
        {task.description}{' '}
        <Text style={{ color: 'black', fontSize: 14 }}> ( {task.id} )</Text>
      </Text>

      <View style={{ paddingBottom:20}}>
        {/* Start Date */}
        <FieldWithDatePicker
          label="Start"
          value={fields.startDate}
          fieldKey="startDate"
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleDateChange={handleDateChange}
        />

        {/* End Date */}
        <FieldWithDatePicker
          label="End"
          value={fields.endDate}
          fieldKey="endDate"
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleDateChange={handleDateChange}
        />

        {/* Status */}
        <EditableTextInput
          label="Status"
          value={fields.status}
          fieldKey="status"
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleInputChange={handleInputChange}
        />

        {/* Progress */}
        <EditableTextInput
          label="Completed(%)"
          value={fields.progress}
          fieldKey="progress"
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleInputChange={handleInputChange}
        />

        {/* Published By */}
        <View style={styles.row}>
          <Text style={styles.detailsLabel}>Published By</Text>
          <Text style={[styles.detailsValue,{ backgroundColor: '#1111',padding:15}]}>{fields.publishedBy}</Text>
        </View>

        {/* Contact */}
        <View style={styles.row}>
          <Text style={styles.detailsLabel}>Contact</Text>
          <View style={[styles.detailsValue,{ backgroundColor: '#1111',padding:15}]}>
            <Text>{fields.contact}, </Text>
            <Text>{fields.email}, </Text>
            <Text>{fields.phone}</Text>
          </View>
        </View>

        {/* Address */}
        <View style={styles.row}>
          <View style={commonStyles.flex}>
          <Text style={styles.detailsLabel}>Address</Text>
          <TouchableOpacity style={{transform:[{translateX:-20}]}} onPress={() =>openMap(task?.address)}>
            <Icon name="map" size={20} color="green" />
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.detailsValue, styles.border,{ backgroundColor: '#1111',padding:15}]}
            activeOpacity={0.7}>
            <Text >{fields.address}</Text>
          </TouchableOpacity>
        </View>

        {/* Notes */}
        <EditableTextInput
          label="Notes"
          value={fields.notes}
          fieldKey="notes"
          multiline={true}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleInputChange={handleInputChange}
        />
      </View>
    </ScrollView>
  );
};

// Common component for EditableTextInput
const EditableTextInput = ({
  label,
  value,
  fieldKey,
  showEdit,
  setShowEdit,
  handleInputChange,
  multiline = false,
  style,
}: {
  label: string;
  value: string | undefined;
  fieldKey: string;
  showEdit: string;
  setShowEdit: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (key: keyof Task, value: string) => void;
  multiline?: boolean;
  style?:object
}) => (
  <View style={[styles.row]}>
    <Text style={styles.detailsLabel}>{label}</Text>
    <TouchableOpacity
      style={[
        styles.detailsValue,
        commonStyles.flex,
        {
          backgroundColor: 'white',
          borderWidth: showEdit === fieldKey ? 0.6 : 0,
          borderColor: showEdit === fieldKey ? COLORS.primary : 'white' ,
          paddingHorizontal:15,
          borderRadius:5,
        },
      ]}
      onPress={() => setShowEdit(fieldKey)}
      activeOpacity={0.6}>
      <TextInput
        style={[styles.Inputbox,style]}
        value={value}
        multiline={multiline}
        onChangeText={(text) => handleInputChange(fieldKey as keyof Task, text)}
        editable={showEdit === fieldKey}
      />
      {showEdit === fieldKey && (
        <View style={[styles.actionIcons,{transform:[{translateX:-20}]}]}>
          <TouchableOpacity onPress={() => setShowEdit('')}>
            <Icon name="check" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEdit('')}>
            <Icon name="close" size={20} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

// Common component for DatePicker fields
const FieldWithDatePicker = ({
  label,
  value,
  fieldKey,
  showEdit,
  setShowEdit,
  handleDateChange,
}: {
  label: string;
  value: string | undefined;
  fieldKey: string;
  showEdit: string;
  setShowEdit: React.Dispatch<React.SetStateAction<string>>;
  handleDateChange: (event: any, selectedDate?: Date) => void;
}) => (
  <View style={styles.row}>
    <Text style={styles.detailsLabel}>{label}</Text>
    <TouchableOpacity
      style={[
        styles.detailsValue,
        styles.border,
        commonStyles.flex,
        {
          backgroundColor: 'white',
          borderWidth: showEdit === fieldKey ? 0.6  : 0,
          borderColor: showEdit === fieldKey ? COLORS.primary : 'white' ,
          borderRadius:5,
        },
      ]}
      onPress={() => setShowEdit(fieldKey)}
      activeOpacity={0.6}>
      <Text>{value || 'Select a date'}</Text>
      {showEdit === fieldKey && (
        <View style={styles.actionIcons}>
          <TouchableOpacity onPress={() => setShowEdit('')}>
            <Icon name="close" size={20} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEdit('')}>
            <Icon name="check" size={20} color="green" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
    {showEdit === fieldKey && (
      <DateTimePicker
        mode="date"
        display="calendar"
        value={new Date(value || Date.now())}
        onChange={handleDateChange}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 15,
  },
  detailsLabel: {
    fontWeight: 'bold',
    marginBottom:5,
    color:'#555555',
  },
  detailsValue: {
    color:'#555555',
    padding: 5,

  },
  border: {
    padding: 15,
    borderRadius: 5,
  },
  Inputbox: {
    width: '100%',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap:5,
  },
  drawerIcon:{
    color:'white',
    fontSize:20,
    marginHorizontal:10,
  }
});

export default GeneralScreen;
