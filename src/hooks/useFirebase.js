import { useContext } from 'react';
import { DatabaseContext } from '../contexts/FirebaseRealtimeContext';

const useFirebaseRealtime = () => useContext(DatabaseContext);

export default useFirebaseRealtime;
