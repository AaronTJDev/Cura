import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import ContentCard from './ContentCard';
import { Food } from '../../lib/types/database';
import { Dictionary } from 'async';
import { startCase } from 'lodash-es';
import { colors, fonts } from '../../lib/styles';

interface ContentGridProps {
  items: Dictionary<Food[]>;
  itemsPerRow?: number;
  itemsPerPage?: number;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24
  },
  title: {
    fontFamily: fonts.CrimsonProSemiBold,
    fontSize: 24,
    marginBottom: 20
  },
  listContainer: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  viewMoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginBottom: 32
  },
  viewMore: {
    fontFamily: fonts.CrimsonProLight,
    fontSize: 16,
    color: colors.main.black,
    letterSpacing: 2
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
        <View key={`grid-${title}`} style={styles.container}>
          <Text style={styles.title}>{startCase(title)}</Text>
          <View key={`grid-${title}`} style={styles.listContainer}>
            {foods.map((food, index, thisArray) => (
              <ContentCard
                key={food.gtinUpc}
                data={food}
                isLast={thisArray.length - 1 === index}
              />
            ))}
          </View>
          <View style={styles.viewMoreContainer}>
            <TouchableOpacity>
              <Text style={styles.viewMore}>view more</Text>
            </TouchableOpacity>
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
