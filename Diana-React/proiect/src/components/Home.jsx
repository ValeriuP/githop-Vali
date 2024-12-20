// Importare hook-uri, biblioteci si componente necesare
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Button, Container, Typography, CircularProgress } from "@mui/material";
import Header from "./Header";
import "./Home.css";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import AllProducts from "./AllProducts";

function Home() {
  const navigate = useNavigate(); // Hook pentru navigare între pagini
  const { currentUser, loading } = useAuth(); // Acces datele utilizatorului din contextul de autentificare
  const [isAdmin, setIsAdmin] = useState(false); // Stare pentru a verifica daca utilizatorul este admin
   
  const navLink = [
    {text: "PUNE ÎN COȘ ",path:"/order-detalis"},
  ]
  useEffect(() => {
    // Verifică statusul utilizatorului dacă este logat
    if (currentUser) {
      checkAdminStatus(); // Verifică dacă utilizatorul curent este admin
    }
  }, [currentUser]);

  const checkAdminStatus = async () => {
    // Funcție pentru a verifica dacă utilizatorul este admin
    if (currentUser) {
      try {
        const userDoc = doc(db, "users", currentUser.uid); // Referință către documentul utilizatorului în Firestore
        const userSnapshot = await getDoc(userDoc); // Obține documentul utilizatorului
        const userData = userSnapshot.data(); // Extrage datele utilizatorului
        if (userData) {
          setIsAdmin(userData.isAdmin); // Setează starea `isAdmin` dacă utilizatorul este admin
        }
      } catch (error) {
        console.error("Eroare la verificarea statusului admin:", error); // Loghează erorile
      }
    }
  };

  // Afișează o animație de încărcare dacă datele nu sunt încă disponibile
  if (loading) {
    return (
      <Container
        sx={{
          display: "flex", // Aliniere flexibilă
          justifyContent: "center", // Centrează orizontal
          alignItems: "center", // Centrează vertical
          minHeight: "100vh", // Înălțime minimă egală cu înălțimea ecranului
        }}
      >
        <CircularProgress /> {/* Animație de încărcare */}
      </Container>
    );
  }

  // Pagina principală accesibilă tuturor utilizatorilor
  return (
    <>
      <Header /> {/* Componenta pentru antet */}
      <Container
        sx={{
          maxWidth: "lg", // Lățime maximă pentru dispozitive mari
          padding: 2, // Spațiu interior
          textAlign: "center", // Text centrat
        }}
      >
        <Typography
          variant="h4" // Dimensiune mare a textului
          sx={{
            marginBottom: 3, // Spațiu de jos
            fontWeight: "bold", // Text îngroșat
          }}
        >
          <div className="descriere"
            sx={{
              display: "flex", // Aliniere flexibilă
              justifyContent: "center", // Centrează orizontal
              alignItems: "center", // Centrează vertical
              minHeight: "100vh", // Înălțime minimă egală cu înălțimea ecranului
            }}
          >
            <p> Eleganță și Originalitate în Fiecare Detaliu</p>

            <p>Descoperă colecția noastră unicat de bijuterii lucrate manual, care aduce în prim-plan frumusețea artei autentice.
              Fiecare piesă este creată cu pasiune, atenție la detalii și materiale de cea mai înaltă calitate. 
              Perfecte pentru orice ocazie, bijuteriile noastre adaugă un plus de stil și personalitate fiecărei ținute.</p>

            <p>Dorești o bijuterie care să reflecte stilul tău unic? 
              Acceptăm comenzi personalizate pentru a crea piese care să corespundă exact dorințelor tale.</p>
          </div>
          <AllProducts />
        </Typography>
      </Container>
    </>
  );
}

export default Home;
