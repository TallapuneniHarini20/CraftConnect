import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Mic, MicOff, Save, X, Upload, DollarSign, Tag, User, Package, TrendingUp, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { ArtisanProducts } from '@/entities/artisanproducts';
import { Link } from 'react-router-dom';

// Voice recognition interface
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface ProductFormData {
  _id?: string;
  productTitle: string;
  productDescription: string;
  productImage: string;
  productPrice: number | undefined;
  productCategory: string;
  artisanName: string;
}

export default function ArtisanDashboardPage() {
  const [products, setProducts] = useState<ArtisanProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ArtisanProducts | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState<ProductFormData>({
    productTitle: '',
    productDescription: '',
    productImage: '',
    productPrice: undefined,
    productCategory: '',
    artisanName: ''
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const categories = ['pottery', 'jewelry', 'textiles', 'woodwork', 'painting', 'sculpture', 'other'];

  useEffect(() => {
    fetchProducts();
    initializeSpeechRecognition();
  }, []);

  const initializeSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setFormData(prev => ({
            ...prev,
            productDescription: prev.productDescription + (prev.productDescription ? ' ' : '') + transcript
          }));
        };
        
        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          alert('Voice recognition failed. Please try again.');
        };
        
        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const { items } = await BaseCrudService.getAll<ArtisanProducts>('artisanproducts');
      setProducts(items);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, productImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert('Voice recognition is not supported in your browser');
      return;
    }
    
    setIsRecording(true);
    recognitionRef.current.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const resetForm = () => {
    setFormData({
      productTitle: '',
      productDescription: '',
      productImage: '',
      productPrice: undefined,
      productCategory: '',
      artisanName: ''
    });
    setSelectedImage(null);
    setImagePreview('');
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: ArtisanProducts) => {
    setEditingProduct(product);
    setFormData({
      _id: product._id,
      productTitle: product.productTitle || '',
      productDescription: product.productDescription || '',
      productImage: product.productImage || '',
      productPrice: product.productPrice,
      productCategory: product.productCategory || '',
      artisanName: product.artisanName || ''
    });
    setImagePreview(product.productImage || '');
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productTitle || !formData.productDescription || !formData.artisanName) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const productData: ArtisanProducts = {
        _id: editingProduct?._id || crypto.randomUUID(),
        productTitle: formData.productTitle,
        productDescription: formData.productDescription,
        productImage: formData.productImage,
        productPrice: formData.productPrice,
        productCategory: formData.productCategory || 'other',
        artisanName: formData.artisanName,
        _createdDate: editingProduct?._createdDate || new Date(),
        _updatedDate: new Date()
      };

      if (editingProduct) {
        await BaseCrudService.update('artisanproducts', productData);
        alert('Product updated successfully!');
      } else {
        await BaseCrudService.create('artisanproducts', productData);
        alert('Product added successfully!');
      }
      
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await BaseCrudService.delete('artisanproducts', productId);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, product) => sum + (product.productPrice || 0), 0),
    categories: [...new Set(products.map(p => p.productCategory).filter(Boolean))].length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-background border-b border-light-gray">
        <div className="max-w-[100rem] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-heading text-primary font-bold">Artisan Dashboard</h1>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/marketplace" className="text-foreground hover:text-primary font-paragraph">
                  View Marketplace
                </Link>
                <Link to="/profile" className="text-foreground hover:text-primary font-paragraph">
                  Profile
                </Link>
              </div>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[100rem] mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-light-gray bg-background">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-secondary text-sm">Total Products</p>
                  <p className="font-heading text-2xl text-foreground font-bold">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-light-gray bg-background">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-secondary text-sm">Total Value</p>
                  <p className="font-heading text-2xl text-foreground font-bold">${stats.totalValue}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-light-gray bg-background">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-secondary text-sm">Categories</p>
                  <p className="font-heading text-2xl text-foreground font-bold">{stats.categories}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="border border-light-gray bg-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-foreground">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetForm}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="artisanName" className="font-paragraph text-foreground">
                        Artisan Name *
                      </Label>
                      <Input
                        id="artisanName"
                        value={formData.artisanName}
                        onChange={(e) => setFormData(prev => ({ ...prev, artisanName: e.target.value }))}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="productTitle" className="font-paragraph text-foreground">
                        Product Title *
                      </Label>
                      <Input
                        id="productTitle"
                        value={formData.productTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, productTitle: e.target.value }))}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="productDescription" className="font-paragraph text-foreground">
                      Product Description *
                    </Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                          variant={isRecording ? "destructive" : "outline"}
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          {isRecording ? (
                            <>
                              <MicOff className="w-4 h-4" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="w-4 h-4" />
                              Voice Input
                            </>
                          )}
                        </Button>
                        {isRecording && (
                          <div className="flex items-center gap-2 text-destructive">
                            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                            <span className="text-sm font-paragraph">Recording...</span>
                          </div>
                        )}
                      </div>
                      <Textarea
                        id="productDescription"
                        value={formData.productDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
                        className="min-h-24"
                        placeholder="Describe your product or use voice input..."
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="productPrice" className="font-paragraph text-foreground">
                        Price ($)
                      </Label>
                      <Input
                        id="productPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.productPrice || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          productPrice: e.target.value ? parseFloat(e.target.value) : undefined 
                        }))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="productCategory" className="font-paragraph text-foreground">
                        Category
                      </Label>
                      <Select 
                        value={formData.productCategory} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, productCategory: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="productImage" className="font-paragraph text-foreground">
                      Product Image
                    </Label>
                    <div className="mt-2 border-2 border-dashed border-light-gray rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Input
                        id="productImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="productImage" className="cursor-pointer">
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Product preview"
                            width={200}
                            className="rounded-lg mx-auto mb-2"
                          />
                        ) : (
                          <div>
                            <Upload className="w-12 h-12 text-secondary mx-auto mb-2" />
                            <p className="font-paragraph text-secondary">Click to upload an image</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {editingProduct ? 'Update Product' : 'Add Product'}
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Products List */}
        <Card className="border border-light-gray bg-background">
          <CardHeader>
            <CardTitle className="font-heading text-foreground">Your Products</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-light-gray mx-auto mb-4" />
                <h3 className="text-xl font-heading text-foreground mb-2">No products yet</h3>
                <p className="font-paragraph text-secondary mb-4">Add your first product to get started</p>
                <Button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  >
                    <Card className="border border-light-gray hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        {product.productImage && (
                          <Image
                            src={product.productImage}
                            alt={product.productTitle || 'Product'}
                            width={300}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        
                        <div className="p-4">
                          <h3 className="font-heading text-lg text-foreground mb-2 line-clamp-1">
                            {product.productTitle}
                          </h3>
                          <p className="font-paragraph text-secondary text-sm mb-3 line-clamp-2">
                            {product.productDescription}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            {product.productPrice && (
                              <span className="font-heading text-lg text-primary font-semibold">
                                ${product.productPrice}
                              </span>
                            )}
                            {product.productCategory && (
                              <span className="bg-light-gray text-secondary text-xs px-2 py-1 rounded">
                                {product.productCategory}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                              className="flex-1"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(product._id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}