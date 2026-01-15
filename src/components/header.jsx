import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <img 
                  src="/logo.png" 
                  className="h-10 w-13 md:h-12 md:w-16 transition-transform group-hover:scale-110" 
                  alt="Logo" 
                />
              </Link>

              <div className="hidden md:flex ml-8 space-x-1">
                <Link 
                  to="/jobs" 
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  Browse Jobs
                </Link>
                <Link 
                  to="/companies" 
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  Companies
                </Link>
                <Link 
                  to="/about" 
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <SignedOut>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSignIn(true)}
                  className="hidden sm:flex h-9 px-4 rounded-lg border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-sm font-medium transition-colors"
                >
                  Sign In
                </Button>
                <Link to="/sign-up">
                  <Button 
                    className="h-9 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
              
              <SignedIn>
                {user?.unsafeMetadata?.role === "recruiter" && (
                  <Link to="/post-job" className="hidden sm:block">
                    <Button 
                      variant="outline" 
                      className="h-9 px-4 rounded-lg border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group"
                    >
                      <PenBox size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                      Post a Job
                    </Button>
                  </Link>
                )}
                <div className="relative group">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9 md:w-10 md:h-10 border-2 border-transparent group-hover:border-blue-500/50 transition-colors",
                        userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full",
                        userButtonPopoverCard: "mt-2 w-56 rounded-xl border border-gray-800 bg-gray-900/95 backdrop-blur-md shadow-xl",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </SignedIn>

              {/* Mobile menu button */}
              <button 
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 py-4 border-t border-gray-800' : 'max-h-0 py-0'
        }`}>
          <div className="px-4 space-y-2">
            <Link 
              to="/jobs" 
              className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            <Link 
              to="/companies" 
              className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Companies
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <SignedIn>
              {user?.unsafeMetadata?.role === "recruiter" && (
                <Link 
                  to="/post-job" 
                  className="block px-3 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <PenBox size={16} className="mr-2" />
                    Post a Job
                  </span>
                </Link>
              )}
            </SignedIn>
            <SignedOut>
              <button
                onClick={() => {
                  setShowSignIn(true);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                Sign In / Register
              </button>
            </SignedOut>
          </div>
        </div>
      </header>
      <div className="h-16 md:h-20"></div> {/* Spacer for fixed header */}

      {showSignIn && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full max-w-md">
            <button
              onClick={() => {
                setShowSignIn(false);
                setSearch({});
              }}
              className="absolute -top-10 right-0 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
              <SignIn
                signUpForceRedirectUrl="/onboarding"
                fallbackRedirectUrl="/onboarding"
                appearance={{
                  elements: {
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'text-white',
                    headerSubtitle: 'text-gray-400',
                    socialButtonsBlockButton: 'border-gray-700 hover:bg-gray-800/50',
                    dividerText: 'text-gray-400',
                    formFieldLabel: 'text-gray-300',
                    formFieldInput: 'bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500/50',
                    footerActionText: 'text-gray-400',
                    footerActionLink: 'text-blue-400 hover:text-blue-300',
                    formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400',
                    formFieldAction: 'text-blue-400 hover:text-blue-300',
                    identityPreviewEditButton: 'text-blue-400 hover:bg-blue-400/10',
                    otpCodeFieldInput: 'bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500/50',
                    userButtonPopoverActionButtonText: 'text-gray-300 hover:bg-gray-800',
                    userButtonPopoverActionButtonIcon: 'text-gray-400',
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;