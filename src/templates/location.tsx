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
import axios from "axios";

import Footer from "../components/footer";
import Header from "../components/header";
import StaticMap from "../components/static-map";
import "../index.css";
import Card from "../components/card";

export const config: TemplateConfig = {
  stream: {
    $id: "location-1",

    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "price",
      "description",
      "color",
      "photoGallery",
      "slug",
    ],

    filter: {
      entityTypes: ["ce_shoes"],
    },

    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : ` ${document.id.toString()}`;
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

const Location: Template<TemplateRenderProps> = ({ document }) => {
  const { name, price, description, color, photoGallery } = document;

  const images = photoGallery.map((img: any) => {
    return <img src={img.image.url} />;
  });

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

  return (
    <>
      <Header />

      <div className="centered-container">
        <div className="grid grid-cols-2 gap-x-10 gap-y-10">
          <div
            className="bg-white-100 p-2 text-xl font-semibold"
            style={{ color: "black" }}
          >
            {`product name :  ${name}`}
            <br />
          </div>
          <div className="bg-white-100 p-2">
            <p>{`price :    $${document?.price.value}`}</p>
          </div>
          <div className="bg-white-100 p-2">
            <div className="text-xl font-semibold">{`About ${name}`}</div>
            <p className="pt-4">{description}</p>
          </div>
          <Card title={images} url="" />
        </div>
      </div>
      {apiData?.map((data: any) => {
        return (
          <StaticMap
            latitude={data.cityCoordinate.latitude}
            longitude={data.cityCoordinate.longitude}
          />
        );
      })}

      <Footer />
    </>
  );
};

export default Location;
