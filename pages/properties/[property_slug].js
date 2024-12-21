import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API , DEFAULT_DOMAIN} from '../../Config';
// import './index.css'
import Loader from '../components/loader/Loader';
// Import template components
// import Template1 from '../components/template1/';
// import Template2 from '../components/template2/App';
// import Template3 from '../components/template3/App';
// import Template4 from '../components/template4/App';
// import Template5 from '../components/template5/App';
import Template6 from '../components/template6/Property';
// import Template3 from './components/template3/Template3';

const App = ({ propertyDetails , domain , templateid , headerData ,galleryData }) => {
  const [templateId, setTemplateId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const [galleryData, setGalleryData] = useState([]);

//   useEffect(() => {
//     const fetchTemplateId = async () => {
//       try {
//         const response = await axios.get(API.TEMPLATE_STUDIO(domain));
//         setTemplateId(response.data.templateId); // Assuming API returns templateId
//       } catch (err) {
//         console.error("Failed to fetch template ID:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplateId();
//   }, []);


  if (error) return <div>{error}</div>;

  // Conditional rendering based on templateId
  switch (templateid) {
    case "6":
        console.log("property Details befor etemp 6 : " ,{propertyDetails} );
       return <Template6 propertyDetails={propertyDetails}  headerData={headerData}
       galleryData={galleryData}/>;
    // case 3:
    //   return <Template3 />;
    default:
      return <div>Template not found {templateid}</div>;
  }
};


//  getServerSideProps to fetch property details
export async function getServerSideProps(context) {
  console.log("getServerSideProps - PropertyPage");
  const { req  , params} = context;

  console.log("context.param : ")
  console.log(context.params)
//   const { property_slug } = context.query;
//   const { property_slug } = params;
  const { property_slug } = context.params;

  console.log("property_slug 1111 : " , property_slug);
  let domain = DEFAULT_DOMAIN;
  const rawWebsiteDomain = req.headers['x-forwarded-host'] || DEFAULT_DOMAIN;
  const websiteDomain = rawWebsiteDomain.startsWith('www.') 
    ? rawWebsiteDomain.replace('www.', '') 
    : rawWebsiteDomain;

  const finalDomain = websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;

  let propertyDetails = null;
  let error = null;
  let templateid = null;
  let headerData = null
  let galleryData = null;

  domain = finalDomain;
  console.log("finaldomain : ", finalDomain);

  try {

    // template_id
    const response = await axios.get(API.TEMPLATE_STUDIO(domain));
    templateid = response.data.templateId

    console.log("templaet api res : ",response)
    console.log("log.template.id : " ,templateid )

    // console.log("property_slug2151");
    console.log("slug : "+property_slug);
    const propertyResponse = await axios.get(API.PROPERTY_DETAILS_STUDIO(finalDomain,property_slug));
    const propertyData = propertyResponse.data;

    console.log("PropertyData : " , propertyData.property_details);
    // console.log(propertyData); 

    if (!propertyData || !propertyData.property_details) {
      error = 'Property details not found.';
    } else {
      propertyDetails = propertyData.property_details;
    //   console.log(propertyDetails)
    }

    const header_response = await axios.get(API.HEADER_STUDIO(domain ,property_slug));
    headerData = header_response.data;
    console.log("headerData : " , headerData);



  const gallery_response = await axios.get(API.GALLERY_STUDIO(domain, property_slug));
  const gallery_photos = gallery_response.data?.property_photos;

  // Validate that gallery_photos is an array
  if (Array.isArray(gallery_photos)) {
    galleryData = gallery_photos;
  } else {
    console.error("Unexpected data format for gallery photos:", gallery_photos);
    galleryData = []; // Fallback to an empty array if the data is not an array
  }


  } catch (err) {
    error = `Failed to fetch property details: ${err.message} - ${API.PROPERTY_DETAILS(finalDomain)}`;
  }

  return {
    props: {
      propertyDetails,
      domain,
      templateid,
      headerData,
      galleryData,
      error,
      
    },
  };
}
export default App;
