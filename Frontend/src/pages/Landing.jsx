import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ChartBarIcon, BanknotesIcon, LightBulbIcon,
    ShieldCheckIcon, UsersIcon, BellAlertIcon,
    PlayCircleIcon, ArrowRightIcon, MagnifyingGlassIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import DashboardImg from '../assets/Dashboard.png.jpg';

const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        variants={fadeUpVariant}
        whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
        className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors shadow-2xl glass-panel group overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-secondary flex items-center justify-center p-3 shadow-lg shadow-purple-500/30">
            <Icon className="w-full h-full text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-blue-200/80 leading-relaxed text-sm">{description}</p>
    </motion.div>
);

const StepCard = ({ number, title, description }) => (
    <motion.div
        variants={fadeUpVariant}
        className="flex flex-col items-center text-center max-w-sm relative"
    >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_0_30px_rgba(6,182,212,0.5)] z-10 hover:scale-110 transition-transform">
            {number}
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-blue-200/80">{description}</p>
    </motion.div>
);

const Landing = () => {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div className="min-h-screen bg-[#050511] text-white overflow-hidden font-sans selection:bg-secondary selection:text-white">
            {/* Background Orbs & Waves */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-1000 delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[200px] mix-blend-screen" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/5 py-4">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-xl leading-none">S</span>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            SubWave
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#dashboard" className="hover:text-white transition-colors">Preview</a>
                    </div>
                    <div className="flex items-center space-x-4 text-sm font-medium">
                        <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Log In</Link>
                        <Link to="/register" className="px-5 py-2.5 rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 z-10 min-h-screen flex items-center justify-center">
                <div className="container mx-auto text-center">
                    <motion.div style={{ y: yHero, opacity: opacityHero }}>
                        <motion.div
                            initial="hidden" animate="visible" variants={fadeUpVariant}
                            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-purple-300 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.2)] text-sm font-medium"
                        >
                            ✨ The future of subscription management
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200"
                        >
                            Manage All Your Subscriptions <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                In One Place
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-lg md:text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Track, organize, and optimize all your digital subscriptions with smart analytics, reminders, and powerful insights. Stop paying for what you don't use.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                        >
                            <Link to="/register" className="group flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] w-full sm:w-auto">
                                Start for Free
                                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/dashboard" className="group flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-lg backdrop-blur-sm transition-all shadow-lg w-full sm:w-auto">
                                <PlayCircleIcon className="w-6 h-6 mr-2 text-secondary group-hover:scale-110 transition-transform" />
                                View Demo
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 50 }}
                        className="mt-20 relative mx-auto w-full max-w-5xl perspective-[2000px]"
                        style={{ perspective: "2000px" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent blur-3xl -z-10" />
                        <motion.div
                            whileHover={{ rotateX: 0, scale: 1.02 }}
                            style={{ rotateX: '15deg', transformStyle: 'preserve-3d' }}
                            className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-700 ease-out"
                        >
                            <img src={DashboardImg} alt="SubWave Dashboard" className="w-full h-auto opacity-90 mix-blend-lighten" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
                            }} />
                            {/* Floating UI Overlay Elements */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-10 -left-6 md:-left-12 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hidden md:block"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">Netflix Saved!</p>
                                        <p className="text-gray-300 text-xs">₹1,499 optimized</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Problem & Solution Section */}
            <section className="py-32 px-6 relative z-10 bg-black/40 backdrop-blur-lg border-y border-white/5">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Problem */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 space-y-6"
                        >
                            <div className="inline-block px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium">
                                The Problem
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                Subscriptions are quietly <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">draining your wallet.</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Today, the average person uses over a dozen subscriptions—from Netflix and Spotify to cloud storage and productivity apps. They all have different billing cycles, hidden fees, and auto-renewals. The result? You're likely paying hundreds of dollars a year for services you forgot you even had.
                            </p>
                        </motion.div>

                        {/* Solution */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 w-full"
                        >
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 shadow-[0_0_50px_rgba(147,51,234,0.15)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                                <div className="relative z-10 space-y-6">
                                    <div className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium">
                                        The Solution
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                                        Total visibility and complete control.
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        SubWave is the ultimate Digital Subscription Manager. We bring every single subscription into one beautiful, centralized dashboard. We track your renewals, analyze your spending habits, and send you proactive alerts before you're charged—so you only pay for what you actually use.
                                    </p>
                                    <div className="pt-4 flex items-center space-x-2 text-primary font-semibold cursor-pointer hover:text-cyan-300 transition-colors">
                                        <a href="#features" className="hover:text-white transition-colors">See how it works</a>
                                        <ArrowRightIcon className="w-5 h-5 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trusted By */}
            <section className="py-10 border-y border-white/5 bg-black/20 backdrop-blur-md relative z-10">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-8">Seamlessly tracks your favorite services</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                        {['Spotify', 'YouTube', 'Netflix', 'Zoom', 'GitHub', 'Twitch', 'Dropbox'].map((brand, i) => (
                            <motion.div
                                key={brand}
                                whileHover={{ scale: 1.1, opacity: 1, textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                                className="text-xl md:text-2xl font-bold font-sans text-gray-400 hover:text-white transition-all cursor-pointer"
                            >
                                {brand}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-32 px-6 relative z-10">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">take back control</span></h2>
                        <p className="text-blue-200/70 text-lg">SubWave provides powerful tools wrapped in an intuitive interface to help you manage expenses effortlessly.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <FeatureCard icon={ChartBarIcon} title="Expense Analytics" description="Visualize your monthly spending with beautiful, interactive charts. Understand exactly where your money goes across categories." />
                        <FeatureCard icon={BellAlertIcon} title="Renewal Reminders" description="Never get caught off guard by a surprise charge. Get timely alerts before your subscriptions renew automatically." />
                        <FeatureCard icon={MagnifyingGlassIcon} title="Subscription Tracking" description="Automatically detect and organize all your recurring payments in one sleek dashboard." />
                        <FeatureCard icon={LightBulbIcon} title="AI-based Budgeting" description="Get smart insights and recommendations on which subscriptions you should cancel based on your usage patterns." />
                        <FeatureCard icon={ShieldCheckIcon} title="Secure Authentication" description="Your data is safe with our military-grade encryption, Google OAuth support, and optional two-factor authentication." />
                        <FeatureCard icon={UsersIcon} title="Multi-user Collaboration" description="Share household subscriptions with family members. Assign roles like Owner, Admin, or Member seamlessly." />
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-transparent to-black/40 relative z-10 border-t border-white/5">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">How SubWave Works</h2>
                        <p className="text-blue-200/70 text-lg">Three simple steps to subscription freedom.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-center items-start gap-12 relative"
                    >
                        {/* Connecting lines */}
                        <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/0 via-purple-500/50 to-blue-500/0 -z-10" />

                        <StepCard number="1" title="Connect services" description="Securely link your bank accounts or manually add your services in seconds." />
                        <StepCard number="2" title="Auto-detect" description="Our engine scans and identifies all your recurring payments automatically." />
                        <StepCard number="3" title="Track & Optimize" description="Receive alerts, track spending, and cancel unwanted services easily." />
                    </motion.div>
                </div>
            </section>

            {/* Collaboration / Teams */}
            <section className="py-32 px-6 overflow-hidden relative z-10">
                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className="relative rounded-2xl p-2 bg-gradient-to-tr from-secondary/20 to-primary/20 backdrop-blur-sm border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-black/60 rounded-xl" />
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Collaboration" className="relative rounded-xl w-full h-auto mix-blend-overlay opacity-80" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl w-3/4 max-w-sm">
                                <h4 className="text-white font-semibold mb-4 border-b border-white/10 pb-2">Family Group</h4>
                                <div className="space-y-3">
                                    {['Sarah (Owner)', 'Mike (Admin)', 'Kids (Member)'].map((user, i) => (
                                        <div key={user} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-8 h-8 rounded-full ${i === 0 ? 'bg-secondary' : 'bg-blue-500'} flex items-center justify-center text-xs font-bold`}>{user[0]}</div>
                                                <span className="text-sm text-gray-200">{user}</span>
                                            </div>
                                            <span className="text-xs text-green-400">Active</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Share with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">family and friends</span></h2>
                        <p className="text-blue-200/70 text-lg mb-8 leading-relaxed">
                            Managing household subscriptions has never been easier. Invite family members to your SubWave workspace and securely share access to Netflix, Spotify, and more.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center text-gray-300">
                                <CheckBadgeIcon className="w-6 h-6 mr-3 text-secondary" /> Granular role assignments (Owner, Admin, Member)
                            </li>
                            <li className="flex items-center text-gray-300">
                                <CheckBadgeIcon className="w-6 h-6 mr-3 text-primary" /> Detailed activity tracking and audit logs
                            </li>
                            <li className="flex items-center text-gray-300">
                                <CheckBadgeIcon className="w-6 h-6 mr-3 text-blue-400" /> Prevent accidental cancellations
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-gradient-to-t from-purple-900/20 to-transparent">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-tr from-primary to-secondary shadow-[0_0_80px_rgba(168,85,247,0.3)]">
                        <div className="bg-black/90 backdrop-blur-3xl rounded-[23px] py-16 px-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent pointer-events-none" />

                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
                                Take Control of Your Subscriptions Today.
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
                                Join thousands of users who are saving money and staying organized with SubWave's intelligent tracking platform.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
                                <Link to="/register" className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                                    Start for Free
                                </Link>
                                <Link to="/login" className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-colors">
                                    Try SubWave
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/10 bg-[#020205] relative z-10">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-6 md:mb-0">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-sm leading-none">S</span>
                        </div>
                        <span className="text-xl font-bold text-gray-200">SubWave</span>
                    </div>

                    <div className="flex space-x-8 text-sm text-gray-400 mb-6 md:mb-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">GitHub</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} SubWave. All rights reserved. Designed for optimal subscription management.
                </div>
            </footer>
        </div>
    );
};

export default Landing;
