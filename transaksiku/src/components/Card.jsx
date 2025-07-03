// src/components/ui/card.jsx
export const Card = ({ children }) => (
  <div className="rounded-lg border bg-white p-4 shadow">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-2">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="text-sm text-gray-600">{children}</div>
);
