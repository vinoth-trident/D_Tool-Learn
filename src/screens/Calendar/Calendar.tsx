/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../styles/CommonStyle';
import { getRandomColor, Months } from '../../utils/utils';
import { useNavigation } from '@react-navigation/native';
import { TASK_STACK, TASKID_SCREEN } from '../../constants/screens';
import { tasksMockData } from '../../mock_data';

// Define the types for events
type EventType = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
};

export function MyBigCalendar() {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<string>('month');
  const [datas, setDatas] = useState<EventType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Memoized function for changing the calendar mode
  const handleChangeMode = useCallback((mode: string) => {
    setViewMode(mode);
  }, []);

  // Function to handle event clicks
  const handleEventPress = (event: EventType) => {
    navigation.navigate(TASK_STACK, {
      screen: TASKID_SCREEN,
      params: { id: event.id },
    });
  };

  // Date Picker Handlers
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  // Filter events by selected date
  const filterEventsBySelectedDate = useCallback(() => {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0); // Start of the selected day

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999); // End of the selected day

    const filteredEvents = tasksMockData
      ?.filter((item) => {
        const eventStart = new Date(item.startDate);
        const eventEnd = new Date(item.endDate);
        return (
          (eventStart >= startOfDay && eventStart <= endOfDay) || // Event starts within the selected day
          (eventEnd >= startOfDay && eventEnd <= endOfDay) || // Event ends within the selected day
          (eventStart <= startOfDay && eventEnd >= endOfDay) // Event spans across the selected day
        );
      })
      ?.map((item) => ({
        id: item.id,
        title: item.title,
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        color: getRandomColor(),
      }));

    setDatas(filteredEvents);
  }, [selectedDate]);

  // Update filtered events when selected date changes
  useEffect(() => {
    filterEventsBySelectedDate();
  }, [filterEventsBySelectedDate]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.dateField}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.8} style={styles.selectedDate}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 14 }}>
              {Months[selectedDate.getMonth()].long} {selectedDate.getFullYear()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(event, date) => handleStartDateChange(event, date)}
              style={styles.datePicker}
              maximumDate={new Date(2030, 11)} // Set a maximum date for year selection
              minimumDate={new Date(2020, 0)} // Set a minimum date for year selection
            />
          )}
        </View>

        {/* View Mode Buttons */}
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              {
                backgroundColor: viewMode === 'day' ? COLORS.primary : '#f1f1f1',
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
              },
            ]}
            onPress={() => handleChangeMode('day')}
          >
            <Text style={[styles.buttonText, { color: viewMode === 'day' ? '#fff' : '#000' }]}>Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: viewMode === 'week' ? COLORS.primary : '#f1f1f1' }]}
            onPress={() => handleChangeMode('week')}
          >
            <Text style={[styles.buttonText, { color: viewMode === 'week' ? '#fff' : '#000' }]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              {
                backgroundColor: viewMode === 'month' ? COLORS.primary : '#f1f1f1',
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
              },
            ]}
            onPress={() => handleChangeMode('month')}
          >
            <Text style={[styles.buttonText, { color: viewMode === 'month' ? '#fff' : '#000' }]}>Month</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar Component */}
      <Calendar
        events={datas}
        mode={viewMode}
        height={600}
        onPressEvent={handleEventPress}
        eventCellStyle={(col) => ({
          backgroundColor: col?.color,
          borderRadius: 3,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    width: 50,
    paddingVertical: 5,
    borderRadius: 0,
    borderWidth: 0.1,
    borderColor: '#865262',
  },
  buttonText: {
    color: '#000',
    fontSize: 13,
    textAlign: 'center',
  },
  dateField: {
    marginBottom: 20,
  },
  datePicker: {
    width: '100%',
  },
  selectedDate: {
    borderWidth: 0.2,
    borderColor: '#000',
    padding: 5,
    width: 130,
    borderRadius: 5,
  },
});

export default MyBigCalendar;
