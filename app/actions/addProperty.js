'use server'
import dbConnect from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";


async function addProperty(formData) {
    
      // 1. Ensure DB Connection
      await dbConnect();
  
      // 2. Get the session user
      const sessionUser = await getSessionUser();
      if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
      }
      const { userId } = sessionUser;
      
  
      // 3. Access form data
      const amenities = formData.getAll('amenities');
      const images = formData.getAll('images').filter((image) => image.name !== '');
  
      // 4. Property data object
      const propertyData = {
        owner: userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
          street: formData.get('location.street'),
          city: formData.get('location.city'),
          state: formData.get('location.state'),
          zipCode: formData.get('location.zipCode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
          nightly: formData.get('rates.nightly'),
          weekly: formData.get('rates.weekly'),
          monthly: formData.get('rates.monthly'),
        },
        seller_infos: {
          name: formData.get('seller_info.name'),
          email: formData.get('seller_info.email'),
          phone: formData.get('seller_info.phone'),
        },
      };
  
      // 5. Upload images to Cloudinary (in parallel for better performance)
      const imgUrls = await Promise.all(
        images.map(async (imageFile) => {
          const imgBuffer = await imageFile.arrayBuffer();
          const imgArray = Array.from(new Uint8Array(imgBuffer));
          const imgData = Buffer.from(imgArray);
  
          // Convert to base64
          const imgBase64 = imgData.toString('base64');
  
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(`data:image/png;base64,${imgBase64}`, {
            folder: 'propertyPulse',
          });
  
          return result.secure_url;
        })
      );
  
      propertyData.images = imgUrls;
  
      // 6. Save the property to the database
      const newProperty = new Property(propertyData);
      await newProperty.save();
      
  
      // 7. Revalidate cache and redirect to the new property page
      revalidatePath('/', 'layout'); // Adjust according to your framework
      redirect(`/properties/${newProperty._id}`);
  
    
  }
  
  export default addProperty;