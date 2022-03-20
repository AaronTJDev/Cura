import React from 'react'
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';

/** Helpers */
import { getIsAccountLoading } from '../redux/account/selectors';

export default function Loader() {
  const isAccountLoading = useSelector(getIsAccountLoading);

  return (
    <>
      {
        ( 
          isAccountLoading &&
            <LottieView
              autoPlay
              loop
              source={require('../../assets/animations/loader.json')}
              style={{backgroundColor: 'rgba(251, 252, 255, 0.25)', width: '100%', height: '100%', position: 'absolute'}}
            />
        )
      }
    </>
  )
}
