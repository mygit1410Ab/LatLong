import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = ({visible}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#E50046" />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
});
