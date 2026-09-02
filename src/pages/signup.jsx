import React from 'react';
import { SignUp, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function SignUpPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/home');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while Clerk initializes
  if (!isLoaded || isSignedIn) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p>Loading Sign Up...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Wallpaper */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/login-bg.jpg')", backgroundAttachment: 'fixed' }}
        aria-hidden="true"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center mb-8">
          <img
            src="/micon.png"
            alt="MyKolkata Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Join MyKolkata</h1>
          <p className="text-gray-200 text-center">
            Create your account to explore Kolkata <span className="text-red-500">❤</span>
          </p>
        </div>

        {/* Clerk SignUp Component */}
        <div className="w-full max-w-sm">
          <div className="mb-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 mb-4">
              <h3 className="text-white font-semibold text-center mb-3">Choose your sign-up method:</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• 📧 <strong>Email & Password</strong> - Traditional registration</p>
                <p>• 📱 <strong>Phone & OTP</strong> - Quick SMS verification</p>
                <p>• 🔍 <strong>Google Account</strong> - One-click registration</p>
              </div>
            </div>
          </div>

          <SignUp
            routing="virtual"
            signInUrl="/login"
            fallbackRedirectUrl="/home"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6",
                headerTitle: "text-white text-xl font-bold text-center mb-2",
                headerSubtitle: "text-gray-200 text-sm text-center mb-6",

                // Form inputs
                formFieldInput: "bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-white/30 transition-all",
                formFieldLabel: "text-white font-medium mb-2 block text-sm",

                // Primary buttons
                formButtonPrimary: "w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg",

                // Social buttons (Google)
                socialButtonsBlockButton: "w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 mb-4 flex items-center justify-center space-x-2 border border-gray-300 shadow-md",

                // Alternative identifiers (phone number option)
                alternativeMethodsBlockButton: "w-full bg-blue-500/10 border border-blue-300/30 hover:bg-blue-500/20 hover:border-blue-300/50 text-blue-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 mb-2 flex items-center justify-center space-x-2",

                // Links and text
                footerActionLink: "text-orange-300 hover:text-orange-200 font-medium transition-colors",
                footerActionText: "text-gray-300",

                // Dividers
                dividerLine: "bg-white/20",
                dividerText: "text-gray-300 bg-transparent px-4 text-sm",

                // Form structure
                formFieldRow: "mb-4",
                footer: "text-center mt-4",

                // Verification code input
                formFieldInputShowPasswordButton: "text-gray-300 hover:text-white",

                // OTP/Code inputs
                formFieldInputGroup: "flex space-x-2",

                // Form field hints
                formFieldHintText: "text-gray-400 text-xs mt-1",

                // Loading states
                formButtonReset: "text-orange-300 hover:text-orange-200 text-sm font-medium",
              },
              layout: {
                socialButtonsPlacement: "top",
                socialButtonsVariant: "blockButton",
                showOptionalFields: true,
                termsPageUrl: undefined,
                privacyPageUrl: undefined,
              },
              variables: {
                colorPrimary: "#ea580c",
                colorText: "#ffffff",
                colorTextSecondary: "#d1d5db",
                colorBackground: "transparent",
                colorInputBackground: "rgba(255, 255, 255, 0.1)",
                colorInputText: "#ffffff",
                borderRadius: "0.75rem",
                spacingUnit: "1rem",
              }
            }}
          />

          <p className="text-gray-400 text-center text-xs mt-6 opacity-75">
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
