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
    AUTH: 'auth',
    SIGNUP: 'signup',
    LOGIN: 'login',
    MANAGE_ACCOUNT: 'manage'
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
