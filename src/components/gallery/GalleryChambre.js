"use client"
import Image from 'next/image'
import AppButton from '../buttons/AppButton'
import { useEffect, useRef, useState } from 'react';
import GalleryChambreDetails from './galleryChambreDetails';

import "@/assets/styles/GalleryChambre.css"
// import { Button } from 'primereact/button';
import { Button  } from '@nextui-org/react';
import Gallery from './Gallery';



const galleries = [
  {
    isMain : true,
    alt : "gallery_chambre",
    src : "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    isMain : false,
    alt : "gallery_chambre",
    src : "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    isMain : false,
    alt : "gallery_chambre",
    src : "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    isMain : false,
    alt : "gallery_chambre",
    src : "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    isMain : false,
    alt : "gallery_chambre",
    src : "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
]





export default function GalleryChambre({images}) {

  

  return (
    <div className="gallery_chambre">
      <GalleryChambreDetails images={images}  />
    </div>
  )
}