export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="px-3 py-1 bg-blue-600 text-white rounded">Profile</button>
        <button className="px-3 py-1 bg-red-600 text-white rounded">Logout</button>
      </div>
    </header>
  );
}