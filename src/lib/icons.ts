import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBook, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

export const initiateIconLibrary = () => {
  library.add(fab, faBook, faHouse, faUser);
};
