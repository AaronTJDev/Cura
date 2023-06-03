import React from 'react';
import { View, Text } from 'react-native';
import { Food } from '../../lib/types/database';

interface FoodCategoryCarouselProps {
  category: string;
  foodItems: Food[];
}

export const FoodCategoryCarousel: React.FC<FoodCategoryCarouselProps> = ({
  category
}) => {
  return (
    <View>
      <Text>{category}</Text>
    </View>
  );
};
