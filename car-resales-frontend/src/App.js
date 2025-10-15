import React, { useState, useEffect } from 'react';
import { Search, Car, Gauge, Calendar } from 'lucide-react';

const API_BASE = 'http://localhost:8080/api/cars';

export default function CarResalesApp() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', price: '', mileage: '',
    condition: 'Used', transmission: 'Automatic', fuelType: 'Petrol',
    color: '', description: '', imageUrl: ''
  });

  // Fetch cars from backend
  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch(err => {
        console.error('Error fetching cars:', err);
        // Use sample data if backend is not available
        const sampleCars = [
          {
            id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 22000,
            mileage: 35000, condition: 'Used', transmission: 'Automatic',
            fuelType: 'Petrol', color: 'Silver', description: 'Well maintained, single owner',
            imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'
          }
        ];
        setCars(sampleCars);
        setFilteredCars(sampleCars);
      });
  }, []);

  // Filter cars based on search
  useEffect(() => {
    const filtered = cars.filter(car =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
  }, [searchTerm, cars]);

  // Handle form submission
  const handleSubmit = () => {
    const newCar = {
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseFloat(formData.price),
      mileage: parseInt(formData.mileage),
      condition: formData.condition,
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      color: formData.color,
      description: formData.description,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
    };

    // Send to backend
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar)
    })
      .then(res => res.json())
      .then(savedCar => {
        setCars([...cars, savedCar]);
        setShowAddForm(false);
        setFormData({
          make: '', model: '', year: '', price: '', mileage: '',
          condition: 'Used', transmission: 'Automatic', fuelType: 'Petrol',
          color: '', description: '', imageUrl: ''
        });
      })
      .catch(err => console.error('Error adding car:', err));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">C-Hub</h1>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {showAddForm ? 'Cancel' : 'List a Car'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Add Car Form */}
        {showAddForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">List Your Car</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="make" 
                placeholder="Make (e.g., Toyota)" 
                value={formData.make} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                required
              />
              <input 
                name="model" 
                placeholder="Model (e.g., Camry)" 
                value={formData.model} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                required
              />
              <input 
                name="year" 
                type="number" 
                placeholder="Year (e.g., 2020)" 
                value={formData.year} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                required
              />
              <input 
                name="price" 
                type="number" 
                placeholder="Price (e.g., 25000)" 
                value={formData.price} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                required
              />
              <input 
                name="mileage" 
                type="number" 
                placeholder="Mileage in km (e.g., 35000)" 
                value={formData.mileage} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                required
              />
              <input 
                name="color" 
                placeholder="Color (e.g., Silver)" 
                value={formData.color} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <select 
                name="condition" 
                value={formData.condition} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>New</option>
                <option>Used</option>
              </select>
              <select 
                name="transmission" 
                value={formData.transmission} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>
              <select 
                name="fuelType" 
                value={formData.fuelType} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
              <input 
                name="imageUrl" 
                placeholder="Image URL (optional)" 
                value={formData.imageUrl} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <textarea 
                name="description" 
                placeholder="Description" 
                value={formData.description} 
                onChange={handleInputChange} 
                className="px-3 py-2 border rounded md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                rows={3}
              />
              <div className="md:col-span-2 flex gap-2">
                <button 
                  onClick={handleSubmit} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add Car
                </button>
                <button 
                  onClick={() => setShowAddForm(false)} 
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Car Listings */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No cars found. Add your first car!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map(car => (
              <div 
                key={car.id} 
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => setSelectedCar(car)}
              >
                <img 
                  src={car.imageUrl} 
                  alt={`${car.make} ${car.model}`} 
                  className="w-full h-48 object-cover rounded-t-lg" 
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-2xl font-bold text-blue-600">
                    ₹{car.price.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4" />
                      <span>{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{car.condition} • {car.transmission}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-xs text-gray-500">{car.fuelType} • {car.color}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Car Detail Modal */}
        {selectedCar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
            onClick={() => setSelectedCar(null)}
          >
            <div 
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedCar.imageUrl} 
                alt={`${selectedCar.make} ${selectedCar.model}`} 
                className="w-full h-64 object-cover rounded-t-lg" 
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCar.year} {selectedCar.make} {selectedCar.model}
                </h2>
                <div className="mt-4 flex items-center gap-2 text-3xl font-bold text-blue-600">
                  ₹{selectedCar.price.toLocaleString('en-IN')}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-semibold">{selectedCar.mileage.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-semibold">{selectedCar.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-semibold">{selectedCar.transmission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-semibold">{selectedCar.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-semibold">{selectedCar.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-semibold">{selectedCar.year}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="mt-1 text-gray-700">{selectedCar.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedCar(null)} 
                  className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}