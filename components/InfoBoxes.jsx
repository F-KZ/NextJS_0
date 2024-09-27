
import InfoBoxe from "./InfoBoxe";


const InfoBoxes = () => {
    return (
        <>
            <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBoxe heading='Pour les Locataires'
          buttonInfo={{
            text:'Parcourir les Propriétés',
            link:'/properties'
          }}>
          Trouvez le logement de vos rêves parmi les nombreuses propriétés, sauvegardez et contacter le propriétaire.
          </InfoBoxe>
          <InfoBoxe 
          heading='Pour les Propriétaires' 
          backgroundColor='bg-blue-100'
          buttonInfo={{
            text:'Louer ma propriété',
            link:'/properties/add',
            backgroundColor:'bg-blue-500'
          }}>
          Offrez à vos locataires un agréable séjour en mettant à disposition votre propriété.
          </InfoBoxe>
        </div>
      </div>
    </section>

        </>
    );
}

export default InfoBoxes;
