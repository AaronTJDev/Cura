import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import { StyleSheet, View } from 'react-native';
import { debounce } from 'lodash-es';

//** Components **/
import { Search } from './Search';

//** Helpers **/
import { colors } from '../../lib/styles';
import { fetchSuggestions } from '../../lib/datasource';
import { SCREEN_HEIGHT, SEARCH_INPUT_DEBOUNCE_TIME } from '../../lib/constants';
import SearchResults from './SearchResults';

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: colors.main.white
  }
});

interface ISearchContext {
  query: string;
  suggestions: string[];
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<string>> | (() => {});
  setSuggestions: Dispatch<SetStateAction<string[]>> | (() => {});
  setTextInputTouched:
    | React.Dispatch<React.SetStateAction<boolean>>
    | (() => {});
  setTextInputBlurred:
    | React.Dispatch<React.SetStateAction<boolean>>
    | (() => {});
  isBlurred: boolean;
  isTouched: boolean;
}

export const SearchContext = React.createContext<ISearchContext>({
  query: '',
  suggestions: [],
  isLoading: false,
  setQuery: () => {},
  setSuggestions: () => {},
  setTextInputTouched: () => {},
  setTextInputBlurred: () => {},
  isBlurred: false,
  isTouched: false
});

const SymptomSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textInputTouched, setTextInputTouched] = useState<boolean>(false);
  const [textInputBlurred, setTextInputBlurred] = useState<boolean>(false);

  const getSuggestions = debounce(
    useCallback(async () => {
      if (query.length > 1) {
        setIsLoading(true);
        fetchSuggestions(query)
          .then((res) => {
            console.log(res);
            setSuggestions(suggestions);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, [query, suggestions]),
    SEARCH_INPUT_DEBOUNCE_TIME
  );

  useEffect(() => {
    getSuggestions();
  }, [query, getSuggestions]);

  return (
    <SearchContext.Provider
      value={{
        query,
        suggestions,
        setQuery,
        setSuggestions,
        setTextInputBlurred,
        setTextInputTouched,
        isLoading,
        isBlurred: textInputBlurred,
        isTouched: textInputTouched
      }}
    >
      <View style={styles.container}>
        <Search />
        <SearchResults suggestions={suggestions} />
      </View>
    </SearchContext.Provider>
  );
};

export default SymptomSearch;
