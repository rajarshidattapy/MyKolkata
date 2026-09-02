import React from 'react';
import { UserProfile, useUser } from '@clerk/nextjs';

function Profile() {
  const { user, isLoaded: userLoaded } = useUser();

  // Show loading while user data is being fetched
  if (!userLoaded) {
    return (
      <div className="min-h-screen p-4 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-16 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={user?.imageUrl || '/micon.png'}
                alt={user?.fullName || 'Profile'}
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {user?.fullName || 'Welcome!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {user?.primaryEmailAddress?.emailAddress || user?.primaryPhoneNumber?.phoneNumber || 'MyKolkata Explorer'}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {user?.emailAddresses?.length > 0 && (
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    📧 Email Verified
                  </span>
                )}
                {user?.phoneNumbers?.length > 0 && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    📱 Phone Verified
                  </span>
                )}
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">
                  🏙️ Kolkata Explorer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {user?.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Days with us</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {user?.emailAddresses?.length || 0 + user?.phoneNumbers?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Contact Methods</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">Active</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Account Status</div>
          </div>
        </div>

        {/* Profile Management - Clerk UserProfile Component */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2">Manage Your Profile</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Update your personal information, security settings, and preferences.
            </p>
          </div>
          
          <div className="p-6">
            <UserProfile
              routing="virtual"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none bg-transparent",
                  navbar: "bg-gray-50 dark:bg-gray-800 rounded-lg mb-6",
                  navbarButton: "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-md",
                  navbarButtonActive: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
                  pageScrollBox: "bg-transparent",
                  formButtonPrimary: "bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors",
                  formFieldInput: "border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
                  formFieldLabel: "text-gray-700 dark:text-gray-300 font-medium",
                  headerTitle: "text-xl font-bold text-gray-900 dark:text-white",
                  headerSubtitle: "text-gray-600 dark:text-gray-400",
                  socialButtonsIconButton: "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700",
                },
                variables: {
                  colorPrimary: "#ea580c",
                  colorBackground: "transparent",
                  colorInputBackground: "#ffffff",
                  colorInputText: "#111827",
                  borderRadius: "0.5rem",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile