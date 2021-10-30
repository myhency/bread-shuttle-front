import PropTypes from 'prop-types';
import { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import { useList, useListKeys, useListVals, useObject } from 'react-firebase-hooks/database';
import { firebaseConfig } from '../config';

// ----------------------------------------------------------------------

const DatabaseContext = createContext({
  snapshots: [],
  loading: null,
  error: null
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig).database();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
}

DatabaseProvider.propTypes = {
  children: PropTypes.node
};

function DatabaseProvider({ children }) {
  const [snapshots, loading, error] = useList(firebase.database().ref('sevenbread-test/alarm/000640'));

  return <DatabaseContext.Provider value={{ snapshots, loading, error }}>{children}</DatabaseContext.Provider>;
}

export { DatabaseContext, DatabaseProvider };
