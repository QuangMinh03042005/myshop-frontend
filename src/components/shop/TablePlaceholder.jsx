export default function TablePlaceholder() {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="h-6 bg-gray-100 rounded w-40 mb-4"></div>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded"></div>
        ))}
      </div>
    </div>
  );
}
