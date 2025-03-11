import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import textStyle from '../../utils/fontStyles';

const ListHeaderComponent = () => {
  return (
    <View style={styles.headerCard}>
      <Text style={textStyle.headerSmall}>
        <Text style={textStyle.paragraphItalic}>Hello</Text>{' '}
        <Text style={textStyle.paragraphItalic}>hope you are good!</Text>
      </Text>
    </View>
  );
};

export default ListHeaderComponent;

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: 'row',
    marginTop: '10%',
    width: '100%',
    marginBottom: '5%',
  },
});
