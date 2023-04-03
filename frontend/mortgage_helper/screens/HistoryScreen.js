import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {getApplicationsByCid, getApplicationsByBroker} from '../api/application';
import HistoryList from '../components/HistoryList';
import Avatar from '../components/Avatar';
import {useUserContext} from '../contexts/UserContext';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

function HistoryScreen({navigation}) {
  const {user} = useUserContext();
  const hasData = user !== null;
  const firstName = hasData ? user.firstName : '';
  const cid = user._id;
  const isFocused = useIsFocused();
  const [applications, setApplications] = useState([]);

  const fetchAllApplications = async () => {
    if (hasData) {
      const result = user.type == "Broker" ? await getApplicationsByBroker(user._id) : await getApplicationsByCid(user._id)
      console.log("result -> ", result);
      setApplications(result.applications);
    }
  };

  useEffect(() => {
    fetchAllApplications();
    navigation.setOptions({
      title: `Welcome ${firstName}`,
      headerStyle: {
        backgroundColor: '#14213D',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <View>
          {hasData ? (
            <Avatar style={styles.profile} source={user.photoURL} />
          ) : (
            <Avatar style={styles.profile} />
          )}
        </View>
      ),
    });
  }, [navigation, user]);

  if (!isFocused) {
    return <View style={styles.block} />;
  }

  if (!applications) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="#14213D" />
    );
  }
  return (
    <View style={styles.block}>
      <HistoryList histories={applications} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#14213D',
  },
  spinner: {
    flex: 1,
  },
  profile: {
    marginVertical: 10,
  },
});

export default HistoryScreen;
