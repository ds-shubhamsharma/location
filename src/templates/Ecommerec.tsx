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
      $id: "e-commerecsite",
  
      fields: [
        "id",
        "uid",
        "meta",
        "name",
        "c_relation_for_shoes.name",
        "c_relation_for_shoes.slug"
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
    const { name ,c_relation_for_shoes} = document;
  
  
const data = c_relation_for_shoes.map((item:any)=>{
        return <a href={item.slug} >{item.name}</a>
})



    return (
      <>
        <Header />
        {name}
        {data}
        <Footer/>
      </>
    );
  };
  
  export default Ecommerce;