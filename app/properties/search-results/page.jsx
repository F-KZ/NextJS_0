import PropertyCard from "@/components/PropertyCard"
import SearchBar from "@/components/SearchBar"
import dbConnect from "@/config/database"
import Property from "@/models/Property"
import { convertObject } from "@/utils/convertObject"
import { getSessionUser } from "@/utils/getSessionUser"
import Link from "next/link"
import { FaArrowAltCircleLeft } from "react-icons/fa"



const SearchResultPage = async ({ searchParams: { location, propertyType }}) => {
 await dbConnect()
 const locationPattern = new RegExp(location, 'i')

 let query = {
    $or: [
        { name: locationPattern},
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.state': locationPattern },
        { 'location.city': locationPattern },
        { 'location.zipcode': locationPattern },
    ]
 }

 if(propertyType === '' && propertyType === 'All'){
    const typePattern = new RegExp(propertyType, 'i')
    query.type = typePattern
 }

 const propertiesQueryResult = await Property.find(query).lean()
 // t'as enlever le convertObject
 const properties = propertiesQueryResult

 
    return (
        <>
    <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
        <SearchBar/>
        </div>
    </section>
    <section className="px-4 py-6">
    <div className=" container-xl lg:container m-auto px-4 py-6">
    <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
    <FaArrowAltCircleLeft className="mr-2 mb-1"/> Back to Properties
    </Link>
    <h1 className="text-2xl mb-4">Search Results</h1>
    { properties.length === 0 ? <p>No search result</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
                <PropertyCard key={property._id} property={property}/>
            ))}
        </div>
    )}
    </div>
    </section>
    </>
 )
}

export default SearchResultPage