"use client"

import { RatingComponentStarAndValue } from "./RatingComponent";


export function EvaluationStars({data}){

    return (
      <div className="d-flex align-items-center">
        <RatingComponentStarAndValue rateData={data} />
        <p className="my-0 ms-2"> | 1 avis</p>
      </div>
    );
}