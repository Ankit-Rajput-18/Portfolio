// src/sections/ContactForms.jsx
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../components/ui/Reveal";
import { socials } from "../data/socials";
import { Github, Linkedin, Twitter, Facebook, Instagram, Mail, Code2 } from "lucide-react";

export default function Contact() {
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_OWNER = import.meta.env.VITE_TEMPLATE_OWNER;
  const TEMPLATE_AUTOREPLY = import.meta.env.VITE_TEMPLATE_AUTOREPLY;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const statusRef = useRef(null);
  
  const iconMap = {
    GitHub: <Github size={20} />,
    LinkedIn: <Linkedin size={20} />,
    Twitter: <Twitter size={20} />,
    Facebook: <Facebook size={20} />,
    Instagram: <Instagram size={20} />,
    Email: <Mail size={20} />,
    LeetCode: <Code2 size={20} />,
  };
  
  const getSocialLinkClassName = (name) => {
    switch(name) {
      case "LinkedIn":
        return "text-blue-600 hover:text-blue-800";
      case "GitHub":
        return "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
      case "Email":
        return "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300";
      case "LeetCode":
        return "text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300";
      default:
        return "";
    }
  };


  function validate() {
    const e = {};
    if (!form.name || form.name.trim().length < 2) {
      e.name = "Please enter your name (at least 2 characters).";
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.message || form.message.trim().length < 10) {
      e.message = "Message should be at least 10 characters long.";
    }
    return e;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status.state !== "idle") {
      setStatus({ state: "idle", msg: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (form.website && form.website.trim() !== "") {
      setStatus({ state: "error", msg: "❌ Spam detected. Please try again." });
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ state: "error", msg: "❌ Please fix the errors above." });
      setTimeout(() => {
        document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      }, 100);
      return;
    }

    setIsLoading(true);
    setStatus({ state: "sending", msg: "📤 Sending your message..." });
    setErrors({});

    try {
      const emailParams = {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        message: form.message.trim(),
        reply_to: form.email.trim(),
        to_name: "Ankit Rajput",
        to_email: "ankitrajput2004@gmail.com"
      };

      await emailjs.send(
        SERVICE_ID, 
        TEMPLATE_OWNER, 
        emailParams, 
        PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "", website: "" });
      setStatus({ 
        state: "success", 
        msg: "✅ Message sent successfully! I'll get back to you soon." 
      });

      setTimeout(() => {
        statusRef.current?.focus();
      }, 200);

      try {
        const autoReplyParams = {
          to_name: form.name.trim(),
          to_email: form.email.trim(),
          reply_to: form.email.trim(),
          from_name: "Ankit Rajput"
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, autoReplyParams, PUBLIC_KEY);
      } catch (autoError) {
        console.warn("Auto-reply failed (but main message was sent):", autoError);
      }

    } catch (error) {
      let errorMessage = "❌ Failed to send message. ";
      
      if (error.status === 422) {
        errorMessage += "Please check your email address and try again.";
      } else if (error.status === 400) {
        errorMessage += "Invalid request. Please refresh and try again.";
      } else if (!navigator.onLine) {
        errorMessage += "Please check your internet connection.";
      } else {
        errorMessage += "Please try again or contact me directly at ankitrajput2004@gmail.com";
      }
      
      setStatus({ state: "error", msg: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>
        </Reveal>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot field - hidden from users */}
            <input 
              name="website" 
              value={form.website} 
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <Reveal delay={0.1}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                      placeholder-gray-500 dark:placeholder-gray-400
                      ${errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                      } focus:ring-2 focus:outline-none`}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                      placeholder-gray-500 dark:placeholder-gray-400
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                      } focus:ring-2 focus:outline-none`}
                    placeholder="your.email@example.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <label 
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 resize-none
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    ${errors.message 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                    } focus:ring-2 focus:outline-none`}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  disabled={isLoading}
                />
                <div className="mt-1 flex justify-between items-center">
                  {errors.message ? (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Minimum 10 characters
                    </p>
                  )}
                  <span className="text-sm text-gray-400">
                    {form.message.length}/1000
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 
                    ${isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Or email directly:{" "}
                  <a 
                    href="mailto:ankitrajput2004@gmail.com" 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                  >
                    ankitrajput2004@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Status Messages */}
            <div ref={statusRef} className="min-h-[60px] flex items-center">
              {status.state !== "idle" && (
                <div 
                  className={`w-full p-4 rounded-lg border-l-4 ${
                    status.state === "sending" 
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-400 text-blue-800 dark:text-blue-200"
                      : status.state === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-400 text-green-800 dark:text-green-200"
                      : "bg-red-50 dark:bg-red-900/20 border-red-400 text-red-800 dark:text-red-200"
                  } transition-all duration-300`}
                >
                  <div className="flex items-center">
                    {status.state === "sending" && (
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <p className="font-medium">{status.msg}</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Prefer other ways to connect?
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.linkedin.com/in/ankit-rajput-706b47262/" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                >
                LinkedIn
              </a>
              <a 
                href="https://github.com/Ankit-Rajput-18" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                href="https://www.instagram.com/ankit_rajput298/" 
                className="text-blue-400 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
// I've already updated the Socials section and ContactForm to use dynamic data and be more effective. I've also implemented the cursor follower. What's next? What else can I do to improve the portfolio and make it stand out even more?