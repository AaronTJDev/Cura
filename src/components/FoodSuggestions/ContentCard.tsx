import { startCase } from 'lodash-es';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fonts } from '../../lib/styles';
import { Food } from '../../lib/types/database';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexWrap: 'nowrap',
    height: 240,
    width: 140,
    justifyContent: 'flex-end',
    margin: 10
  },
  image: {
    borderRadius: 5,
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 2
  },
  title: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 12,
    marginTop: 16,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    width: '100%'
  },
  subtitle: {
    fontFamily: fonts.CrimsonProLight,
    flex: 1
  }
});

interface ContentCardProps {
  data: Food;
  imageUri: string;
}

const ContentCard = ({ data, imageUri }: ContentCardProps) => {
  console.log('data', data);

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {startCase(data.description.toLowerCase())}
        </Text>
        <Text style={styles.subtitle}>{`${
          data.servingSize?.low
        } of your RDA of ${startCase(data.matchedKey)}`}</Text>
      </View>
    </View>
  );
};

export default ContentCard;
