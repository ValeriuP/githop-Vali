import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Importă configurația Firebase
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore"; // Importă metodele Firestore necesare
import { DataGrid } from "@mui/x-data-grid"; // Importă componenta DataGrid pentru afișarea datelor
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  IconButton,
} from "@mui/material"; // Importă componente Material-UI
import { Delete } from "@mui/icons-material"; // Importă iconița pentru ștergere
import { useNavigate } from "react-router-dom"; // Importă hook-ul pentru navigare
import { useAuth } from "../contexts/authContext"; // Importă contextul de autentificare
import Header from "./Header"; // Importă componenta Header

function AllUsers() {
  const [users, setUsers] = useState([]); // Stochează lista de utilizatori
  const [open, setOpen] = useState(false); // Controlează starea dialogului de confirmare
  const [selectedUserId, setSelectedUserId] = useState(null); // ID-ul utilizatorului selectat pentru ștergere
  const [loading, setLoading] = useState(true); // Controlează afișarea încărcării

  const { isAdmin } = useAuth(); // Obține statutul de admin din context
  const navigate = useNavigate(); // Hook pentru navigare

  // Verifică dacă utilizatorul este admin și redirecționează dacă nu este
  useEffect(() => {
    if (isAdmin === undefined) {
      return; // Nu face nimic dacă isAdmin este indefinit (încărcare în curs)
    }

    if (!isAdmin) {
      navigate("/"); // Redirecționează utilizatorii non-admin
    } else {
      setLoading(false); // Setează starea de încărcare la false
    }
  }, [isAdmin, navigate]);

  // Preia lista utilizatorilor din baza de date
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users"); // Referință la colecția "users"
        const usersSnapshot = await getDocs(usersCollection); // Obține documentele colecției
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id, // ID-ul documentului
          firstName: doc.data().firstName, // Prenumele utilizatorului
          lastName: doc.data().lastName, // Numele de familie al utilizatorului
          email: doc.data().email, // Email-ul utilizatorului
        }));
        setUsers(usersList); // Setează lista utilizatorilor
      } catch (error) {
        console.error("Error fetching users:", error); // Afișează erorile în consolă
      }
    };

    fetchUsers();
  }, []);

  // Șterge un utilizator din baza de date
  const handleDeleteUser = async () => {
    try {
      if (selectedUserId) {
        await deleteDoc(doc(db, "users", selectedUserId)); // Șterge documentul selectat
        setUsers(users.filter((user) => user.id !== selectedUserId)); // Actualizează lista de utilizatori
        console.log("User deleted successfully");
      }
      setOpen(false); // Închide dialogul de confirmare
    } catch (error) {
      console.error("Error deleting user:", error); // Afișează erorile în consolă
    }
  };

  // Deschide dialogul de confirmare pentru ștergere
  const handleOpenModal = (userId) => {
    setSelectedUserId(userId); // Setează ID-ul utilizatorului selectat
    setOpen(true); // Deschide dialogul
  };

  // Închide dialogul de confirmare
  const handleCloseModal = () => {
    setOpen(false); // Închide dialogul
  };

  // Definirea coloanelor pentru DataGrid
  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 }, // Coloana pentru prenume
    { field: "lastName", headerName: "Last Name", flex: 1 }, // Coloana pentru numele de familie
    { field: "email", headerName: "Email", flex: 1 }, // Coloana pentru email
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5, // Ajustare dinamică a lățimii
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenModal(params.row.id)}>
          <Delete color="error" />
        </IconButton>
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>; // Afișează un mesaj de încărcare
  }

  // Nu afișa nimic dacă utilizatorul nu este admin
  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <Header />
      <Box
        sx={{
          marginTop: 3,
          marginX: 2,
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#333333", // Fundal pentru antetul coloanei
              color: "#ffffff", // Text alb pentru antet
              fontSize: "16px",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#ffffff", // Fundal alb pentru rânduri
              color: "#000000", // Text negru pentru rânduri
              "&:hover": {
                backgroundColor: "#f0f0f0", // Fundal gri deschis la hover
              },
            },
          }}
          rows={users}
          columns={columns}
          pageSize={10} // Număr de rânduri per pagină
          rowsPerPageOptions={[10]} // Opțiuni pentru rânduri pe pagină
          disableRowSelectionOnClick // Dezactivează selecția rândurilor la clic
          autoHeight // Setare automată a înălțimii
        />
      </Box>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AllUsers;