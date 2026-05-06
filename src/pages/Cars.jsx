import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { assets } from "../assets/assets";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {

  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
 
  const isSearchData = pickupLocation && pickupDate && returnDate;
   const [filteredCars, setFilteredCars] = useState([]);

   const applyFilter = async () =>{
    if (input === ""){
      setFilteredCars(cars);
      return null
    }
   }

   useEffect(() => {
    cars.leangth > 0 && !isSearchData && applyFilter();
   }, []) 

  const searchCarAvailability = async () => {
    const { data } = await axios.post("/api/booking/check-availability", {
      location: pickupLocation, pickupDate, returnDate
    });
    if (data?.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast.error("No cars available for the selected dates and location");
      }
    }
  }

  useEffect(() => {
    if (isSearchData) searchCarAvailability();
  }, [isSearchData]);

  const displayCars = isSearchData ? filteredCars : cars;
  const filteredByInput = input
    ? displayCars.filter(car =>
        `${car.brand} ${car.model}`.toLowerCase().includes(input.toLowerCase())
      )
    : displayCars;

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subtitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredByInput.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredByInput.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
