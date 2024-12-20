import { useContext, useEffect, useState, createContext } from "react";
import { auth, db } from "../../firebase"; // Asigură-te că importi Firebase corect
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(); // Creează contextul pentru gestionarea autentificării

export function useAuth() {
    return useContext(AuthContext); // Permite accesul la contextul de autentificare
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null); // Starea utilizatorului curent
    const [userLoggedIn, setUserLoggedIn] = useState(false); // Starea autentificării
    const [loading, setLoading] = useState(true); // Starea de încărcare
    const [isAdmin, setIsAdmin] = useState(false); // Starea pentru rolul de administrator

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser); 
        // Ascultă schimbările stării de autentificare
        return unsubscribe; // Dezactivează ascultătorul la demontarea componentei
    }, []);

    async function initializeUser(user) {
        setLoading(true); // Începe încărcarea
        if (user) { 
            // Dacă utilizatorul este autentificat
            try {
                setCurrentUser(user); // Salvează utilizatorul curent
                setUserLoggedIn(true); // Marchează utilizatorul ca autentificat

                // Obține detalii suplimentare din Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setIsAdmin(userData.isAdmin || false); // Setează rolul de administrator
                } else {
                    setIsAdmin(false); // Dacă documentul nu există, utilizatorul nu este admin
                }
            } catch (error) {
                console.error("Eroare la obținerea datelor utilizatorului:", error);
                setIsAdmin(false); // Setare implicită pentru rolul de admin
            }
        } else { 
            // Dacă nu există utilizator autentificat
            setCurrentUser(null); // Resetează utilizatorul curent
            setUserLoggedIn(false); // Marchează utilizatorul ca neautentificat
            setIsAdmin(false); // Resetează rolul de administrator
        }
        setLoading(false); // Finalizează încărcarea
    }

    const value = { currentUser, userLoggedIn, loading, isAdmin }; 
    // Valori disponibile în context pentru utilizatorii aplicației

    return (
        <AuthContext.Provider value={value}>
            {/* Furnizează contextul în aplicație */}
            {!loading && children} 
            {/* Afișează copiii doar după finalizarea încărcării */}
        </AuthContext.Provider>
    );
}

