'use server'
import cloudinary from "@/config/cloudinary"
import dbConnect from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteProperty(PropertyId){
    await dbConnect()
    const sessionUser = await getSessionUser()
    const { userId } = sessionUser

    if (!sessionUser || !userId) {
        throw new Error('User ID is required');
      }

    const property = await Property.findById(PropertyId)  
    if(!property) throw new Error(' Property not found ')

     // viewer ownership
     if(property.owner.toString() !== userId){
        throw new Error('Unauthorized');
     }   

     // extract public ID from image URLs

     const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split('/')
        return parts.at(-1).split('.').at(0)
     })

     if(publicIds.length > 0){
        for(let publicId of publicIds){
            await cloudinary.uploader.destroy('propertypulse/' + publicId)
        }
     }

     await property.deleteOne()

     revalidatePath('/', 'layout')

}

export default deleteProperty