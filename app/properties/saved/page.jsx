import PropertyCard from "@/components/PropertyCard";
import dbConnect from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";


const SavedPropertyPage = async () => {
    const sessionUser = await getSessionUser()
    const { userId } = sessionUser

    const { bookmarks } = await User.findById( userId ).populate('bookmarks')
    console.log(bookmarks);
    


    return (
        <section className="px-4 py-6">
        <div className=" container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Property</h1>
        {bookmarks.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {bookmarks.map((property) => (
               <PropertyCard key={property._id} property={property}/>
               // Utilisez une clé unique pour chaque élément de la liste
              ))}
            </div>
          ) : (
            <p>No properties saved</p>
          )}
        </div>
            
        </section>
    );
}

export default SavedPropertyPage;
