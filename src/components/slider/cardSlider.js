"use client"

import { Image } from 'primereact/image'
import ReactSlidy from 'react-slidy'

export default function CardSlider(){

    return(

        <ReactSlidy     fullHeight  imageObjectFit="contain">
            <Image
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg" 
                width="250"
                className="img-fluid p-image"
                alt="logo myhot"
            />
            <Image
                src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg" 
                width="250"
                style={{width:"250"}}
                className="img-fluid p-image"
                alt="logo myhot"
            />
            <Image
                src="https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg" 
                width="250"
                style={{width:"250"}}
                className="img-fluid p-image"
                alt="logo myhot"
            />

        </ReactSlidy>
    )
}