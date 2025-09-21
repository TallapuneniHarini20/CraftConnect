import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit, Camera, Settings, LogOut, Home, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { ArtisanProducts } from '@/entities/artisanproducts';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member, actions } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState<ArtisanProducts[]>([]);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    bio: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    if (member) {
      setProfileData({
        firstName: member.contact?.firstName || '',
        lastName: member.contact?.lastName || '',
        nickname: member.profile?.nickname || '',
        bio: '',
        location: '',
        website: ''
      });
    }
    fetchUserPosts();
  }, [member]);

  const fetchUserPosts = async () => {
    try {
      const { items } = await BaseCrudService.getAll<ArtisanProducts>('artisanproducts');
      // Filter posts by current user (in a real app, you'd filter by user ID)
      setUserPosts(items);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to the backend
    setIsEditing(false);
  };

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-background border-b border-light-gray">
        <div className="max-w-[100rem] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-heading text-primary font-bold">CraftShare</h1>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/home" className="text-foreground hover:text-primary font-paragraph flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                <Link to="/marketplace" className="text-foreground hover:text-primary font-paragraph flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Marketplace
                </Link>
                <Link to="/register" className="text-foreground hover:text-primary font-paragraph">
                  Register
                </Link>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[100rem] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border border-light-gray bg-background">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      {member?.profile?.photo?.url ? (
                        <Image
                          src={member.profile.photo.url}
                          alt="Profile"
                          width={96}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-primary-foreground" />
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-heading text-foreground mb-1">
                    {member?.contact?.firstName && member?.contact?.lastName
                      ? `${member.contact.firstName} ${member.contact.lastName}`
                      : member?.profile?.nickname || 'Artisan User'
                    }
                  </h2>
                  
                  <p className="font-paragraph text-secondary text-sm mb-4">
                    @{member?.profile?.nickname || 'username'}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-secondary">
                      <Mail className="w-4 h-4" />
                      <span className="font-paragraph">{member?.loginEmail || 'No email'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <Calendar className="w-4 h-4" />
                      <span className="font-paragraph">
                        Joined {member?._createdDate ? new Date(member._createdDate).toLocaleDateString() : 'Recently'}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border border-light-gray bg-background mt-6">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg text-foreground mb-4">Your Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-paragraph text-secondary">Posts</span>
                    <span className="font-paragraph text-foreground font-semibold">{userPosts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-paragraph text-secondary">Followers</span>
                    <span className="font-paragraph text-foreground font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-paragraph text-secondary">Following</span>
                    <span className="font-paragraph text-foreground font-semibold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Edit Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border border-light-gray bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading text-foreground">Edit Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="font-paragraph text-foreground">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="font-paragraph text-foreground">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nickname" className="font-paragraph text-foreground">
                        Username
                      </Label>
                      <Input
                        id="nickname"
                        value={profileData.nickname}
                        onChange={(e) => setProfileData(prev => ({ ...prev, nickname: e.target.value }))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="font-paragraph text-foreground">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself and your crafts..."
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location" className="font-paragraph text-foreground">
                          Location
                        </Label>
                        <Input
                          id="location"
                          placeholder="City, Country"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website" className="font-paragraph text-foreground">
                          Website
                        </Label>
                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleSaveProfile} className="bg-primary text-primary-foreground">
                        Save Changes
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* User Posts */}
            <Card className="border border-light-gray bg-background">
              <CardHeader>
                <CardTitle className="font-heading text-foreground">Your Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {userPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-paragraph text-secondary">You haven't shared any crafts yet.</p>
                    <Button className="mt-4 bg-primary text-primary-foreground">
                      Share Your First Craft
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userPosts.slice(0, 6).map((post) => (
                      <div key={post._id} className="border border-light-gray rounded-lg p-4">
                        {post.productImage && (
                          <Image
                            src={post.productImage}
                            alt={post.productTitle || 'Craft'}
                            width={200}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                        )}
                        <h4 className="font-heading text-foreground font-semibold mb-1">
                          {post.productTitle}
                        </h4>
                        <p className="font-paragraph text-secondary text-sm line-clamp-2">
                          {post.productDescription}
                        </p>
                        {post.productPrice && (
                          <p className="font-paragraph text-primary font-semibold mt-2">
                            ${post.productPrice}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}