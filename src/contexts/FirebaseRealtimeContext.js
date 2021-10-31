import PropTypes from 'prop-types';
import { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import { useList, useListKeys, useListVals, useObject } from 'react-firebase-hooks/database';
import { firebaseConfig } from '../config';
import { fDateString } from '../utils/formatTime';

// ----------------------------------------------------------------------

const DatabaseContext = createContext({
  todaySnapshots: [],
  tLoading: null,
  tError: null,
  macaronSnapshots: [],
  mLoading: null,
  mError: null,
  bigpieSnapshots: [],
  bLoading: null,
  bError: null
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig).database();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
}

DatabaseProvider.propTypes = {
  children: PropTypes.node
};

function DatabaseProvider({ children }) {
  // const [snapshots, loading, error] = useList(firebase.database().ref(`shuttle-${fDateString(new Date())}`));
  const today = new Date();
  today.setDate(today.getDate() - 2);
  console.log(fDateString(today));
  // this line is just for test when it comes to the previous date
  const [todaySnapshots, tLoading, tError] = useList(firebase.database().ref(`shuttle-${fDateString(new Date())}`));

  const [macaronSnapshots, mLoading, mError] = useList(firebase.database().ref(`shuttle`));

  const [bigpieSnapshots, bLoading, bError] = useList(firebase.database().ref('bigpie'));

  return (
    <DatabaseContext.Provider
      value={{
        todaySnapshots,
        tLoading,
        tError,
        macaronSnapshots,
        mLoading,
        mError,
        bigpieSnapshots,
        bLoading,
        bError
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export { DatabaseContext, DatabaseProvider };
