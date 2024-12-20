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
  TextField,
} from "@mui/material";
import Header from "./Header";

function ModificareProdus() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    // Obține produsele din localStorage
    const savedProducts = JSON.parse(localStorage.getItem("produse")) || [];
    setProducts(savedProducts);
  }, []);

  const handleEditClick = (product) => {
    setEditedProduct({ ...product }); // Setăm produsul selectat pentru editare
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedProduct((prev) => ({ ...prev, poza: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("produse", JSON.stringify(updatedProducts)); // Salvează modificările în localStorage
    setEditedProduct(null); // Închide dialogul de editare
  };

  return (
    <div>
    <Header />
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
                  onClick={() => handleEditClick(product)}
                  sx={{ borderRadius: 0 }}
                >
                  Modifică
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog pentru editarea produsului */}
        {editedProduct && (
          <Dialog open={!!editedProduct} onClose={() => setEditedProduct(null)}>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
                Modifică Produsul
              </Typography>
              <TextField
                name="denumire"
                label="Denumire"
                value={editedProduct.denumire}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="detalii"
                label="Detalii"
                value={editedProduct.detalii}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                name="pret"
                label="Preț (Lei)"
                value={editedProduct.pret}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="categorie"
                label="Categorie"
                value={editedProduct.categorie}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "1rem" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Salvează
              </Button>
            </DialogContent>
          </Dialog>
        )}

        {/* Dialog pentru afișarea imaginii mărite */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
            <DialogContent>
              <img
                src={selectedProduct.poza}
                alt={selectedProduct.denumire}
                style={{ width: "280px", height: "auto" }}
              />
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </div>
  );
}

export default ModificareProdus;
