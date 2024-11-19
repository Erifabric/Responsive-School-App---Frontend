
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`/api/address_inventory/${page}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [page]);

  const handleSearch = () => {
    const filtered = addresses.filter((address) =>
      address.street.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAddresses(filtered);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') setPage(page + 1);
    if (direction === 'prev' && page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Address List</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow"
          placeholder="Search by street"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4">
          Search
        </button>
      </div>
      <ul className="list-disc pl-5">
        {addresses.map((address) => (
          <li key={address.id}>
            {address.street}, {address.state}, {address.country}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          className="bg-gray-500 text-white px-4 mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange('next')}
          className="bg-gray-500 text-white px-4">
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
