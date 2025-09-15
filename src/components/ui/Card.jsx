// src/components/ui/Card.jsx
export default function Card({ title, description, children }) {
  return (
    <div
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow transition transform hover:scale-[1.02] hover:shadow-x1"
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      {children}
    </div>
  );
}
