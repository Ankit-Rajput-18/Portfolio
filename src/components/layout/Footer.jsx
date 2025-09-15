// src/components/common/Footer.jsx
export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
      © {new Date().getFullYear()} Ankit Rajput. Built with ❤️ using React & Tailwind.
    </footer>
  );
}
