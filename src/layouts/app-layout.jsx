import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const AppLayout = () => {
  const location = useLocation();
  
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden -z-10">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full filter blur-3xl"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10 min-h-screen flex flex-col">
            <Header />
            
            <AnimatePresence mode="wait">
              <motion.main
                key={location.pathname}
                className="flex-1"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Outlet />
                </div>
              </motion.main>
            </AnimatePresence>

            {/* Footer */}
            <Footer />
          </div>
          
          <Toaster />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
