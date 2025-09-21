import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Globe, Star, Sparkles, Heart, Camera, Palette, Zap, Award, Brush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
                  <Brush className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  CraftConnect
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-300 font-medium">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium">
                  Join now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-25 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full opacity-70 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full opacity-50 animate-bounce"></div>
          <div className="absolute top-10 right-20 w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full opacity-35 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <div className="mb-6">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-200 to-pink-200 text-orange-900 mb-4 border border-orange-300 shadow-md"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-orange-700" />
                  Welcome to the future of craftsmanship
                </motion.span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
              >
                Connect with
                <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent block animate-pulse">
                  artisans worldwide
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-gray-700 mb-8 leading-relaxed max-w-lg"
              >
                Join a global community of skilled craftspeople. Discover unique handmade products, 
                showcase your creations, and connect with fellow artisans.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
              >
                <Link to="/marketplace">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <Zap className="mr-2 w-5 h-5" />
                    Browse Marketplace
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Award className="mr-2 w-5 h-5" />
                    Join as Artisan
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-2 border-orange-400 text-orange-700 hover:bg-orange-100 hover:border-orange-500 px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Artisan Login
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600"
              >
                <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 shadow-md border border-orange-200">
                  <Users className="w-4 h-4 mr-1 text-orange-600" />
                  <span className="font-medium">500+ artisans</span>
                </div>
                <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 shadow-md border border-green-200">
                  <Globe className="w-4 h-4 mr-1 text-green-600" />
                  <span className="font-medium">25+ countries</span>
                </div>
                <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 shadow-md border border-yellow-200">
                  <Star className="w-4 h-4 mr-1 text-yellow-600 fill-current" />
                  <span className="font-medium">4.8/5 rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative">
                {/* Main Hero Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white/50"
                >
                  <Image
                    src="https://static.wixstatic.com/media/ae4fc6_ca61b2c26abf45b4ba6dad75e17a7138~mv2.png?originWidth=576&originHeight=384"
                    alt="Artisan crafts showcase"
                    width={600}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-pink-600/10"></div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="hidden xl:block absolute -top-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-orange-200 z-10 transform hover:scale-110 transition-transform duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Share your craft</p>
                      <p className="text-xs text-gray-600">Upload & showcase</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="hidden xl:block absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-green-200 z-10 transform hover:scale-110 transition-transform duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Connect globally</p>
                      <p className="text-xs text-gray-600">Find your community</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-200 to-pink-200 text-orange-900 text-sm font-medium mb-4 border border-orange-300 shadow-md">
              <Award className="w-4 h-4 mr-2" />
              Premium Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-orange-700 to-pink-700 bg-clip-text text-transparent mb-6">
              Why artisans choose CraftConnect
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Everything you need to showcase your crafts, connect with customers, and grow your artisan business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Browse Marketplace",
                description: "Explore authentic handmade products from artisans worldwide - no login required",
                color: "orange",
                gradient: "from-orange-500 to-yellow-500"
              },
              {
                icon: Users,
                title: "Artisan Dashboard",
                description: "Exclusive access for artisans to manage products with voice input features",
                color: "pink",
                gradient: "from-pink-500 to-orange-500"
              },
              {
                icon: Palette,
                title: "Product Management",
                description: "Add, edit, and organize your craft catalog with our intuitive tools",
                color: "yellow",
                gradient: "from-yellow-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-white/90 backdrop-blur-sm group-hover:bg-white border border-orange-200">
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-pink-600 to-yellow-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/15 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-white/25 rounded-full animate-ping"></div>
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-white/15 rounded-full animate-bounce"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/25 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Join thousands of artisans
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to join our
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                creative community?
              </span>
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Start showcasing your crafts and connecting with artisans worldwide. 
              It's free to get started and takes less than 2 minutes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-700 hover:bg-orange-50 hover:text-orange-800 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <Zap className="mr-2 w-5 h-5" />
                  Create your account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/60 backdrop-blur-sm px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Sign in
                </Button>
              </Link>
            </div>
            
            {/* Additional Trust Elements */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/25 shadow-lg">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-orange-100">Active Artisans</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/25 shadow-lg">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-orange-100">Countries</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/25 shadow-lg">
                <div className="text-3xl font-bold text-white mb-2">4.8★</div>
                <div className="text-orange-100">User Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 via-orange-900 to-pink-900 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brush className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
                  CraftConnect
                </h3>
              </div>
              <p className="text-gray-200 mb-6 max-w-md leading-relaxed">
                Connecting artisans worldwide through the power of handmade crafts. 
                Join our community and showcase your unique creations to the world.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                  <span className="text-white font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                  <span className="text-white font-bold">i</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">Platform</h4>
              <ul className="space-y-3 text-gray-200">
                <li><Link to="/marketplace" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Marketplace</Link></li>
                <li><Link to="/home" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Community</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">Support</h4>
              <ul className="space-y-3 text-gray-200">
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-700 mt-12 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 mb-4 md:mb-0">
                &copy; 2024 CraftConnect. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-gray-300 text-sm">
                <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}