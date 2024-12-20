import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import Header from "./Header";

function Bratari() {
  const [products, setProducts] = useState([]); // Stare pentru produsele filtrate
  const [cart, setCart] = useState([]); // Stare pentru coșul de cumpărături
  const [selectedProduct, setSelectedProduct] = useState(null); // Stare pentru produsul selectat
  const navigate = useNavigate(); // Utilizat pentru navigare
 
  useEffect(() => {
    // Obține produsele din localStorage și filtrează după "Cercei Mari"
    const savedProducts = JSON.parse(localStorage.getItem("produse")) || [];
    const filteredProducts = savedProducts.filter((product) =>
      product.denumire.includes("Bratari")
    ); // Filtrează produsele care conțin "Cercei Mari" în denumire
    setProducts(filteredProducts); // Actualizează starea cu produsele filtrate
  }, []);

  const addToCart = (product) => {
    // Navighează către pagina OrderDetails
    navigate("/order-detalis");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Setează produsul selectat pentru afișare
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null); // Resetează produsul selectat
  };

  return (
    <div>
      <Header /> {/* Componenta pentru antet */}
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h4" textAlign="center" marginBottom={4}>
           Bratari
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
                  onClick={() => handleProductClick(product)} // Deschide dialogul pentru imagine
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
                  onClick={() => addToCart(product)} // Adaugă produsul în coș
                  sx={{ borderRadius: 0 }}
                >
                  Pune în coș
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog pentru afișarea imaginii mărite */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onClose={handleCloseDialog}>
            <DialogContent>
              <img
                src={selectedProduct.poza}
                alt={selectedProduct.denumire}
                style={{ width: "100%", height: "auto" }}
              />
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </div>
  );
}

export default Bratari;