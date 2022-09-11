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
import { SEARCH_INPUT_DEBOUNCE_TIME } from '../../lib/constants';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.main.white
  },
  gradient: {
    flex: 1
  }
});

interface ISearchContext {
  query: string;
  suggestions: string[];
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
  setSuggestions: Dispatch<SetStateAction<string[]>>;
}

export const SearchContext = React.createContext<ISearchContext | null>(null);

const SymptomSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  }, [query, setQuery, setSuggestions, getSuggestions]);

  useEffect(() => {
    console.log('suggestions:', suggestions);
  }, [suggestions]);

  return (
    <SearchContext.Provider
      value={{
        query,
        suggestions,
        setQuery,
        setSuggestions,
        isLoading
      }}
    >
      <View style={styles.container}>
        <Search />
      </View>
    </SearchContext.Provider>
  );
};

export default SymptomSearch;
