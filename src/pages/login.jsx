import React, { useState, useEffect } from 'react';
import { SignIn, SignUp, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Login() {
  const { isSignedIn, isLoaded } = useAuth();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
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
            <p>Loading Login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Wallpaper - Replace '/login-bg.jpg' with your desired image in /public */}
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
          <h1 className="text-2xl font-bold text-white mb-2">MyKolkata</h1>
          <p className="text-gray-200 text-center">
            {isSignUpMode ? 'Join the community' : 'Login to explore Kolkata'} <span className="text-red-500">❤</span>
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="w-full max-w-sm mb-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 flex">
            <button
              onClick={() => setIsSignUpMode(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                !isSignUpMode
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUpMode(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                isSignUpMode
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Clerk Auth Component */}
        <div className="w-full max-w-sm">
          {!isSignUpMode ? (
            <SignIn
              routing="virtual"
              signUpUrl="/signup"
              fallbackRedirectUrl="/home"
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6",
                  headerTitle: "text-white text-xl font-bold text-center mb-2",
                  headerSubtitle: "text-gray-200 text-sm text-center mb-6",
                  formFieldInput: "bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-white/30 transition-all",
                  formFieldLabel: "text-white font-medium mb-2 block text-sm",
                  formButtonPrimary: "w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg",
                  socialButtonsBlockButton: "w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 mb-4 flex items-center justify-center space-x-2 border border-gray-300 shadow-md",
                  alternativeMethodsBlockButton: "w-full bg-blue-500/10 border border-blue-300/30 hover:bg-blue-500/20 hover:border-blue-300/50 text-blue-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 mb-2 flex items-center justify-center space-x-2",
                  footerActionLink: "text-orange-300 hover:text-orange-200 font-medium transition-colors",
                  dividerLine: "bg-white/20",
                  dividerText: "text-gray-300 bg-transparent px-4 text-sm",
                  footer: "text-center mt-4",
                  footerActionText: "text-gray-300",
                  formFieldRow: "mb-4",
                },
                layout: {
                  socialButtonsPlacement: "top",
                  socialButtonsVariant: "blockButton",
                  showOptionalFields: false,
                },
                variables: {
                  colorPrimary: "#ea580c",
                  colorText: "#ffffff",
                  colorTextSecondary: "#d1d5db",
                  colorBackground: "transparent",
                  colorInputBackground: "rgba(255, 255, 255, 0.1)",
                  colorInputText: "#ffffff",
                  borderRadius: "0.75rem",
                }
              }}
            />
          ) : (
            <SignUp
              routing="virtual"
              signInUrl="#"
              fallbackRedirectUrl="/home"
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6",
                  headerTitle: "text-white text-xl font-bold text-center mb-2",
                  headerSubtitle: "text-gray-200 text-sm text-center mb-6",
                  formFieldInput: "bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-white/30 transition-all",
                  formFieldLabel: "text-white font-medium mb-2 block",
                  formButtonPrimary: "w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg",
                  socialButtonsIconButton: "w-full bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/40 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 mb-4 flex items-center justify-center space-x-2",
                  footerActionLink: "text-orange-300 hover:text-orange-200 font-medium transition-colors",
                  dividerLine: "bg-white/20",
                  dividerText: "text-gray-300 bg-transparent px-4",
                  footer: "text-center mt-4",
                  footerActionText: "text-gray-300",
                  formFieldRow: "mb-4",
                  socialButtonsBlockButton: "w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 mb-4 flex items-center justify-center space-x-2 border border-gray-300",
                },
                layout: {
                  socialButtonsPlacement: "top",
                  socialButtonsVariant: "blockButton",
                  showOptionalFields: true,
                },
                variables: {
                  colorPrimary: "#ea580c",
                  colorText: "#ffffff",
                  colorTextSecondary: "#d1d5db",
                  colorBackground: "transparent",
                  colorInputBackground: "rgba(255, 255, 255, 0.1)",
                  colorInputText: "#ffffff",
                  borderRadius: "0.75rem",
                }
              }}
            />
          )}

          <div className="text-center mt-4">
            <p className="text-gray-300 text-sm mb-2">
              {!isSignUpMode ? "Don't have an account?" : "Already have an account?"}
            </p>
            {!isSignUpMode ? (
              <Link
                href="/signup"
                className="text-orange-300 hover:text-orange-200 font-medium transition-colors underline"
              >
                Create one here
              </Link>
            ) : (
              <button
                onClick={() => setIsSignUpMode(false)}
                className="text-orange-300 hover:text-orange-200 font-medium transition-colors underline"
              >
                Sign in instead
              </button>
            )}
          </div>

          <p className="text-gray-400 text-center text-xs mt-6 opacity-75">
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
