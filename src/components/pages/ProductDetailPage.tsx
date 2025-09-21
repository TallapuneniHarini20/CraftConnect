import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MessageCircle, Star, Heart, Share2, ShoppingBag, MapPin, Calendar, Tag, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { ArtisanProducts } from '@/entities/artisanproducts';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ArtisanProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;
    
    try {
      const fetchedProduct = await BaseCrudService.getById<ArtisanProducts>('artisanproducts', productId);
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      // If product not found, redirect to marketplace
      navigate('/marketplace');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmittingContact(true);
    
    try {
      // Simulate sending contact message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Thank you ${contactForm.name}! Your message has been sent to ${product?.artisanName}. They will contact you soon.`);
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setShowContactForm(false);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading text-foreground mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/marketplace')}>
            Return to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-light-gray sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/marketplace')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Marketplace
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-2xl font-heading text-primary font-bold">CraftShare</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/marketplace" className="text-foreground hover:text-primary font-paragraph">
                Marketplace
              </Link>
              <Link to="/home" className="text-foreground hover:text-primary font-paragraph">
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[100rem] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              {product.productImage ? (
                <Image
                  src={product.productImage}
                  alt={product.productTitle || 'Product image'}
                  width={600}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-light-gray rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-secondary" />
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-heading text-foreground font-bold mb-2">
                    {product.productTitle}
                  </h1>
                  {product.productCategory && (
                    <span className="inline-block bg-light-gray text-secondary px-3 py-1 rounded-full text-sm">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {product.productCategory.charAt(0).toUpperCase() + product.productCategory.slice(1)}
                    </span>
                  )}
                </div>
                {product.productPrice && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-3xl font-heading text-primary font-bold">
                      <DollarSign className="w-6 h-6" />
                      {product.productPrice}
                    </div>
                    <p className="text-sm font-paragraph text-secondary">Price</p>
                  </div>
                )}
              </div>

              <p className="text-lg font-paragraph text-secondary leading-relaxed">
                {product.productDescription}
              </p>
            </div>

            {/* Product Details */}
            <Card className="border border-light-gray">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg text-foreground font-semibold mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-paragraph text-secondary">Category</span>
                    <span className="font-paragraph text-foreground">
                      {product.productCategory || 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-paragraph text-secondary">Added</span>
                    <span className="font-paragraph text-foreground">
                      {product._createdDate ? new Date(product._createdDate).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-paragraph text-secondary">Last Updated</span>
                    <span className="font-paragraph text-foreground">
                      {product._updatedDate ? new Date(product._updatedDate).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Artisan Info */}
            <Card className="border border-light-gray">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg text-foreground font-semibold mb-4">About the Artisan</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-heading font-bold text-xl">
                      {product.artisanName?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading text-xl text-foreground font-semibold">
                      {product.artisanName || 'Anonymous Artisan'}
                    </h4>
                    <p className="font-paragraph text-secondary">Skilled Craftsperson</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-paragraph text-sm text-secondary ml-1">(5.0)</span>
                    </div>
                  </div>
                </div>
                
                <p className="font-paragraph text-secondary mb-4">
                  A passionate artisan dedicated to creating beautiful, handcrafted pieces with attention to detail and traditional techniques.
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="font-paragraph text-secondary">Location: Available on request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span className="font-paragraph text-secondary">
                      Member since {product._createdDate ? new Date(product._createdDate).getFullYear() : new Date().getFullYear()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="border border-light-gray">
              <CardHeader>
                <CardTitle className="font-heading text-foreground flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Artisan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showContactForm ? (
                  <div className="text-center py-4">
                    <p className="font-paragraph text-secondary mb-4">
                      Interested in this product? Get in touch with {product.artisanName} to discuss details, pricing, and availability.
                    </p>
                    <Button
                      onClick={() => setShowContactForm(true)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="font-paragraph text-foreground">
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-paragraph text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="font-paragraph text-foreground">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-paragraph text-foreground">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={`Hi ${product.artisanName}, I'm interested in your ${product.productTitle}. Could you please provide more details about...`}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="mt-1 min-h-24"
                        required
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={isSubmittingContact}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isSubmittingContact ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}