import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ContentCard from './ContentCard';
import { Food } from '../../lib/types/database';
import { Dictionary } from 'async';
import { startCase } from 'lodash-es';
import { fonts } from '../../lib/styles';

interface ContentGridProps {
  items: Dictionary<Food[]>;
  itemsPerRow?: number;
  itemsPerPage?: number;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  title: {
    fontFamily: fonts.CrimsonProSemiBold,
    fontSize: 18,
    marginBottom: 20
  }
});

const ContentGrid = ({ items, itemsPerPage = 20 }: ContentGridProps) => {
  const gridTitles = Object.keys(items);

  const renderCards = () => {
    return gridTitles.map((title) => {
      if (!items[title]) {
        return;
      }

      const foods = items?.[title]?.slice(0, itemsPerPage);

      return (
        <View key={`grid-${title}`} style={{ flex: 1 }}>
          <Text style={styles.title}>{startCase(title)}</Text>
          <View
            key={`grid-${title}`}
            style={{
              flex: 1,
              marginHorizontal: 5,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}
          >
            {foods.map((food) => (
              <ContentCard
                key={food.gtinUpc}
                data={food}
                imageUri={`https://generatorfun.com/code/uploads/Random-Food-image-${Math.floor(
                  Math.random() * 20
                )}.jpg`}
              />
            ))}
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderCards()}
    </ScrollView>
  );
};

export default ContentGrid;
