/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

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
// import Banner from "../components/banner";
// import Details from "../components/details";
// import Hours from "../components/hours";
// import List from "../components/list";
// import PageLayout from "../components/page-layout";
// import StaticMap from "../components/static-map";
import "../index.css";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "location-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "price",
      "description",
      "color",
      "photoGallery",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_shoes"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : ` ${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
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

const Location: Template<TemplateRenderProps> = ({

  document,
}) => {

  
  const { name, price, description, color, photoGallery } = document;


  const images = photoGallery.map((img: any) => {
    // eslint-disable-next-line react/jsx-key
    return <img src={img.image.url} />;
  });

  return (
    <>
      <div style={{ backgroundColor: "skyblue" }}>
        <div className="centered-container">
          <div className="section">
            <div className="grid grid-cols-2 gap-x-10 gap-y-10">
              <div
                className="bg-gray-100 p-2"
                style={{ color: "blue", fontFamily: "cursive" }}
              >{`product name :  ${name}`}</div>
              <div className="bg-gray-100 p-2">
                <p>{`price :    $${document?.price.value}`}</p>
              </div>
              <div className="bg-gray-100 p-2">
                <div className="text-xl font-semibold">{`About ${name}`}</div>
                <p className="pt-4">{description}</p>
              </div>
              <div className="bg-gray-100">{images}</div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Location;
