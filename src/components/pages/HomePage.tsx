import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Video, Wand2, Mic, MicOff, ShoppingBag, Store, Heart, MessageCircle, Share2, MoreHorizontal, Globe, Camera, Plus, Search, User, Users, Bookmark, Eye, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { GeneratedCrafts } from '@/entities/generatedcrafts';
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

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [localDescription, setLocalDescription] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    description: string;
    videoPreview?: string;
  } | null>(null);
  
  // Product form fields
  const [productPrice, setProductPrice] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');
  const [artisanName, setArtisanName] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
  const [languageSearch, setLanguageSearch] = useState<string>('');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Close language dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageDropdownOpen && !target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
        setLanguageSearch('');
      }
    };
    
    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);
  
  const fetchPosts = async () => {
    try {
      const { items } = await BaseCrudService.getAll<ArtisanProducts>('artisanproducts');
      setPosts(items.reverse()); // Show newest first
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  const languages = [
    { code: 'en-US', name: 'English (US)', nativeName: 'English' },
    { code: 'es-ES', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr-FR', name: 'French', nativeName: 'Français' },
    { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
    { code: 'it-IT', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt-BR', name: 'Portuguese', nativeName: 'Português' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)', nativeName: '中文' },
    { code: 'ja-JP', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko-KR', name: 'Korean', nativeName: '한국어' },
    { code: 'ar-SA', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ru-RU', name: 'Russian', nativeName: 'Русский' },
    { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'ur-IN', name: 'Urdu', nativeName: 'اردو' },
    { code: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as-IN', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'ne-NP', name: 'Nepali', nativeName: 'नेपाली' },
    { code: 'si-LK', name: 'Sinhala', nativeName: 'සිංහල' },
    { code: 'my-MM', name: 'Myanmar', nativeName: 'မြန်မာ' },
    { code: 'th-TH', name: 'Thai', nativeName: 'ไทย' },
    { code: 'vi-VN', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { code: 'id-ID', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    { code: 'ms-MY', name: 'Malay', nativeName: 'Bahasa Melayu' },
    { code: 'tl-PH', name: 'Filipino', nativeName: 'Filipino' },
    { code: 'sw-KE', name: 'Swahili', nativeName: 'Kiswahili' },
    { code: 'am-ET', name: 'Amharic', nativeName: 'አማርኛ' },
    { code: 'he-IL', name: 'Hebrew', nativeName: 'עברית' },
    { code: 'tr-TR', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'pl-PL', name: 'Polish', nativeName: 'Polski' },
    { code: 'nl-NL', name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'sv-SE', name: 'Swedish', nativeName: 'Svenska' },
    { code: 'da-DK', name: 'Danish', nativeName: 'Dansk' },
    { code: 'no-NO', name: 'Norwegian', nativeName: 'Norsk' },
    { code: 'fi-FI', name: 'Finnish', nativeName: 'Suomi' },
    { code: 'cs-CZ', name: 'Czech', nativeName: 'Čeština' },
    { code: 'sk-SK', name: 'Slovak', nativeName: 'Slovenčina' },
    { code: 'hu-HU', name: 'Hungarian', nativeName: 'Magyar' },
    { code: 'ro-RO', name: 'Romanian', nativeName: 'Română' },
    { code: 'bg-BG', name: 'Bulgarian', nativeName: 'Български' },
    { code: 'hr-HR', name: 'Croatian', nativeName: 'Hrvatski' },
    { code: 'sr-RS', name: 'Serbian', nativeName: 'Српски' },
    { code: 'sl-SI', name: 'Slovenian', nativeName: 'Slovenščina' },
    { code: 'et-EE', name: 'Estonian', nativeName: 'Eesti' },
    { code: 'lv-LV', name: 'Latvian', nativeName: 'Latviešu' },
    { code: 'lt-LT', name: 'Lithuanian', nativeName: 'Lietuvių' },
    { code: 'uk-UA', name: 'Ukrainian', nativeName: 'Українська' },
    { code: 'be-BY', name: 'Belarusian', nativeName: 'Беларуская' },
    { code: 'mk-MK', name: 'Macedonian', nativeName: 'Македонски' },
    { code: 'sq-AL', name: 'Albanian', nativeName: 'Shqip' },
    { code: 'mt-MT', name: 'Maltese', nativeName: 'Malti' },
    { code: 'is-IS', name: 'Icelandic', nativeName: 'Íslenska' },
    { code: 'ga-IE', name: 'Irish', nativeName: 'Gaeilge' },
    { code: 'cy-GB', name: 'Welsh', nativeName: 'Cymraeg' },
    { code: 'eu-ES', name: 'Basque', nativeName: 'Euskera' },
    { code: 'ca-ES', name: 'Catalan', nativeName: 'Català' },
    { code: 'gl-ES', name: 'Galician', nativeName: 'Galego' },
    { code: 'af-ZA', name: 'Afrikaans', nativeName: 'Afrikaans' },
    { code: 'zu-ZA', name: 'Zulu', nativeName: 'isiZulu' },
    { code: 'xh-ZA', name: 'Xhosa', nativeName: 'isiXhosa' }
  ];

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(languageSearch.toLowerCase()) ||
    lang.code.toLowerCase().includes(languageSearch.toLowerCase())
  );

  const categories = ['pottery', 'jewelry', 'textiles', 'woodwork', 'painting', 'sculpture', 'other'];

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = selectedLanguage;
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setLocalDescription(prev => prev + (prev ? ' ' : '') + transcript);
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
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [selectedLanguage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
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
    recognitionRef.current.lang = selectedLanguage;
    recognitionRef.current.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleTranslateAndGenerate = async () => {
    if (!selectedImage || !localDescription.trim()) {
      alert('Please upload an image and enter a description');
      return;
    }

    setIsTranslating(true);
    try {
      // Mock API call for translation and description generation
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      const mockTitle = 'Handcrafted Artisan Pottery Bowl';
      const mockDescription = 'A beautifully handcrafted ceramic bowl featuring traditional glazing techniques. This unique piece showcases the artisan\'s skill in creating functional art that brings warmth and character to any home. Perfect for serving or as a decorative centerpiece.';
      
      setGeneratedContent({
        title: mockTitle,
        description: mockDescription
      });
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!selectedImage || !generatedContent) {
      alert('Please translate and generate description first');
      return;
    }

    setIsGeneratingVideo(true);
    try {
      // Mock API call for video generation
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API delay
      
      const mockVideoUrl = 'https://static.wixstatic.com/media/ae4fc6_9534e8344d024b3290a63dcb4e29eaed~mv2.png?originWidth=576&originHeight=384';
      
      setGeneratedContent(prev => prev ? {
        ...prev,
        videoPreview: mockVideoUrl
      } : null);

      // Save to database
      const craftData: GeneratedCrafts = {
        _id: crypto.randomUUID(),
        craftImage: imagePreview,
        localDescription,
        generatedEnglishTitle: generatedContent.title,
        generatedEnglishDescription: generatedContent.description,
        generatedVideoPreview: mockVideoUrl,
        _createdDate: new Date(),
        _updatedDate: new Date()
      };

      await BaseCrudService.create('generatedcrafts', craftData);
      
      // Show product form after video generation
      setShowPostForm(true);
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Failed to generate video. Please try again.');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleSubmitProduct = async () => {
    if (!selectedImage || !generatedContent || !artisanName) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const productData: ArtisanProducts = {
        _id: crypto.randomUUID(),
        productTitle: generatedContent.title,
        productDescription: generatedContent.description,
        productImage: imagePreview,
        productPrice: productPrice ? parseFloat(productPrice) : undefined,
        productCategory: productCategory || 'other',
        artisanName,
        _createdDate: new Date(),
        _updatedDate: new Date()
      };

      await BaseCrudService.create('artisanproducts', productData);
      
      alert('Post shared successfully!');
      
      // Reset form
      setSelectedImage(null);
      setImagePreview('');
      setLocalDescription('');
      setGeneratedContent(null);
      setProductPrice('');
      setProductCategory('');
      setArtisanName('');
      setShowPostForm(false);
      
      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to share post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* LinkedIn-style Header */}
      <header className="bg-background border-b border-light-gray sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-heading text-primary font-bold">CraftShare</h1>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/home" className="text-foreground hover:text-primary font-paragraph">Home</Link>
                <Link to="/marketplace" className="text-foreground hover:text-primary font-paragraph">Marketplace</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowPostForm(!showPostForm)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share Craft
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[100rem] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* My Profile Card */}
            <Card className="border border-light-gray bg-background">
              <CardContent className="p-0">
                {/* Profile Header */}
                <div className="relative">
                  <div className="h-16 bg-gradient-to-r from-primary to-primary/80 rounded-t-lg"></div>
                  <div className="absolute -bottom-8 left-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center border-4 border-background">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="pt-10 px-4 pb-4">
                  <h3 className="font-heading text-lg text-foreground font-semibold">My Profile</h3>
                  <p className="font-paragraph text-secondary text-sm mb-3">Artisan & Craft Creator</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-secondary">Profile views</span>
                      <span className="font-paragraph text-primary font-semibold">127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-secondary">Post impressions</span>
                      <span className="font-paragraph text-primary font-semibold">1,234</span>
                    </div>
                  </div>
                  
                  <Link to="/profile" className="block mt-3">
                    <Button variant="outline" className="w-full font-paragraph text-sm">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-light-gray bg-background">
              <CardContent className="p-4">
                <h4 className="font-heading text-foreground font-semibold mb-3">Your Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-paragraph text-foreground text-sm font-medium">Profile views</p>
                      <p className="font-paragraph text-secondary text-xs">+12 this week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-paragraph text-foreground text-sm font-medium">Post engagement</p>
                      <p className="font-paragraph text-secondary text-xs">+25% increase</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-paragraph text-foreground text-sm font-medium">Achievements</p>
                      <p className="font-paragraph text-secondary text-xs">3 new badges</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border border-light-gray bg-background">
              <CardContent className="p-4">
                <h4 className="font-heading text-foreground font-semibold mb-3">Quick Access</h4>
                <div className="space-y-2">
                  <Link to="/marketplace" className="flex items-center gap-3 p-2 rounded-lg hover:bg-light-gray transition-colors">
                    <Store className="w-4 h-4 text-secondary" />
                    <span className="font-paragraph text-foreground text-sm">Marketplace</span>
                  </Link>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-light-gray transition-colors cursor-pointer">
                    <Bookmark className="w-4 h-4 text-secondary" />
                    <span className="font-paragraph text-foreground text-sm">Saved Posts</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-light-gray transition-colors cursor-pointer">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="font-paragraph text-foreground text-sm">My Network</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Welcome Message for New Users */}
            <Card className="border border-light-gray bg-background">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-heading text-foreground font-semibold mb-2">Welcome to CraftShare</h4>
                  <p className="font-paragraph text-secondary text-sm mb-3">
                    Connect with artisans worldwide and showcase your beautiful crafts
                  </p>
                  <Button 
                    onClick={() => setShowPostForm(true)}
                    size="sm" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Share Your First Craft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Creation Form */}
            {showPostForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background border border-light-gray rounded-lg p-6"
              >
                <h3 className="font-heading text-xl text-foreground mb-4">Share Your Craft</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="artisan-name" className="font-paragraph text-foreground">
                      Your Name *
                    </Label>
                    <Input
                      id="artisan-name"
                      placeholder="Enter your name"
                      value={artisanName}
                      onChange={(e) => setArtisanName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image-upload" className="font-paragraph text-foreground">
                      Craft Image
                    </Label>
                    <div className="mt-2 border-2 border-dashed border-light-gray rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Uploaded craft preview"
                            width={200}
                            className="rounded-lg mx-auto mb-2"
                          />
                        ) : (
                          <div>
                            <Camera className="w-12 h-12 text-secondary mx-auto mb-2" />
                            <p className="font-paragraph text-secondary">Click to upload an image</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="language" className="font-paragraph text-foreground">
                      Voice Input Language
                    </Label>
                    <div className="relative mt-1 language-dropdown">
                      <div 
                        className="flex items-center justify-between w-full px-3 py-2 text-sm border border-light-gray rounded-md bg-background cursor-pointer hover:border-primary"
                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                      >
                        <span className="font-paragraph text-foreground">
                          {languages.find(lang => lang.code === selectedLanguage)?.name || 'Select language'}
                        </span>
                        <div className="text-secondary">▼</div>
                      </div>
                      
                      {isLanguageDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-background border border-light-gray rounded-md shadow-lg max-h-60 overflow-hidden">
                          <div className="p-2 border-b border-light-gray">
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
                              <Input
                                placeholder="Search languages..."
                                value={languageSearch}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  setLanguageSearch(e.target.value);
                                }}
                                onFocus={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                className="pl-8 text-sm"
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredLanguages.length > 0 ? (
                              filteredLanguages.map(lang => (
                                <div
                                  key={lang.code}
                                  className="px-3 py-2 hover:bg-light-gray cursor-pointer flex items-center justify-between"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedLanguage(lang.code);
                                    setIsLanguageDropdownOpen(false);
                                    setLanguageSearch('');
                                  }}
                                >
                                  <span className="font-paragraph text-foreground text-sm">
                                    {lang.name}
                                  </span>
                                  <span className="font-paragraph text-secondary text-xs">
                                    {lang.nativeName}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="px-3 py-2 text-secondary text-sm">
                                No languages found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="font-paragraph text-foreground">
                      Description (Your Language)
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
                              Stop
                            </>
                          ) : (
                            <>
                              <Mic className="w-4 h-4" />
                              Voice
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
                        id="description"
                        placeholder="Describe your craft in your local language or use voice input..."
                        value={localDescription}
                        onChange={(e) => setLocalDescription(e.target.value)}
                        className="min-h-24"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleTranslateAndGenerate}
                      disabled={isTranslating || !selectedImage || !localDescription.trim()}
                      className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isTranslating ? (
                        <LoadingSpinner />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      Convert Text
                    </Button>

                    {generatedContent && (
                      <Button
                        onClick={handleSubmitProduct}
                        disabled={isSubmitting || !artisanName}
                        className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                      >
                        {isSubmitting ? (
                          <LoadingSpinner />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                        Share Post
                      </Button>
                    )}
                  </div>

                  {generatedContent && (
                    <div className="border-t border-light-gray pt-4 mt-4">
                      <h4 className="font-heading text-lg text-foreground mb-2">Generated English Content</h4>
                      <div className="bg-light-gray rounded-lg p-4">
                        <h5 className="font-paragraph font-semibold text-foreground mb-1">{generatedContent.title}</h5>
                        <p className="font-paragraph text-secondary text-sm">{generatedContent.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.length === 0 ? (
                <Card className="border border-light-gray bg-background">
                  <CardContent className="p-8 text-center">
                    <ShoppingBag className="w-16 h-16 text-light-gray mx-auto mb-4" />
                    <h3 className="font-heading text-xl text-foreground mb-2">No posts yet</h3>
                    <p className="font-paragraph text-secondary">Be the first to share your craft!</p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  >
                    <Card className="border border-light-gray bg-background hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        {/* Post Header */}
                        <div className="p-4 border-b border-light-gray">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-primary-foreground font-heading font-bold">
                                  {post.artisanName?.charAt(0).toUpperCase() || 'A'}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-paragraph font-semibold text-foreground">
                                  {post.artisanName || 'Anonymous Artisan'}
                                </h4>
                                <p className="font-paragraph text-secondary text-sm flex items-center gap-1">
                                  <Globe className="w-3 h-3" />
                                  {new Date(post._createdDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-4">
                          <h3 className="font-heading text-lg text-foreground mb-2">
                            {post.productTitle}
                          </h3>
                          <p className="font-paragraph text-secondary mb-4">
                            {post.productDescription}
                          </p>
                          
                          {post.productImage && (
                            <Image
                              src={post.productImage}
                              alt={post.productTitle || 'Craft image'}
                              width={500}
                              className="w-full rounded-lg mb-4"
                            />
                          )}

                          {post.productPrice && (
                            <div className="flex items-center gap-2 mb-4">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-paragraph">
                                ${post.productPrice}
                              </span>
                              {post.productCategory && (
                                <span className="bg-light-gray text-secondary px-2 py-1 rounded text-sm font-paragraph">
                                  {post.productCategory}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Post Actions */}
                        <div className="border-t border-light-gray p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-secondary hover:text-primary">
                                <Heart className="w-4 h-4" />
                                <span className="font-paragraph">Like</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-secondary hover:text-primary">
                                <MessageCircle className="w-4 h-4" />
                                <span className="font-paragraph">Comment</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-secondary hover:text-primary">
                                <Share2 className="w-4 h-4" />
                                <span className="font-paragraph">Share</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}