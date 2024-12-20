import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
} from "@mui/material";
import Header from "./Header";

function Buy() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    surname: "",
    quantity: 1,
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    // Obține produsele din localStorage
    const savedProducts = JSON.parse(localStorage.getItem("produse")) || [];
    setProducts(savedProducts);
  }, []);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    const newOrder = {
      product: selectedProduct,
      ...orderDetails,
    };
    setCart([...cart, newOrder]);
    alert("Produs adăugat în coș!");
    handleCloseDialog();
  };

  return (
    <div>
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h4" textAlign="center" marginBottom={4}>
          Toate Produsele
        </Typography>
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  position: "relative",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.poza}
                  alt={product.denumire}
                  height="200"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
                  }}
                  onClick={() => setSelectedProduct(product)}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.denumire}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.detalii}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.pret} Lei
                  </Typography>
                </CardContent>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenDialog(product)}
                  sx={{ borderRadius: 0 }}
                >
                  Pune în coș
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog pentru detalii comandă */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Detalii Comandă</DialogTitle>
          <DialogContent>
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
              label="Cantitate"
              name="quantity"
              type="number"
              fullWidth
              value={orderDetails.quantity}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Adresă"
              name="address"
              fullWidth
              value={orderDetails.address}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Anulează
            </Button>
            <Button onClick={handleAddToCart} color="primary">
              Adaugă în Coș
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Buy;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function OrderDetails() {
  const navigate = useNavigate();
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  // Inițializăm detaliile comenzii din localStorage sau cu valori implicite
  const [orderDetails, setOrderDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("orderDetails")) || {
      name: "",
      surname: "",
      phone: "",
      email: "",
      address: "",
    };
  });

  // Inițializăm starea pentru pop-up
  const [openPopup, setOpenPopup] = useState(false);
  const [finalOrder, setFinalOrder] = useState(null);

  // Salvăm starea curentă a detaliilor comenzii în localStorage la fiecare schimbare
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

    const order = {
      id: Date.now(), // ID unic pentru comandă
      productId: selectedProduct.id, // ID-ul produsului selectat
      productName: selectedProduct.denumire, // Denumirea produsului
      productPrice: selectedProduct.pret, // Prețul produsului
      ...orderDetails, // Detalii despre client
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Setăm detaliile comenzii în pop-up
    setFinalOrder(order);
    setOpenPopup(true);

    // Resetăm detaliile comenzii după finalizarea comenzii
    localStorage.removeItem("orderDetails");
  };

  const handleViewOtherProducts = () => {
    // Navigăm fără a șterge detaliile existente
    navigate("/");
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" marginY={4}>
        Completează Detaliile Comenzii
      </Typography>
      <Typography variant="h6" marginBottom={2}>
        Produs selectat: {selectedProduct?.denumire || "Niciun produs selectat"}
      </Typography>
      <Typography variant="body1" color="text.secondary" marginBottom={4}>
        Preț: {selectedProduct?.pret || "0"} Lei
      </Typography>
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

      {/* Pop-up pentru afișarea detaliilor comenzii */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Confirmare comandă</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Detalii Comandă</Typography>
          <Typography variant="body1">
            <strong>Produs:</strong> {finalOrder?.productName}
          </Typography>
          <Typography variant="body1">
            <strong>Preț:</strong> {finalOrder?.productPrice} Lei
          </Typography>
          <Typography variant="body1">
            <strong>Nume:</strong> {finalOrder?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Prenume:</strong> {finalOrder?.surname}
          </Typography>
          <Typography variant="body1">
            <strong>Telefon:</strong> {finalOrder?.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {finalOrder?.email}
          </Typography>
          <Typography variant="body1">
            <strong>Adresă:</strong> {finalOrder?.address}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Închide
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default OrderDetails;
