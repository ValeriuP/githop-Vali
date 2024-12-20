import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  DialogActions,
} from "@mui/material";

function OrderDetails() {
  const navigate = useNavigate();

  // Preluăm ID-ul produsului selectat din localStorage
  const productId = JSON.parse(localStorage.getItem("selectedProductId"));

  // Căutăm produsul în localStorage
  const products = JSON.parse(localStorage.getItem("produse")) || [];
  const selectedProduct = products.find((product) => product.id === productId);

  // Inițializăm detaliile comenzii
  const [orderDetails, setOrderDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("orderDetails")) || {
      name: "",
      surname: "",
      phone: "",
      email: "",
      address: "",
    };
  });

  // Salvăm detaliile comenzii în localStorage la fiecare schimbare
  useEffect(() => {
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  }, [orderDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFinalizeOrder = () => {
    if (!selectedProduct || !selectedProduct.id) {
      alert("Produsul selectat nu are un ID valid!");
      return;
    }

    // Creăm obiectul comenzii
    const order = {
      id: Date.now(),
      productId: selectedProduct.id,
      productName: selectedProduct.denumire,
      productPrice: selectedProduct.pret,
      productCategory: selectedProduct.categorie,
      productDescription: selectedProduct.detalii,
      productImage: selectedProduct.poza,
      ...orderDetails,
    };

    // Salvăm comanda în localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Ștergem detaliile comenzii
    localStorage.removeItem("orderDetails");
    alert("Comanda a fost plasată!");
    navigate("/");
  };

  const handleViewOtherProducts = () => {
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" marginY={4}>
        Completează Detaliile Comenzii
      </Typography>
      {selectedProduct ? (
        <>
          <Typography variant="h6" marginBottom={2}>
            Produs selectat: {selectedProduct.denumire}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom={4}>
            Preț: {selectedProduct.pret} Lei
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom={4}>
            Categorie: {selectedProduct.categorie || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom={4}>
            Descriere: {selectedProduct.detalii || "N/A"}
          </Typography>
          {selectedProduct.poza && (
            <img
              src={selectedProduct.poza}
              alt={selectedProduct.denumire}
              style={{ width: "100%", height: "auto", marginBottom: 20 }}
            />
          )}
        </>
      ) : (
        <Typography variant="h6" color="error" marginBottom={4}>
          Niciun produs selectat
        </Typography>
      )}

      {/* Formulare detalii client */}
      <TextField
        margin="dense"
        label="Nume"
        name="name"
        fullWidth
        value={orderDetails.name}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        label="Prenume"
        name="surname"
        fullWidth
        value={orderDetails.surname}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        label="Număr de Telefon"
        name="phone"
        fullWidth
        value={orderDetails.phone}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        label="Email"
        name="email"
        fullWidth
        value={orderDetails.email}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        label="Adresă completă"
        name="address"
        fullWidth
        value={orderDetails.address}
        onChange={handleInputChange}
      />
      <DialogActions>
        <Button onClick={handleViewOtherProducts} color="secondary">
          Vezi alte produse
        </Button>
        <Button onClick={handleFinalizeOrder} color="primary">
          Finalizează comanda
        </Button>
      </DialogActions>
    </Container>
  );
}

export default OrderDetails;
