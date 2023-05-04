import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import { Food } from '../../lib/types/database';

interface FoodCategoryCarouselProps {
  category: string;
  foodItems: Food[];
}

export const FoodCategoryCarousel: React.FC<FoodCategoryCarouselProps> = ({ category, foodItems }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [items, setItems] = useState(() => foodItems.filter((item) => item.brandedFoodCategory === category));

  const handleEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setLoadingMore(false);
    }
  };

  return (
    <View>
      <Text>{category}</Text>
    </View>
  );
};

