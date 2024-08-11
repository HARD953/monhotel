"use client"
import { customizeImageSrc } from '@/utils/servicesUtils';
import {Image} from 'primereact/image';
import React, { useState, useEffect, useRef } from 'react';
import { Galleria } from "primereact/galleria";


export default function GalleryChambreDetails({images}) {
      const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

   const [imagesList, setImagesList] = useState("");

 
    const itemTemplate = (item) => {
      return (
        <Image
          src={customizeImageSrc(item?.url)}
          alt={"chambre_image"}
          style={{ width: "100%" }}
          // height="20rem"
        />
      );
    };

    const thumbnailTemplate = (item) => {
      return <Image  src={customizeImageSrc(item?.url)} alt={"chambre_image"} />;
    };

    useEffect(() => {
      const _images = images?.length ? images : []
      setImagesList(_images);

    }, [images]);



    return (
      <div className=" d-flex justify-content-center gallery-chambre-container">
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={5}
          style={{ width: "100%" }}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          className="gallery-chambre-container-main"
          showThumbnails={true}
          showThumbnailNavigators={true}
          showItemNavigators
          showItemNavigatorsOnHover
        />
      </div>
    );
}
        