import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^\d]/g, ''));
      const increment = numericValue / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{value.replace(/[\d,]/g, '')}
    </span>
  );
};

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 2, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { icon: Users, label: "Active Users", value: "10,000+", color: "text-blue-400" },
    { icon: Target, label: "Jobs Posted", value: "5,000+", color: "text-green-400" },
    { icon: Award, label: "Companies", value: "500+", color: "text-purple-400" },
    { icon: Heart, label: "Success Stories", value: "2,500+", color: "text-red-400" },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We leverage cutting-edge technology to create seamless connections between talent and opportunities.",
      icon: Sparkles,
    },
    {
      title: "Accessibility",
      description: "Our platform is designed to be inclusive, ensuring everyone has equal access to career opportunities.",
      icon: Users,
    },
    {
      title: "Trust & Transparency",
      description: "We believe in building trust through transparent processes and honest communication.",
      icon: Award,
    },
    {
      title: "Community",
      description: "We're building a supportive community where professionals can grow and succeed together.",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      </motion.div>

      {/* Floating Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={0.5}>
          <div className="absolute bottom-20 right-1/3 w-18 h-18 bg-pink-500/10 rounded-full blur-xl"></div>
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            About Hirrd
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Connecting talent with opportunity through innovative technology and a commitment to excellence.
            We're revolutionizing the way people find jobs and companies discover talent.
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleIn}
          className="mb-16"
        >
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
            <CardHeader className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CardTitle className="text-2xl text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Our Mission
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="text-center">
              <motion.p
                className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                At Hirrd, we believe that everyone deserves to find meaningful work that aligns with their passions and skills.
                Our mission is to bridge the gap between exceptional talent and innovative companies, creating a world where
                career success is accessible to all. Through our platform, we're not just matching jobs – we're building futures.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group"
            >
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm text-center hover:border-gray-700 transition-all duration-300 h-full">
                <CardContent className="pt-6">
                  <motion.div
                    className={`h-8 w-8 mx-auto mb-4 ${stat.color}`}
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <stat.icon className="h-full w-full" />
                  </motion.div>
                  <div className="text-2xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <motion.h2
              className="text-3xl font-bold text-white mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Our Values
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The principles that guide everything we do and shape the future of work.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group"
              >
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm h-full hover:bg-gray-900/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      className="h-12 w-12 text-blue-400 mb-4"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <value.icon className="h-full w-full" />
                    </motion.div>
                    <motion.h3
                      className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {value.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {value.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
            <CardHeader>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CardTitle className="text-2xl text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Our Story
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.p
                className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Founded in 2024, Hirrd was born from the frustration of outdated job search platforms and disconnected hiring processes.
                Our founders, experienced in both tech and HR, saw an opportunity to create a platform that truly understands the needs
                of both job seekers and employers. Today, we're proud to be at the forefront of revolutionizing the job market,
                making career connections faster, smarter, and more meaningful than ever before.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;