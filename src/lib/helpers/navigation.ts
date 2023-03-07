import { createNavigationContainerRef } from '@react-navigation/native';
import { useAuth } from './auth';

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
    LOGIN: 'login',
    ONBOARDING_MODAL: 'onboarding'
  },
  search: {}
};

navigationRef.current?.addListener('state', () => {
  useAuth();
});

export const transparentHeaderOptions = {
  headerShown: true,
  title: '',
  headerTransparent: true
};
