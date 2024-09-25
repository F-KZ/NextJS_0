import HomeProperties from "./HomeProperties";
import InfoBoxe from "./InfoBoxe";


const InfoBoxes = () => {
    return (
        <>
            <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBoxe heading='For Renters'
          buttonInfo={{
            text:'Browse Properties',
            link:'/properties'
          }}>
          Find your dream rental property. Bookmark properties and contact
          owners.
          </InfoBoxe>
          <InfoBoxe 
          heading='For Property Owners' 
          backgroundColor='bg-blue-100'
          buttonInfo={{
            text:'Add Property',
            link:'/properties/add',
            backgroundColor:'bg-blue-500'
          }}>
          Find your dream rental property. Bookmark properties and contact
          owners.
          </InfoBoxe>
        </div>
      </div>
    </section>
    <HomeProperties/>

        </>
    );
}

export default InfoBoxes;
