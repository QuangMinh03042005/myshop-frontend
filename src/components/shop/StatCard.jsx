export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col items-start">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <span className="text-2xl font-bold text-orange-600">{value}</span>
    </div>
  );
}
