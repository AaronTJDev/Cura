import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faBook,
  faHouse,
  faSearch,
  faUser,
  faPlus,
  faMinus,
  faBarcode,
  faArrowLeft,
  faNewspaper,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faWallet,
  faChevronRight,
  faBars,
  faFilter
} from '@fortawesome/free-solid-svg-icons';

export const initiateIconLibrary = () => {
  library.add(
    // @ts-ignore
    fab,
    faBook,
    faHouse,
    faUser,
    faSearch,
    faPlus,
    faMinus,
    faBarcode,
    faArrowLeft,
    faNewspaper,
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
    faWallet,
    faChevronRight,
    faBars,
    faFilter
  );
};
