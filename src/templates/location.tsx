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
import Footer from "../components/footer";
import Header from "../components/header";
import "../index.css";

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

  return (
    <>
      <Header />
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
      <Footer/>
    </>
  );
};

export default Location;
