"use client"
import { Image } from "primereact/image"
import { useEffect, useState } from "react"
import { Carousel } from 'primereact/carousel';
// import Slider from "react-slick";
import { Skeleton } from "primereact/skeleton";

import "@/assets/styles/gallery.css"
import { customizeImageSrc } from "@/utils/servicesUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavoris, deleteFavoris, getFavoris } from "@/api/favoris/favoris";


export default function Gallery({isLoadingSkeleton,images,chambre}){
    const [imagesList,setImagesList] = useState([])
    const queryClient =  useQueryClient()
    const [isLiked,setIsLiked] = useState(false)

        const photoTemplate = (image) => {
            return (
              <div className="gallery_image_container">
                <Image
                  src={customizeImageSrc(image?.url)}
                  alt={image?.id}
                  className="w-100 shadow-2 img-fluid"
                />
              </div>
            );
        };
      
    const {
      isLoading: isLoadingFavoris,
      isFetching: isFetchingFavoris,
      data: dataFavoris,
    } = useQuery({
      queryKey: ["chambres-favoris-list"],
      queryFn: () => getFavoris(),
    });

    const mutationAddFavoris = useMutation({
      mutationKey: ["add-favoris"],
      mutationFn: async () => {
        return await addFavoris({
          chambreId: chambre?.id,
        });
      },
      onSuccess: async () => {
      await queryClient.invalidateQueries(["chambre-favoris"]);
        setIsLiked(true);
      },
      onError: async (err) => {
        console.log(err.message);
        // setVisibleError(true);
      },
    });

    const mutationDeleteFavoris = useMutation({
      mutationKey: ["delete-favoris"],
      mutationFn: async () => {
        return await deleteFavoris({
          chambreId: chambre?.id,
        });
      },
      onSuccess: async () => {
      await queryClient.invalidateQueries(["chambre-favoris"]);
        setIsLiked(false);
      },
      onError: async (err) => {
        console.log(err.message);
        // setVisibleError(true);
      },
    });
    
    const handleFavoris = ()=>{
      isLiked ? mutationDeleteFavoris.mutate() : mutationAddFavoris.mutate();
    }

    useEffect(()=>{
        setImagesList(images)
    },[images])

    useEffect(() => {
        const isFavoris = dataFavoris?.find((fav) => fav?.chambre_id === chambre?.id);
        if(isFavoris){
          setIsLiked(true);
        }else{
          setIsLiked(false);
        }
    }, [chambre, dataFavoris]);

    return (
      <div className="chambre_gallery">
        {isLoadingSkeleton ? (
          <Skeleton height="250px"></Skeleton>
        ) : (
          <>
            <div className="gallery__image_likes_container elementNoRedirect">
              <i
                className={`pi pi-heart elementNoRedirect ${
                  isLiked && "active"
                } `}
                onClick={() => handleFavoris()}
              ></i>
            </div>
            <Carousel
              style={{
                height: "250px",
              }}
              value={imagesList}
              numVisible={1}
              numScroll={1}
              // responsiveOptions={responsiveOptions}
              itemTemplate={photoTemplate}
            />
          </>
        )}
      </div>
    );
}