import { useAuth } from "../context/AuthContext";

export default function Header() {

  const { logout, user } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">

      <h1 className="text-lg font-semibold">
        Dashboard
      </h1>


      <div className="flex items-center space-x-4">

        <span className="text-gray-700">
          {user?.name}
        </span>


        <button 
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Profile
        </button>


        <button
          onClick={logout}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Logout
        </button>

      </div>

    </header>
  );
}