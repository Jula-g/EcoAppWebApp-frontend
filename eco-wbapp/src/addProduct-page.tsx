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
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import MenuAppBar from './menu-bar/MenuAppBar';
import { useApi } from './apiContext';
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
  const theme = useTheme();
  const api = useApi();
  const navigate = useNavigate();

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

  // Form state
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    condition: '',
    category: '',
    subcategory: '',
    status: '',
    style: '',
    transactionType: '',
    adress: { street: '', city: '', zip: '' },
  });

  /**
   * Handles input changes in the form
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when category changes
    setFormValues((prev) => ({ ...prev, category, subcategory: '' })); // Reset form subcategory
  };

  const handleSubcategoryChange = (event: SelectChangeEvent<string>) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
    setFormValues((prev) => ({ ...prev, subcategory }));
  };

  /**
   * Handles file selection via input or drag-and-drop
   */
  const handleFileChange = (files: FileList) => {
    const filesArray = Array.from(files);
    setSelectedImages((prev) => [...prev, ...filesArray]);
  };

  /**
   * Handles drag events
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files) {
      handleFileChange(event.dataTransfer.files);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleZoneClick = () => {
    document.getElementById('image-upload')?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFileChange(event.target.files);
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    // 'MRgrch6uUdse4xDQUJLQ'
    const userId = user.userId;
    const formData = new FormData();

    // Append form fields
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof typeof formValues];
      console.log(key, value);
      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value)); // Convert address to JSON string
      } else {
        formData.append(key, value);
      }
    });



    // Append images as files
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await api.createProduct(
        userId,
        formValues as any,
        selectedImages
      );
      if (response.success) {
        alert('Product created successfully!');
        // Reset form
        setFormValues({
          name: '',
          description: '',
          price: '',
          condition: '',
          category: '',
          subcategory: '',
          status: '',
          style: '',
          transactionType: '',
          adress: { street: '', city: '', zip: '' },
        });
        setSelectedImages([]);
        navigate('/shop-page');
      } else if (response.status === 403) {
        alert('You are not authorized to create a product.');
      } else {
        alert('Failed to create product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the product.');
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#EFE3C2', minHeight: '100vh' }}>
        <MenuAppBar />

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
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleInputChange}
                  value={formValues.name}
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
                  onChange={handleInputChange}
                  value={formValues.description}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  name="price"
                  type="number"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleInputChange}
                  value={formValues.price}
                />

                {/* Condition */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="condition-label">Condition</InputLabel>
                  <Select labelId="condition-label" id="condition" name="condition" label="Condition" value={formValues.condition} onChange={handleSelectChange}>
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
                    value={selectedCategory} onChange={handleCategoryChange}
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
                    value={selectedSubcategory} onChange={handleSubcategoryChange}
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
                    value={formValues.status}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    {/* <MenuItem value="SOLD">Sold</MenuItem> */}
                    <MenuItem value="Reserved">Reserved</MenuItem>
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
                    value={formValues.transactionType}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Sale">Sale</MenuItem>
                    <MenuItem value="Exchange">Exchange</MenuItem>
                    <MenuItem value="Give away">Give away</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Style (optional)"
                  variant="outlined"
                  name="style"
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleInputChange}
                  value={formValues.style}
                />
              </Grid>

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
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#123524',
                    color: '#EFE3C2',
                    width: '100%',
                  }}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box >
    </>
  );
}

export default AddProductPage;
