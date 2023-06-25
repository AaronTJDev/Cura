import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AddressSheet, useStripe } from '@stripe/stripe-react-native';

/** Components */
import Footer from '../utility/Footer';

/** Helpers */
import { assetResolver } from '../../lib/assetResolver';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/constants';
import { colors, fonts } from '../../lib/styles';
import { getSubscriptionProducts } from '../../lib/datasource';
import { logError } from '../../lib/helpers/platform';
import { Plan } from '../../lib/types/subscription';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  header: {
    fontFamily: fonts.CrimsonProBold,
    fontSize: 32,
    flex: 1
  },
  footer: {
    bottom: SCREEN_HEIGHT / 10,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%'
  },
  copyWrapper: {
    flex: 1,
    paddingHorizontal: 24
  },
  copyHeader: {
    fontFamily: fonts.CrimsonProSemiBold,
    color: colors.main.primary,
    textAlign: 'center',
    fontSize: 24
  },
  copyBody: {
    fontFamily: fonts.CrimsonProLight,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 8,
    color: colors.main.primaryDark
  },
  plansWrapper: {
    flex: 4
  },
  plansBg: {
    width: SCREEN_WIDTH,
    position: 'absolute',
    left: -24,
    top: 60
  }
});

const SubscriptionModal = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [plans, setPlans] = useState<Plan[] | undefined>();
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

  const handleGetSubscriptionProducts = async (): Promise<void> => {
    const subscriptionProducts = await getSubscriptionProducts();
    if (subscriptionProducts) {
      setPlans(subscriptionProducts);
    }
  };

  const setCustomerAddress = () => {};

  const initStripePaymentSheet = async () => {};

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log('Error processing payment', error);
    } else {
      console.log(
        'Success',
        'Your payment method is successfully set up for future payments!'
      );
    }
  };

  useEffect(() => {
    handleGetSubscriptionProducts().catch(logError);
  }, []);

  useEffect(() => {
    console.log('PLANS:', plans);
  }, [plans]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subscription</Text>
      <View style={styles.copyWrapper}>
        <Text style={styles.copyHeader}>
          Premium Solutions for Enhanced Well-Being.
        </Text>
        <Text style={styles.copyBody}>
          Gain Access to Research-Backed Health & Wellness Insights with a
          Subscription Plan.
        </Text>
      </View>
      <View style={styles.plansWrapper}>
        <Image source={assetResolver.images.wavyBg} style={styles.plansBg} />
        <AddressSheet
          onSubmit={() => {}}
          onError={() => {}}
          visible={showAddressForm}
        />
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default SubscriptionModal;
