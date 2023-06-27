import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/** Components */
import { ScreenWrapper } from '../../utility/ScreenWrapper';

/** Helpers */
import {
  navigate,
  routeNames,
  screenTitles
} from '../../../lib/helpers/navigation';
import { colors, fonts } from '../../../lib/styles';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../../redux/account/actions';
import { logError } from '../../../lib/helpers/platform';
import { AccountStackParamList } from '../../../screens/AccountScreen';
import { toString } from 'lodash-es';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerTextContainer: {
    flex: 1
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.main.black,
    fontFamily: fonts.CrimsonProRegular,
    textAlign: 'center',
    width: '84%'
  },
  title: {
    fontFamily: fonts.CrimsonProBold,
    fontSize: 32,
    paddingBottom: 4,
    color: colors.main.black
  },
  subtitle: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 14,
    color: colors.main.gray25
  },
  datePicker: {
    flex: 1,
    backgroundColor: colors.main.white
  },
  pickerContainer: {
    flex: 4,
    flexDirection: 'row'
  },
  submitContainer: {
    flex: 1
  },
  submitCta: {
    height: 50,
    width: '100%',
    backgroundColor: colors.main.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 24,
    color: colors.main.white
  },
  skipContainer: {
    flex: 0.5,
    justifyContent: 'center'
  },
  skipText: {
    color: colors.main.primaryLight,
    fontFamily: fonts.CrimsonProBold,
    fontSize: 12,
    textDecorationLine: 'underline'
  }
});

const getYearsData = () => {
  const years = [];
  const minYear = 1920;
  const maxYear = new Date().getFullYear();

  for (let i = minYear, x = 1; i < maxYear; i++, x++) {
    years.push(toString(i));
  }

  return years;
};

const years = getYearsData();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

type DobFormProps = NativeStackScreenProps<
  AccountStackParamList,
  'dob',
  'AccountStack'
>;

const getMonthAsInteger = (month: string) => months.indexOf(month) + 1;

export const DobForm: React.FC<DobFormProps> = ({ route }) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState<string>('1990');
  const [month, setMonth] = useState<string>(months[0]);
  const { user } = route.params || {};

  const getDateOfBirth = () => `${year}/${getMonthAsInteger(month)}`;

  const handleGoBack = async () => {
    navigate(routeNames.account.ACCOUNT);
  };

  const handleSubmit = async () => {
    if (user) {
      const { uid } = user;
      try {
        await updateUserInfo(dispatch, uid, {
          dateOfBirth: getDateOfBirth(),
          ...user
        });
        await handleGoBack();
      } catch (err) {
        logError(err);
      }
    }
  };

  return (
    <ScreenWrapper title={screenTitles.account.SIGNUP}>
      <Animated.View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Date of Birth</Text>
          <Text style={styles.subtitle}>
            Please select your month and year of birth.
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.datePicker}
            selectedValue={month}
            pickerData={months}
            onValueChange={setMonth}
          />
          <Picker
            style={styles.datePicker}
            selectedValue={year}
            pickerData={years}
            onValueChange={setYear}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            We ask for your date of birth to personalize recommendations for
            you.
          </Text>
          <TouchableOpacity style={styles.skipContainer} onPress={handleGoBack}>
            <Text style={styles.skipText}>Maybe later</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.submitCta}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
};
