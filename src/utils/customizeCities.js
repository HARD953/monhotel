

export const customizeCities =(cities)=>{
    let citiesArray = cities.split("\n")
    let citiesCustomized =  citiesArray?.map(item=>{
    if(!!item)  return{
        name:item,
        code: item
    }
    
    })?.filter(item=> !!item)

    return citiesCustomized
}