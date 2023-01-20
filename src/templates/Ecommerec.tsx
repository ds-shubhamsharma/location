import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import "../index.css";
import axios from "axios";
import Card from "../components/card";

export const config: TemplateConfig = {
  stream: {
    $id: "e-commerecsite",

    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_relation_for_shoes.name",
      "c_relation_for_shoes.slug",
      
    ],

    filter: {
      entityTypes: ["ce_ecommerceApp"],
    },

    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `index.html`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
        },
      },
    ],
  };
};

const Ecommerce: Template<TemplateRenderProps> = ({ document }) => {
  const { name, c_relation_for_shoes} = document;

  const [apiData, setApiData] = React.useState([]);

  var config = {
    method: "get",
    url: "https://liveapi-sandbox.yext.com/v2/accounts/me/entities?api_key=a0db4a91072ddad5224c6c293d85aed7&v=20230110&entityTypes=location",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      setApiData(response?.data?.response?.entities);
    })
    .catch(function (error) {
      console.log(error);
    });

  // const data = c_relation_for_shoes.map((item: any) => {
  //   return <a href={item.slug}>{item.name}</a>;
  // });
  // const images = photoGallery.map((img: any) => {
  //   return <img src={img.image.url} />;
  // });
  return (
    <>
      <Header />
      {/* {name}
      {data} */}
      {/* {apiData?.map((data: any) => {
        return (
          <>
            <p>{data?.cityCoordinate?.latitude}</p>
            <p>{data?.cityCoordinate?.longitude}</p>
          
          </>
        );
      })} */}
      <div>
  
        <div className="container">
          <div className="row">
            {c_relation_for_shoes.map((element: any) => {
              return (
               <Card title={<a href={element.slug}>{element.name}</a>} url=""/>
              );
            })}
            
          </div>
        </div>
      </div>



      <Footer />
    </>
  );
};

export default Ecommerce;
