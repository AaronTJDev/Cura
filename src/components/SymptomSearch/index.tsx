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
import { ON_BLUR_OFFSET, Search } from './Search';
import SearchResultList, { ISearchResult } from './SearchResultList';

//** Helpers **/
import { colors } from '../../lib/styles';
import { fetchSuggestions } from '../../lib/datasource';
import { SCREEN_HEIGHT, SEARCH_INPUT_DEBOUNCE_TIME } from '../../lib/constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT,
    paddingBottom: ON_BLUR_OFFSET / 2,
    backgroundColor: colors.main.white
  }
});

interface ISearchContext {
  query: string;
  suggestions: ISearchResult[];
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<string>> | (() => {});
  setSuggestions: Dispatch<SetStateAction<ISearchResult[]>> | (() => {});
  setTextInputTouched:
    | React.Dispatch<React.SetStateAction<boolean>>
    | (() => {});
  setTextInputBlurred:
    | React.Dispatch<React.SetStateAction<boolean>>
    | (() => {});
  isBlurred: boolean;
  isTouched: boolean;
  selectedSymptoms?: Set<string>;
  setSelectedSymptoms?: Dispatch<SetStateAction<Set<string>>> | (() => {});
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
  isTouched: false,
  selectedSymptoms: new Set(),
  setSelectedSymptoms: () => {}
});

const SymptomSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ISearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textInputTouched, setTextInputTouched] = useState<boolean>(false);
  const [textInputBlurred, setTextInputBlurred] = useState<boolean>(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(
    new Set()
  );

  const getSuggestions = debounce(
    useCallback(async () => {
      setIsLoading(true);
      fetchSuggestions(query)
        .then((res) => {
          setSuggestions(res);
        })
        .catch((err) => {
          console.log(err);
          setSuggestions([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [query]),
    SEARCH_INPUT_DEBOUNCE_TIME
  );

  useEffect(() => {
    getSuggestions();
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        query,
        suggestions,
        selectedSymptoms,
        setQuery,
        setSuggestions,
        setTextInputBlurred,
        setTextInputTouched,
        setSelectedSymptoms,
        isLoading,
        isBlurred: textInputBlurred,
        isTouched: textInputTouched
      }}
    >
      <View style={styles.container}>
        <Search />
        <SearchResultList suggestions={suggestions} />
      </View>
    </SearchContext.Provider>
  );
};

export default SymptomSearch;
