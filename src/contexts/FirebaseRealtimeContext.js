import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../config';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig).database();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
}

const DatabaseContext = createContext({
  method: 'firebase'
});

DatabaseProvider.propTypes = {
  children: PropTypes.node
};

function DatabaseProvider({ children }) {
  return (
    <DatabaseContext.Provider
      value={{
        method: 'firebase'
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export { DatabaseContext, DatabaseProvider };
