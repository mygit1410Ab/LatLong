import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import textStyle from '../../utils/fontStyles';

const ListFooterComponent = ({data}) => {
  if (data.length > 0) {
    return (
      <View style={styles.card}>
        <Text style={textStyle.paragraph}>No more locations are the list.</Text>
      </View>
    );
  }
  return null;
};
export default ListFooterComponent;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    marginBottom: '20%',
  },
});
