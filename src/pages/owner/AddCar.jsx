import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    priceperday: "",
    transmission: "",
    fuelType: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in the details to list a new car for booking, includng pricing,availabiity"
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image  */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* car Brand & Model */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" flex flex-col w-full">
            <label>Brand</label>
            <input type="text" placeholder ="e.g. BMW, Mercedes, audi..." required 
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={car.brand} onChange={(e) => setCar({...car, brand: e.target.value})} />
          </div>
          <div className=" flex flex-col w-full">
            <label>Model</label>
            <input type="text" placeholder ="e.g. x5, e-Class, M4..." required 
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={car.model} onChange={(e) => setCar({...car, model: e.target.value})} />
          </div>
          
        </div>

        {/* car year, price, category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className=" flex flex-col w-full">
            <label>Year</label>
            <input type="number" placeholder ="0" required 
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={car.year}
             onChange={(e) => setCar({...car, year: e.target.value})} />
          </div>

          <div className=" flex flex-col w-full">
            <label>Daily Price($)</label>
            <input type="number" placeholder="0" required
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={car.priceperday}
            onChange={(e) => setCar({...car, priceperday: e.target.value})} />
          </div>
           <div className=" flex flex-col w-full"> 
            <label>Category</label>
           <select onChange={e=> setCar({...car, category: e.target.value})} value={car.category} 
           className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none">
            <option value="">Select Category</option>
            <option value="sedan">sedan</option>
            <option value="SUV">SUV</option> 
            <option value="Van">Van</option>  
           </select>
          </div>
        </div>
        {/* car transmission, fuel type, seating capacity */}
      </form>
    </div>
  );
};

export default AddCar;
