import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, options?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate((name as never), (options as never));
  }
}
