import AsideForm from "./AsideForm";
import { FaIcons } from "react-icons/fa";
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker, FaCheck } from 'react-icons/fa'


const PropertyInfo = ({ property }) => {
    return (
      
        <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
        <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-500 mb-4">{property.type}</div>
              <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <FaMapMarker
                  className=" text-lg text-orange-700 mr-2"
                />
                <p className="text-orange-700">
                  {property.location.street}{" "}{property.location.city}{" "}{property.location.state}
                </p>
              </div>

              <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                Rates & Options
              </h3>
              <div className="flex flex-col md:flex-row justify-around">
                <div
                  className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                >
                  <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                  <div className="text-2xl font-bold">
                    <i className="fa fa-xmark text-red-700"></i>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                >
                  <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                  <div className="text-2xl font-bold text-blue-500">$1,100</div>
                </div>
                <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                  <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                  <div className="text-2xl font-bold text-blue-500">$4,200</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Description & Details</h3>
              <div
                className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9"
              >
                <p>
                <FaBed className="md:hidden lg:inline"/>{" "}{property.beds}{" "}
                  <span className="hidden sm:inline">Beds</span>
                </p>
                <p>
                 <FaBath className="md:hidden lg:inline"/>{" "}{property.baths}{" "}
                  <span className="hidden sm:inline">Baths</span>
                </p>
                <p>
                  <FaRulerCombined className="md:hidden lg:inline"/>
                  {property.square_feet}{" "}<span className="hidden sm:inline">sqft</span>
                </p>
              </div>
              <p className="text-gray-500 mb-4">
                This is a beautiful apartment located near the commons
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Amenities</h3>

              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
              >
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/> Wifi
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Full
                  kitchen
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Washer &
                  Dryer
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Free
                  Parking
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Hot Tub
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>24/7
                  Security
                </li>
                <li>
                <FaCheck className=" inline-block text-green-600 mr-2"/>Wheelchair Accessible
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Elevator
                  Access
                </li>
                <li>
                <FaCheck className=" inline-block text-green-600 mr-2"/>Dishwasher
                </li>
                <li>
                <FaCheck className=" inline-block text-green-600 mr-2"/>Gym/Fitness Center
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Air
                  Conditioning
                </li>
                <li>
                <FaCheck className=" inline-block text-green-600 mr-2"/>Balcony/Patio
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Smart TV
                </li>
                <li>
                  <FaCheck className=" inline-block text-green-600 mr-2"/>Coffee
                  Maker
                </li>
              </ul>
            </div>


            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <div id="map"></div>
            </div>
        </main>
        <AsideForm property={property}/>
        </div>
        </div>
        
       
    );
}

export default PropertyInfo;
