import { createNavigationContainerRef } from '@react-navigation/native';
import { useAuth } from './auth';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, options?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, options as never);
  }
}

navigationRef.current?.addListener('state', () => {
  useAuth();
});
