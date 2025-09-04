import { initializeApp, cert } from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import serviceAccount from '../secret/serviceAccountKey.json' assert { type: 'json' };
;
const firbaseApp = initializeApp({
    credential: cert(serviceAccount),
});

export const auth = getAuth(firbaseApp)

