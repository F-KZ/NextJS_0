
import dbConnect from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyInfo from "@/components/PropertyInfo";
import SearchBar from "@/components/SearchBar";
import PropertyImages from "@/components/PropertyImages";


const PropertyPage = async ({ params }) => {
    await dbConnect();
    const property = await Property.findById(params.id);
   // Check if the property object is retrieved
  
    if (!property) {
      return <div>No property found</div>;
    }
  
    return (
      <>
        <PropertyHeaderImage image={property.images[0]}/>
        <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Properties
        </Link>
      </div>
      <section className="bg-blue-50">
        <PropertyInfo property={property} />
        </section>
    </section>
    <PropertyImages images={property.images}/>
      </>
    )
  };

export default PropertyPage;
