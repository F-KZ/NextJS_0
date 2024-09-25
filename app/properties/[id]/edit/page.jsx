import PropertyEditForm from "@/components/PropertyEditForm";
import dbConnect from "@/config/database";
import Property from "@/models/Property";
import { convertObject } from "@/utils/convertObject";

const PropertyEditPage = async ({ params }) => {
    await dbConnect()

    const propertyDoc = await Property.findById(params.id).lean()
    const property = convertObject(propertyDoc)

    if(!property){
        return <h1 className="text-center text-2xl font-bold mt-10"> Property not found</h1>
    }
    return (
        <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24 ">
        <div 
        className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border md-4 md-m-0 ">
        <PropertyEditForm property={property} />
        </div>

        </div>
        </section>
    );
}

export default PropertyEditPage;
