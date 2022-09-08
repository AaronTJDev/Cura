import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import { Formik } from 'formik';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { SearchSchema } from '../../lib/validationSchemas';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '96%',
    height: 400,
    alignSelf: 'center',
    alignItems: 'center',
    top: 64,
    zIndex: 2
  },
  searchHeaderText: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: fonts.NunitoSansLight,
    color: colors.main.black
  },
  searchQueryInputView: {
    marginTop: 32,
    borderBottomColor: colors.main.primaryDark,
    borderBottomWidth: 1,
    width: '80%',
    flexDirection: 'row'
  },
  searchQueryInput: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontFamily: fonts.CrimsonProLight,
    fontSize: 28,
    padding: 8,
    width: '88%',
    height: 48,
    top: 8,
    textAlignVertical: 'center',
    textDecorationLine: 'none'
  },
  searchButtonContainer: {
    width: '12%',
    height: 48,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    top: 8
  },
  searchButton: {
    width: '100%',
    height: '100%',
  },
  errorMsg: {
    color: colors.indicators.error,
    top: 16
  },
});

const SearchBar = () => {
  const initialValues = {
    query: ''
  };

  const handleSubmit = () => {
    console.log('submitting!');
  };

  useEffect(() => {
    console.log('rendering search bar');
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      onSubmit={handleSubmit}
    >
      {({handleBlur, handleChange, handleSubmit, values, errors}) => (
        <>
          <View style={styles.searchQueryInputView}>
            <TextInput
              style={styles.searchQueryInput}
              placeholder='Headache'
              value={values.query}
              onChangeText={handleChange('query')}
              onBlur={handleBlur('query')}
              underlineColorAndroid='transparent'
              keyboardType="visible-password"
            />
            <TouchableHighlight
              style={styles.searchButtonContainer}
              onPress={handleSubmit}
            >
              <Icon
                style={styles.searchButton}
                icon={'search'}
                size={18}
                color={colors.main.black}
              />
            </TouchableHighlight>
          </View>
          <View>
            {!!errors.query && (
              <Text style={styles.errorMsg}>
                {errors.query}
              </Text>
            )}
          </View>
        </>
      )}
    </Formik>
  )
}

export const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.searchHeaderText}>What's going on?</Text>
      <SearchBar />
    </View>
  )
};
