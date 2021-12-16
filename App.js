import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/Focus';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {

  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status }
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    console.log("save history")
    try {
      // await AsyncStorage.setItem('focusHistory', );
      await AsyncStorage.setItem(
        '@focusHistory',
        JSON.stringify(focusHistory)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      console.log("load history")
      const history = await AsyncStorage.getItem('@focusHistory');

      // const value = await AsyncStorage.getItem('TASKS');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }

    } catch (e) {
      console.log(e);
    }
  }



  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);


  return (
    <View style={styles.container}>

      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      )
        : (
          <View style={{ flex: 1 }}>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={onClear} />
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
