import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import textStyle from '../../utils/fontStyles';
import {images} from '../../utils/images';
import {Height, Width} from '../../utils/globalwinSize';
import {strings} from '../../utils/string';

const ListEmptyComponent = () => {
  return (
    <View style={styles.card}>
      <Image
        resizeMode="contain"
        source={images.emptyCard}
        style={styles.imageStlye}
      />
      <View style={styles.detailsCard}>
        <Text style={textStyle.headerMedium}>{strings.emptyCard.header}</Text>
        <Text style={textStyle.paragraph}>{strings.emptyCard.details}</Text>
      </View>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  imageStlye: {
    height: Height * 0.7,
    width: Width * 0.7,
  },
  card: {
    height: '70%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsCard: {
    top: -Height * 0.09,
    alignItems: 'center',
  },
});
