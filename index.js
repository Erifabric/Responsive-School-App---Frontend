
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/menu_items'); // Backend proxy
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Education Portal</h1>
          <nav>
            <ul className="flex space-x-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link href={`/${item.href}`}>
                    <a className="hover:underline">{item.menu_item}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto text-center py-16">
        <h2 className="text-4xl font-bold">Welcome to the School Portal</h2>
        <p className="mt-4 text-lg">
          Use the menu above to navigate and explore our features.
        </p>
      </main>
    </div>
  );
};

export default Home;
