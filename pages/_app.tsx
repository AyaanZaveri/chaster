import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, provider } from '../firebase'
import Login from './Login'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth)

  const userRef = collection(db, 'users')

  useEffect(() => {
    if (user) {
      setDoc(
        doc(userRef, user.uid),
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      )
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
