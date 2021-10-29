import { useContext } from 'react';
import { FirebaseRealtimeContext } from '../contexts/FirebaseRealtimeContext';

const useFirebaseRealtime = () => useContext(FirebaseRealtimeContext);

export default useFirebaseRealtime;
