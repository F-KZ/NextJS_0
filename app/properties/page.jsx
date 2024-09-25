import dbConnect from '@/config/database';
import Property from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 2} }) => {
  await dbConnect()

  const skip = ( page - 1 ) * pageSize
  const total = await Property.countDocuments({})

  const properties = await Property.find({}).skip(skip).limit(pageSize)

  const showPagination = total > pageSize
    
    
    return (
        <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          {properties.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
               <PropertyCard key={property._id} property={property}/>
               // Utilisez une clé unique pour chaque élément de la liste
              ))}
            </div>
          ) : (
            <p>No properties found</p>
          )}
          { showPagination && (
            <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />

          )}
        </div>
      </section>
    );
}

export default PropertiesPage;
