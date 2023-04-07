import React, { useContext } from 'react';
import { Formik } from 'formik';

//** Helpers **/
import { SearchSchema } from '../../lib/validationSchemas';
import { SearchContext } from '../../screens/SymptomSearchScreen';

const initialValues = {
  query: ''
};

export const SearchBar = () => {
  const {
    setQuery,
    setTextInputTouched,
    setTextInputBlurred,
    isTouched,
    isBlurred,
    suggestions,
    query
  } = useContext(SearchContext);

  const handleSubmit = async () => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
    >
      {({ handleBlur, setFieldValue, values }) => {
        const handleAnimationOnFocus = () => {
          setTextInputTouched(true);
          setTextInputBlurred(false);
        };

        const handleAnimationOnBlur = () => {
          setTextInputTouched(false);
          setTextInputBlurred(true);
          handleBlur('query');
        };

        const onChange = (text: string) => {
          setFieldValue('query', text);
          setQuery(text);
        };

        console.log(
          handleAnimationOnFocus,
          handleAnimationOnBlur,
          onChange,
          isTouched,
          isBlurred,
          suggestions,
          query,
          values
        );

        return <></>;
      }}
    </Formik>
  );
};
