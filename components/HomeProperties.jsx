import PropertyCard from "./PropertyCard";
import dbConnect from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";

const HomeProperties = async () => {
  await dbConnect()
  const properties = await Property
  .find({})
  .sort({ createdAt : -1})
  .limit(3)
  .lean()
 

    return (
        <>
        <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
         Recent Properties
        </h2>
          {properties.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
               <PropertyCard key={property.id} property={property}/>
               // Utilisez une clé unique pour chaque élément de la liste
              ))}
            </div>
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
      <Link
      href='/properties'
      className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'>
      View all properties

      </Link>

      </section>
      </>
    );
}

export default HomeProperties;
