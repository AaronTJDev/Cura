import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, options?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, options as never);
  }
}

export const routeNames = {
  account: {
    ACCOUNT: 'account',
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    ONBOARDING_MODAL: 'onboarding'
  },
  search: {}
};

export const pageTitle = {
  account: {
    SIGNIN: 'Sign In',
    SIGNUP: 'Sign Up',
    SYMPTOM_SEARCH: 'Symptom Search',
    ACCOUNT: 'Account'
  }
}

export const transparentHeaderOptions = {
  headerShown: true,
  title: '',
  headerTransparent: true
};
