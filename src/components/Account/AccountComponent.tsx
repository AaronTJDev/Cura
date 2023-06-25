import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  navigate,
  routeNames,
  screenTitles
} from '../../lib/helpers/navigation';
import { colors, fonts, shadow } from '../../lib/styles';
import { getAccount } from '../../redux/account/selectors';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { logout } from '../../redux/account/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileGroup: {
    height: 96,
    flexDirection: 'row',
    margin: 2,
    backgroundColor: colors.main.white,
    borderRadius: 10,
    ...shadow
  },
  profileImgContainer: {
    flex: 2,
    padding: 12
  },
  profileImg: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 14
  },
  profileTextGroup: {
    flex: 3,
    padding: 4
  },
  userNameLabel: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 10,
    color: colors.main.gray5,
    marginVertical: 16
  },
  userName: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 12,
    letterSpacing: 0,
    marginBottom: 4
  },
  age: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 12,
    letterSpacing: 0
  },
  subscriptionBadgeContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  subcriptionBadge: {
    height: 36,
    width: '100%',
    backgroundColor: colors.main.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  subscriptionBadgeText: {
    color: colors.main.white,
    fontFamily: fonts.CrimsonProRegular
  },
  settingsContainer: {
    height: 60,
    backgroundColor: colors.main.white,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    ...shadow
  },
  settingsIconContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  settingsChevron: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  settingsIcon: {
    flex: 1,
    backgroundColor: colors.main.secondaryLight
  },
  settingsText: {
    flex: 3,
    fontFamily: fonts.ComfortaaSemiBold,
    textAlign: 'center'
  },
  subscriptionGroup: {
    height: 160,
    alignItems: 'center',
    backgroundColor: colors.main.white,
    borderRadius: 14,
    margin: 4,
    ...shadow
  },
  subscriptionTextGroup: {
    width: '100%',
    padding: 8,
    paddingTop: 16
  },
  subscriptionTextRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 8
  },
  subscriptionText: {
    fontFamily: fonts.ComfortaaMedium,
    fontSize: 12,
    color: colors.main.gray5
  },
  subscriptionTextBold: {
    fontFamily: fonts.CrimsonProRegular
  },
  divider: {
    width: '80%',
    marginVertical: 12,
    borderBottomColor: colors.main.gray10,
    borderBottomWidth: 1,
    alignSelf: 'center'
  },
  ctaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  manageSubscriptionCta: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  manageSubscriptionText: {
    color: colors.main.primaryLight
  }
});

export const AccountComponent = () => {
  const dispatch = useDispatch();
  const { username, dateOfBirth } = useSelector(getAccount);

  const getAge = () => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth?.replace('/', '-'));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age + ' years old';
  };

  const navigateToGeneralSettings = () => {
    navigate(routeNames.account.EDIT);
  };

  const openSubscriptionModal = () => {
    navigate(routeNames.account.SUBSCRIPTION_MODAL);
  };

  const signout = () => {
    logout(dispatch).catch();
  };

  // @todo Refactor into smaller components
  // @todo add subscription logic
  return (
    <ScreenWrapper
      title={screenTitles.account.ACCOUNT}
      hideBackButton
      expandedContentArea
    >
      <View style={styles.container}>
        <View style={styles.profileGroup}>
          <View style={styles.profileImgContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/200' }}
              style={styles.profileImg}
            />
          </View>
          <View style={styles.profileTextGroup}>
            <Text style={styles.userNameLabel}>Username</Text>
            <Text style={styles.userName}>{username}</Text>
            <Text style={styles.age}>{getAge()}</Text>
          </View>
          <View style={styles.subscriptionBadgeContainer}>
            <View style={styles.subcriptionBadge}>
              <Text style={styles.subscriptionBadgeText}>Premium</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.settingsContainer}
          onPress={navigateToGeneralSettings}
        >
          <View style={styles.settingsIconContainer}>
            <Icon
              style={styles.settingsIcon}
              icon={'user'}
              color={colors.main.secondaryDark}
              size={18}
            />
          </View>
          <Text style={styles.settingsText}>General Settings</Text>
          <View style={styles.settingsChevron}>
            <Icon
              style={styles.settingsIcon}
              icon={'chevron-right'}
              color={colors.main.secondaryDark}
              size={18}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsContainer} onPress={signout}>
          <View style={styles.settingsIconContainer}>
            <Icon
              style={styles.settingsIcon}
              icon={'user'}
              color={colors.main.secondaryDark}
              size={18}
            />
          </View>
          <Text style={styles.settingsText}>Signout</Text>
          <View style={styles.settingsChevron}>
            <Icon
              style={styles.settingsIcon}
              icon={'chevron-right'}
              color={colors.main.secondaryDark}
              size={18}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.subscriptionGroup}>
          <View style={styles.subscriptionTextGroup}>
            <View style={styles.subscriptionTextRow}>
              <Text style={styles.subscriptionText}>Subscription Status</Text>
              <Text style={styles.subscriptionTextBold}>Premium</Text>
            </View>
            <View style={styles.subscriptionTextRow}>
              <Text style={styles.subscriptionText}>
                Subscription valid through
              </Text>
              <Text style={styles.subscriptionTextBold}>12 Nov, 2023</Text>
            </View>
            <View style={styles.subscriptionTextRow}>
              <Text style={styles.subscriptionText}>Member Since</Text>
              <Text style={styles.subscriptionTextBold}>11 Dec, 2022</Text>
            </View>
            <View style={styles.divider} />
          </View>
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.manageSubscriptionCta}
              onPress={openSubscriptionModal}
            >
              <Text style={styles.manageSubscriptionText}>
                Manage My Subscription
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};
