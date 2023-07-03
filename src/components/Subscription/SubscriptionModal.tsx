// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

/** Components */
import Footer from '../utility/Footer';

/** Helpers */
import { assetResolver } from '../../lib/assetResolver';
import { SCREEN_HEIGHT } from '../../lib/constants';
import { colors, fonts } from '../../lib/styles';
import {
  createStripeCustomer,
  createSubscription,
  getSubscriptionProducts
} from '../../lib/datasource';
import { logError } from '../../lib/helpers/platform';
import { IPlan } from '../../lib/types/subscription';
import { Plan } from './Plan';
import CTA from '../utility/CTA';
import { Loader } from '../utility/Loader';
import {
  AddressDetails,
  AddressSheet,
  AddressSheetError,
  StripeError,
  useStripe
} from '@stripe/stripe-react-native';
import { useSelector } from 'react-redux';
import { getAccount } from '../../redux/account/selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.main.white
  },
  header: {
    fontFamily: fonts.CrimsonProBold,
    fontSize: 32
  },
  footer: {
    bottom: SCREEN_HEIGHT / 10,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%'
  },
  copyWrapper: {
    height: 200,
    paddingHorizontal: 24,
    marginTop: 48
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
    height: 320,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plansBg: {
    flex: 1,
    position: 'absolute',
    height: 240
  },
  freeTrial: {
    fontFamily: fonts.CrimsonProRegular,
    paddingVertical: 4,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: colors.main.primary
  },
  selectedPlan: {
    fontFamily: fonts.CrimsonProExtraLight,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32,
    paddingVertical: 12,
    color: colors.main.black
  },
  boldedText: {
    fontFamily: fonts.CrimsonProBold
  },
  divider: {
    borderBottomColor: colors.main.gray20,
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    width: '100%',
    top: 24
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const SubscriptionModal = () => {
  const { initPaymentSheet } = useStripe();

  const account = useSelector(getAccount);

  const [plans, setPlans] = useState<IPlan[] | undefined>();
  const [selectedPlan, setSelectedPlan] = useState<IPlan>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [clientSecret, setClientSecret] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [address, setAddress] = useState<AddressDetails>();
  const [, setAddressError] = useState<string>('');

  const handleGetSubscriptionProducts = async (): Promise<void> => {
    setLoading(true);
    const subscriptionProducts = await getSubscriptionProducts();

    const preferredPlan = subscriptionProducts?.find(
      (product) => product.metadata.preferred
    );

    if (preferredPlan) {
      const preferredPlanIndex = subscriptionProducts.indexOf(preferredPlan);
      if (preferredPlanIndex < 1 && !!subscriptionProducts.length) {
        const lastProductInArray = subscriptionProducts.pop() as IPlan;
        subscriptionProducts.unshift(lastProductInArray);
      } else if (preferredPlanIndex > 1 && !!subscriptionProducts.length) {
        const firstProductInArray = subscriptionProducts.shift() as IPlan;
        subscriptionProducts.push(firstProductInArray);
      }
    }
    if (subscriptionProducts) {
      setPlans(subscriptionProducts);
    }
  };

  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };

  const handleDismissAdressForm = (addressDetails: AddressDetails) => {
    setAddress(addressDetails);
    setShowAddressForm(false);
  };

  const handleAddressFormError = (error: StripeError<AddressSheetError>) => {
    setAddressError(error.message);
    setShowAddressForm(false);
  };

  const initStripePaymentSheet = async () => {
    if (!!selectedPlan && !!account?.email && !!address?.address) {
      const { id: stripeCustomerId } = await createStripeCustomer(
        account.email,
        address.address,
        { internalId: account.uid }
      );

      const { clientSecret } = await createSubscription(
        stripeCustomerId,
        selectedPlan?.default_price
      );

      const initPaymentSheetResult = await initPaymentSheet({
        merchantDisplayName: 'Cura',
        customerId: account.uid,
        paymentIntentClientSecret: clientSecret
      });
      console.log('init payment sheet result', initPaymentSheetResult);
    }
  };

  // const openPaymentSheet = async () => {
  //   const { error } = await presentPaymentSheet();
  //   if (error) {
  //     console.log('Error processing payment', error);
  //   } else {
  //     console.log(
  //       'Success',
  //       'Your payment method is successfully set up for future payments!'
  //     );
  //   }
  // };

  useEffect(() => {
    handleGetSubscriptionProducts().catch(logError);
  }, []);

  useEffect(() => {
    if (plans?.length) {
      console.log('PLANS', plans);
      setSelectedPlan(plans[1]);
    }
  }, [plans]);

  useEffect(() => {
    if (address?.address) {
      initStripePaymentSheet().catch(logError);
    }
  }, [address]);

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
        <View style={styles.divider} />
        <Text style={styles.selectedPlan}>
          <Text style={styles.boldedText}>Selected Plan:</Text>{' '}
          {selectedPlan?.name}, 7-day Free-Trial and then{' '}
          {selectedPlan?.metadata.priceText}
        </Text>
      </View>
      <View style={styles.plansWrapper}>
        <Image source={assetResolver.images.wavyBg} style={styles.plansBg} />

        <AddressSheet
          onSubmit={handleDismissAdressForm}
          onError={handleAddressFormError}
          visible={showAddressForm}
          sheetTitle="Billing Address"
        />

        {loading && (
          <View style={styles.loaderWrap}>
            <Loader isLoading={loading} />
          </View>
        )}
        {!!plans?.length &&
          plans.map((plan) => (
            <Plan
              {...plan}
              preferred={!!plan?.metadata?.preferred}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          ))}
      </View>
      <CTA
        isEnabled
        isDarkTheme
        onPress={handleShowAddressForm}
        text={'Continue'}
      />
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default SubscriptionModal;
