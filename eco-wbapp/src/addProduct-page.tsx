import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CssBaseline,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme, // <-- Import this to style drag area feedback
} from '@mui/material';
import { useAuth } from './authContext';
import MenuAppBar from './menu-bar/MenuAppBar';
import { useApi } from './apiContext';
import { useNavigate } from 'react-router-dom';


function AddProductPage() {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const apiClient = useApi();

  const conditions = ["New", "Excellent", "Good", "Fair", "Poor"];
  const categories = ["Food", "Furniture", "Women's Clothing", "Men's Clothing", "Electronics", "Books"];
  const subcategories: Record<string, string[]> = {
    Food: ["Fruits", "Vegetables", "Snacks", "Conserves", "Bakery", "Canned Food", "Grains", "Sweets", "Others"],
    Furniture: ["Tables", "Chairs", "Beds", "Sofas", "Closets", "Desks", "Lamps", "Decoration", "Bookshelves", "Rugs", "Storage", "Outdoor Furniture", "Other Furniture"],
    "Women's Clothing": ["Women's Shirts", "Women's Pants", "Women's Jackets", "Dresses", "Skirts", "Women's Shorts", "Women's Sweaters", "Women's Sportswear", "Women's Coats", "Women's Shoes", "Women's Accessories"],
    "Men's Clothing": ["Men's Shirts", "Men's Pants", "Men's Jackets", "Men's Shorts", "Men's Sweaters", "Men's Sportswear", "Men's Coats", "Men's Shoes", "Men's Accessories"],
    Electronics: ["Mobile Phones", "Computers", "TV", "Cameras", "Games and Consoles", "Smartwatches", "Headphones", "Speakers", "Household Appliances", "Printers", "Storage Devices", "Other Electronics"],
    Books: ["Fiction", "Non-Fiction", "Textbooks", "Children's Books", "Biographies", "Mystery", "Fantasy", "Science Fiction", "History", "Romance", "Graphic Novels", "Travel", "Cooking", "Other Books"],
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");


  // State to track uploaded images for preview
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // State to highlight drop zone when dragging
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('AddProductPage loaded by user:', user);
    } else {
      console.log('No user is logged in on AddProductPage.');
    }
  }, [user]);

  /**
   * Convert FileList to an array and set in state for preview.
   */
  const handleFileChange = (files: FileList) => {
    const filesArray = Array.from(files);
    setSelectedImages((prev) => [...prev, ...filesArray]);
  };

  /**
   * Drag-and-Drop Handlers
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files) {
      handleFileChange(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // Trigger hidden input when zone is clicked
  const handleZoneClick = () => {
    document.getElementById('image-upload')?.click();
  };

  // File input change (triggered by button or drop zone click)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFileChange(event.target.files);
    }
  };

  // Handle form submissions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // navigate('/home-page'); //Im using this instead of console logs cuz they never work :)

    // Gather form data
    const form = new FormData(e.currentTarget);
    const formData = new FormData();

    // Append text fields to formData
    formData.append("name", form.get("name") as string);
    formData.append("description", form.get("description") as string);
    formData.append("price", form.get("price") as string);
    formData.append("condition", form.get("condition") as string);
    formData.append("category", form.get("category") as string);
    formData.append("subcategory", form.get("subcategory") as string);
    formData.append("status", form.get("status") as string);
    formData.append("style", form.get("style") as string);
    formData.append("transactionType", form.get("transactionType") as string);

    // Append address fields
    formData.append("adress.street", form.get("adress.street") as string);
    formData.append("adress.city", form.get("adress.city") as string);
    formData.append("adress.zip", form.get("adress.zip") as string);

    // Append images to formData
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    console.log("Form Data:", formData);

    // Perform POST request or service call to create the product
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      console.log("Product created successfully!", result);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <CssBaseline />

      {/* Main wrapper with the same background color as your HomePage */}
      <Box sx={{ backgroundColor: '#EFE3C2', minHeight: '100vh' }}>
        {/* Top Navigation Bar */}
        <MenuAppBar />

        {/* Main content area */}
        <Box
          sx={{
            width: '100%',
            padding: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#EFE3C2',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              fontFamily: 'Comfortaa',
              color: '#123524',
            }}
          >
            Add New Product
          </Typography>

          {/* Two-column form layout */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#fff',
              padding: 3,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Grid container spacing={3}>
              {/* LEFT COLUMN: Form Fields */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={3}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  name="price"
                  type="number"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />

                {/* Condition */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="condition-label">Condition</InputLabel>
                  <Select labelId="condition-label" id="condition" name="condition" label="Condition">
                    {conditions.map((condition) => (
                      <MenuItem key={condition} value={condition}>
                        {condition}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Category */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    label="Category"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubcategory("");
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Subcategory */}
                <FormControl fullWidth required sx={{ mb: 2 }} disabled={!selectedCategory}>
                  <InputLabel id="subcategory-label">Subcategory</InputLabel>
                  <Select
                    labelId="subcategory-label"
                    id="subcategory"
                    name="subcategory"
                    label="Subcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                  >
                    {selectedCategory &&
                      subcategories[selectedCategory].map((subcategory) => (
                        <MenuItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                {/* Status */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    label="Status"
                  >
                    <MenuItem value="AVAILABLE">Available</MenuItem>
                    <MenuItem value="SOLD">Sold</MenuItem>
                    <MenuItem value="RESERVED">Reserved</MenuItem>
                  </Select>
                </FormControl>

                {/* Transaction Type */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="transactionType-label">
                    Transaction Type
                  </InputLabel>
                  <Select
                    labelId="transactionType-label"
                    id="transactionType"
                    name="transactionType"
                    label="Transaction Type"
                  >
                    <MenuItem value="SALE">Sale</MenuItem>
                    <MenuItem value="EXCHANGE">Exchange</MenuItem>
                    <MenuItem value="GIVEN_AWAY">Give away</MenuItem>
                  </Select>
                </FormControl>

                {/* Style */}
                <TextField
                  label="Style (optional)"
                  variant="outlined"
                  name="style"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>

              {/* RIGHT COLUMN */}
              <Grid item xs={12} md={6}>
                {/* Address */}
                <Typography variant="h6" sx={{ mb: '40px' }}>
                  Address
                </Typography>
                <TextField
                  label="Street"
                  variant="outlined"
                  name="adress.street"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="City"
                  variant="outlined"
                  name="adress.city"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="ZIP"
                  variant="outlined"
                  name="adress.zip"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />

                <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
                  Product Images
                </Typography>

                {/* Hidden file input */}
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />

                {/* DRAG AND DROP ZONE */}
                <Box
                  // Events to handle dragging
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  // Click to open file dialog
                  onClick={handleZoneClick}
                  sx={{
                    cursor: 'pointer',
                    border: `2px dashed ${isDragging
                      ? theme.palette.primary.main
                      : theme.palette.grey[400]
                      }`,
                    borderRadius: 2,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.3s',
                    backgroundColor: isDragging
                      ? theme.palette.action.hover
                      : 'transparent',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {isDragging
                      ? 'Drop your images here'
                      : 'Drag & Drop your images here'}
                  </Typography>
                </Box>

                {/* Preview of images in a scrollable row */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: 2,
                    mt: 2,
                    pb: 1,
                  }}
                >
                  {selectedImages.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <Box
                        key={index}
                        sx={{
                          minWidth: 120,
                          maxWidth: 120,
                          height: 120,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={url}
                          alt={`preview-${index}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: 'text.secondary' }}
                >
                  Select or drop multiple images to showcase your product from
                  different angles.
                </Typography>

                {/* Submit Button (spans both columns) */}
                <Box
                  sx={{
                    width: '100%',
                    mt: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#123524',
                      color: '#EFE3C2',
                      width: '100%',
                      fontSize: '20px',
                      fontFamily: 'Comfortaa',
                      borderRadius: '8px',
                    }}
                  >
                    Create Product
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#123524',
            color: '#ffffff',
            padding: '30px 20px',
            textAlign: 'center',
            marginTop: '60px',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              color: '#85A947',
            }}
          >
            &copy; {new Date().getFullYear()} EcoStore. Crafted with care for
            our planet.
          </Typography>
        </Box>
      </Box>
    </>
  );
}


export default AddProductPage;
