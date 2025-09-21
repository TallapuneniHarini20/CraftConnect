import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag, User, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { ArtisanProducts } from '@/entities/artisanproducts';

export default function MarketplacePage() {
  const [products, setProducts] = useState<ArtisanProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ArtisanProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const categories = ['all', 'pottery', 'jewelry', 'textiles', 'woodwork', 'painting', 'sculpture', 'other'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange]);

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

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artisanName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.productCategory?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.productPrice || 0;
        switch (priceRange) {
          case '0-50':
            return price >= 0 && price <= 50;
          case '50-100':
            return price > 50 && price <= 100;
          case '100-200':
            return price > 100 && price <= 200;
          case '200+':
            return price > 200;
          default:
            return true;
        }
      });
    }

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <section className="py-16 px-8 bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-15 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full opacity-40 animate-bounce"></div>
        </div>

        <div className="max-w-[100rem] mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-200 to-pink-200 text-orange-900 text-sm font-medium mb-6 border border-orange-300 shadow-md">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Handcrafted with Love
            </div>
            <h1 className="text-5xl font-heading bg-gradient-to-r from-orange-700 via-pink-700 to-yellow-700 bg-clip-text text-transparent mb-4 font-bold">
              Artisan Marketplace
            </h1>
            <p className="text-xl font-paragraph text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Discover unique handcrafted treasures from talented artisans around the world
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-orange-200 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-paragraph text-gray-800 mb-2 font-medium">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-600" />
                  <Input
                    placeholder="Search by title, description, or artisan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-paragraph text-gray-800 mb-2 font-medium">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-orange-200">
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="hover:bg-orange-50">
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-paragraph text-gray-800 mb-2 font-medium">
                  Price Range
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent className="border-orange-200">
                    {priceRanges.map(range => (
                      <SelectItem key={range.value} value={range.value} className="hover:bg-orange-50">
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange('all');
                  }}
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-400 shadow-md"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F97316' fill-opacity='0.2'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-[100rem] mx-auto relative z-10">
          {filteredProducts.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShoppingBag className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-heading bg-gradient-to-r from-orange-700 to-pink-700 bg-clip-text text-transparent mb-2 font-bold">
                No Products Found
              </h3>
              <p className="font-paragraph text-gray-600 text-lg">
                {products.length === 0 
                  ? 'No products have been added to the marketplace yet.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + index * 0.1, duration: 0.5 } }}
                >
                  <Card className="border border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 cursor-pointer group bg-white/90 backdrop-blur-sm hover:bg-white transform hover:scale-105">
                    <Link to={`/product/${product._id}`} className="block">
                      <CardHeader className="p-0 relative overflow-hidden">
                        {product.productImage ? (
                          <div className="relative">
                            <Image
                              src={product.productImage}
                              alt={product.productTitle || 'Product image'}
                              width={300}
                              className="w-full h-48 object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-pink-100 rounded-t-lg flex items-center justify-center group-hover:from-orange-200 group-hover:to-pink-200 transition-colors duration-300">
                            <ShoppingBag className="w-12 h-12 text-orange-500" />
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-lg font-heading text-gray-800 line-clamp-2 group-hover:text-orange-700 transition-colors duration-300 font-semibold">
                              {product.productTitle || 'Untitled Product'}
                            </h3>
                            {product.productCategory && (
                              <span className="inline-block bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 text-xs px-3 py-1 rounded-full mt-2 border border-orange-200 shadow-sm">
                                {product.productCategory}
                              </span>
                            )}
                          </div>

                          <p className="font-paragraph text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {product.productDescription || 'No description available'}
                          </p>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                              </div>
                              <span className="font-paragraph text-sm text-gray-700 font-medium">
                                {product.artisanName || 'Unknown Artisan'}
                              </span>
                            </div>
                            {product.productPrice && (
                              <div className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-1 rounded-full border border-green-200">
                                <DollarSign className="w-4 h-4 text-green-700" />
                                <span className="font-heading text-lg text-green-700 font-bold">
                                  {product.productPrice}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {filteredProducts.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 shadow-md">
                <p className="font-paragraph text-orange-800 font-medium">
                  Showing {filteredProducts.length} of {products.length} beautiful crafts
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}