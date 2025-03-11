import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View, Text} from 'react-native';
import {Width} from '../../utils/globalwinSize';
import ListHeaderComponent from '../headers/ListHeaderComponent';
import ListFooterComponent from '../headers/ListFooterComponent';
import ListEmptyComponent from '../headers/ListEmptyComponent';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TaskCard from '../card/TaskCard';
import Snackbar from 'react-native-snackbar';

const Tasklist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMarkers = useCallback(async () => {
    setLoading(true);
    const userId = auth().currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'User not authenticated.');
      setLoading(false);
      return;
    }

    try {
      const markersSnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('markers')
        .orderBy('timestamp', 'desc')
        .get();

      const markers = markersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('data======>', markers);
      setData(markers);
    } catch (error) {
      console.error('Error fetching markers:', error);
      Snackbar.show({
        text: 'Failed to fetch markers. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMarkers();
    setRefreshing(false);
  }, [fetchMarkers]);

  const renderItem = useCallback(
    ({item}) => <TaskCard item={item} onRefresh={onRefresh} />,
    [onRefresh],
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listCard}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={<ListFooterComponent data={data} />}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['grey']}
          progressBackgroundColor={'black'}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  listCard: {
    flexGrow: 1,
    width: Width * 0.9,
  },
});

export default Tasklist;
