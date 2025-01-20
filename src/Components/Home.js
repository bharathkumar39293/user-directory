import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Directory</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="py-2 px-4 rounded-lg border transition-colors duration-300"
          style={{
            backgroundColor: darkMode ? '#ffffff' : '#1a202c',
            color: darkMode ? '#000000' : '#ffffff',
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring ${
            darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>
      <div className="max-w-2xl mx-auto flex justify-between gap-4 mb-6">
        <button
          onClick={() => setSortOrder('asc')}
          className={`w-full py-2 px-4 rounded-lg hover:bg-opacity-90 ${
            darkMode ? 'bg-indigo-700 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          Sort A-Z
        </button>
        <button
          onClick={() => setSortOrder('desc')}
          className={`w-full py-2 px-4 rounded-lg hover:bg-opacity-90 ${
            darkMode ? 'bg-red-700 text-white' : 'bg-red-500 text-white'
          }`}
        >
          Sort Z-A
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <ul className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className={`p-4 rounded-lg shadow-md border hover:shadow-lg ${
              darkMode
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-200'
            }`}
          >
            <Link
              to={`/user/${user.id}`}
              className="text-xl font-semibold hover:underline"
              style={{ color: darkMode ? '#90cdf4' : '#4c51bf' }}
            >
              {user.name}
            </Link>
            <p>{user.email}</p>
            <p>{user.address?.city || 'City not available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
