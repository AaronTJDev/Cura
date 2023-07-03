import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IPlan } from '../../lib/types/subscription';
import { colors, fonts } from '../../lib/styles';
import { omit } from 'lodash-es';

interface IPlanProps extends IPlan {
  preferred?: boolean;
  selectedPlan?: IPlan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<IPlan | undefined>>;
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    flex: 2,
    minWidth: 60,
    marginHorizontal: 4
  },
  preferredContainer: {
    flex: 3
  },
  wrapper: {
    height: 136,
    backgroundColor: colors.main.primary,
    flex: 1,
    paddingHorizontal: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preferredWrapper: {
    height: 144,
    backgroundColor: colors.main.primaryLight
  },
  preferredTextWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.main.white,
    zIndex: 10,
    elevation: 10,
    top: -12,
    width: '70%',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.main.primary
  },
  preferredText: {
    textAlign: 'center',
    fontFamily: fonts.NunitoSansSemiBold,
    padding: 4,
    fontSize: 12,
    color: colors.main.primary
  },
  title: {
    fontFamily: fonts.CrimsonProRegular,
    color: colors.main.white,
    paddingVertical: 4,
    textAlign: 'center'
  },
  price: {
    fontFamily: fonts.CrimsonProExtraBold,
    color: colors.main.white,
    paddingVertical: 4,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 18
  },
  freeTrial: {
    fontFamily: fonts.CrimsonProRegular,
    fontSize: 11,
    color: colors.main.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  selectedPlan: {
    shadowColor: colors.main.black,
    shadowRadius: 12,
    shadowOffset: {
      width: -6,
      height: 12
    },
    shadowOpacity: 0.5,
    elevation: 10
  }
});

export const Plan: React.FC<IPlanProps> = (props) => {
  const { id, name, metadata, description, selectedPlan, setSelectedPlan } =
    props;

  const handleSelectPlan = () => {
    const planInfo = omit(props, ['selectedPlan', 'setSelectedPlan']);
    setSelectedPlan(planInfo);
  };

  const isSelectedPlan = selectedPlan?.id === id;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !!metadata?.preferred && styles.preferredContainer
      ]}
      key={`${id}-${name}`}
      onPress={handleSelectPlan}
    >
      {!!metadata.preferred && (
        <View style={styles.preferredTextWrapper}>
          <Text style={styles.preferredText}>Best Value</Text>
        </View>
      )}
      <View
        style={[
          styles.wrapper,
          !!metadata?.preferred && styles.preferredWrapper,
          !isSelectedPlan
            ? {
                opacity: 0.9
              }
            : styles.selectedPlan
        ]}
      >
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>{metadata.priceText}</Text>
        <Text style={styles.freeTrial}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};
