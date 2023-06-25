import shared from './shared';

const prod = {
  ...shared,
  stripe: {
    publishableKey:
      'pk_live_51MGRWZDtLolnusdDryfrxPCTTdlytEgIqHbmupZw0IURCaspAYGF0Xew1o1J5lH3ARFNFundpIYDGFhxJsCb3Gio006TgghsjN'
  }
};

export default prod;
