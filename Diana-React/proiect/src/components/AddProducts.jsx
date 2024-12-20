import React, { useState, useEffect } from "react"; // Importăm React și hook-urile necesare
import { useNavigate } from "react-router-dom"; // Importăm useNavigate pentru navigarea între pagini
import {
  Button, // Importăm componentele necesare de la Material-UI
  Container,
  TextField,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material"; // Importăm Material-UI pentru a crea interfața
import { Link } from "react-router-dom"; // Importăm Link pentru navigare între pagini

function AddProducts() {
  // Definim starea pentru datele formularului
  const [productsData, setProductsData] = useState({
    denumire: "", // Starea pentru denumirea produsului
    poza: "", // Starea pentru URL-ul imaginii produsului
    pret: "", // Starea pentru prețul produsului
    detalii: "", // Starea pentru detalii despre produs
    categorie: "", // Starea pentru categoria produsului
  });

  // Starea pentru erori în validarea formularului
  const [errors, setErrors] = useState({});
  // Starea pentru afișarea mesajului de succes
  const [successMessage, setSuccessMessage] = useState("");
  // Starea pentru a indica dacă formularul a fost trimis
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hook-ul pentru navigare între pagini
  const navigate = useNavigate();

  // Funcția de validare a câmpurilor formularului
  const validate = () => {
    let temporarErrors = {}; // Obiect pentru erorile de validare

    // Validare denumire produs
    temporarErrors.denumire = productsData.denumire ? "" : "Denumirea trebuie completată";

    // Validare imagine produs
    temporarErrors.poza = productsData.poza ? "" : "Poza trebuie introdusă";

    // Validare preț produs (trebuie să fie un număr pozitiv)
    temporarErrors.pret =
      productsData.pret && !isNaN(productsData.pret) && Number(productsData.pret) > 0
        ? ""
        : "Prețul trebuie să fie un număr pozitiv";

    // Setăm erorile găsite
    setErrors(temporarErrors);

    // Returnăm true dacă nu există erori
    return Object.values(temporarErrors).every((x) => x === "");
  };

  // Funcția pentru gestionarea schimbării câmpurilor formularului
  const handleChange = (e) => {
    const { name, value } = e.target; // Extragem numele și valoarea câmpului modificat
    setProductsData((prevData) => ({ ...prevData, [name]: value })); // Actualizăm starea formularului
  };

  // Funcția pentru gestionarea încărcării imaginii
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obținem fișierul selectat
    if (file) {
      const reader = new FileReader(); // Creăm un FileReader pentru fișier
      reader.onload = () => {
        setProductsData((prevData) => ({ ...prevData, poza: reader.result })); // Salvăm imaginea ca string base64
      };
      reader.readAsDataURL(file); // Citim fișierul ca URL de tip data
    }
  };

  // Funcția pentru trimiterea formularului
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenim comportamentul implicit al formularului
    setIsSubmitted(true); // Setăm că formularul a fost trimis

    // Validăm formularul înainte de salvare
    if (validate()) {
      try {
        const savedProduse = JSON.parse(localStorage.getItem("produse")) || []; // Obținem lista de produse din localStorage
        const newProduct = {
          id: Date.now(), // Generăm un ID unic pentru produs
          ...productsData, // Adăugăm datele produsului
        };

        const updatedProduse = [...savedProduse, newProduct]; // Adăugăm produsul la lista existentă
        localStorage.setItem("produse", JSON.stringify(updatedProduse)); // Salvăm lista actualizată în localStorage

        setSuccessMessage("Produsul a fost salvat cu succes!"); // Afișăm mesajul de succes
        setTimeout(() => setSuccessMessage(""), 3000); // Ștergem mesajul după 3 secunde

        setProductsData({
          denumire: "",
          poza: "",
          pret: "",
          detalii: "",
          categorie: "",
        }); // Resetăm formularul

        navigate("/"); // Navigăm către pagina principală
      } catch (error) {
        console.error("Eroare la salvarea produsului în localStorage:", error); // Afișăm eroarea în consolă
      }
    }
  };

  useEffect(() => {
    // Curățăm mesajele de eroare când câmpurile sunt modificate
    if (isSubmitted) validate();
  }, [productsData]);

  return (
    <Container>
      {/* Titlul formularului */}
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Adaugă Produs
      </Typography>

      {/* Afișăm mesajul de succes dacă există */}
      {successMessage && (
        <Typography color="primary" textAlign="center" marginBottom={2}>
          {successMessage}
        </Typography>
      )}

      {/* Conținutul formularului */}
      <TableContainer>
        <Table>
          <TableBody>
            {/* Câmp pentru denumire produs */}
            <TableRow>
              <TableCell>
                <TextField
                  name="denumire"
                  label="Denumire"
                  value={productsData.denumire} // Legăm valoarea câmpului de starea produsului
                  onChange={handleChange}
                  fullWidth
                  error={isSubmitted && !!errors.denumire} // Afișăm eroarea pentru denumire dacă există
                  helperText={isSubmitted && errors.denumire} // Afișăm mesajul de eroare pentru denumire
                />
              </TableCell>
            </TableRow>

            {/* Câmp pentru încărcarea imaginii */}
            <TableRow>
              <TableCell>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {isSubmitted && errors.poza && (
                  <Typography color="error" variant="caption">
                    {errors.poza}
                  </Typography>
                )}
              </TableCell>
            </TableRow>

            {/* Câmp pentru prețul produsului */}
            <TableRow>
              <TableCell>
                <TextField
                  name="pret"
                  label="Preț (în Lei)"
                  value={productsData.pret}
                  onChange={handleChange}
                  fullWidth
                  error={isSubmitted && !!errors.pret} // Afișăm eroarea pentru preț dacă există
                  helperText={isSubmitted && errors.pret} // Afișăm mesajul de eroare pentru preț
                />
              </TableCell>
            </TableRow>

            {/* Câmp pentru categoria produsului */}
            <TableRow>
              <TableCell>
                <TextField
                  name="categorie"
                  label="Categorie"
                  value={productsData.categorie}
                  onChange={handleChange}
                  fullWidth
                />
              </TableCell>
            </TableRow>

            {/* Câmp pentru detalii produs */}
            <TableRow>
              <TableCell>
                <TextField
                  name="detalii"
                  label="Detalii"
                  value={productsData.detalii}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                />
              </TableCell>
            </TableRow>

            {/* Butoane pentru trimiterea formularului și anulare */}
            <TableRow>
              <TableCell align="center">
                <Button component={Link} to="/" color="secondary">
                  Anulare
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Salvează
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AddProducts;
