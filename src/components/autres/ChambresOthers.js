"use client"
import { useQuery } from "@tanstack/react-query";
import ChambreCard from "../cards/chambresCard";
import "@/assets/styles/listChambres.css";
import { getAllOthersChambres } from "@/api/chambres/chambres";
import { Carousel } from "primereact/carousel";

export default function ChambresOthers() {
    const responsiveOptions = [
      {
        breakpoint: "1400px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "1199px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "575px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  const {
    isLoading: isLoadingOtherChambres,
    isFetching: isFetchingOtherChambres,
    data: listOtherChambres,
  } = useQuery({
    queryKey: ["list-others-chambres-list"],
    queryFn: () => getAllOthersChambres(),
  });


    const chambreTemplate = (chambre) => {
      return (
        <div className="mx-3">
            <ChambreCard
              data={chambre}
              isPending={isLoadingOtherChambres || isFetchingOtherChambres}
            />
        </div>
      );
    };

  return (
    <section className="mt-4">
      <div className="">
        <Carousel
          value={listOtherChambres}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={chambreTemplate}
        />
        {/* <div className="listChambre__grid">
          {listOtherChambres?.map((chambre, index) => (
            <ChambreCard
              key={index}
              data={chambre}
              isPending={isLoadingOtherChambres || isFetchingOtherChambres}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
