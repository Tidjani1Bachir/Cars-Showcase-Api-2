"use client"
import { useState ,useEffect } from "react";
import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import Image from "next/image";

export default function Home() {
  const  [allCars, setAllCars] = useState([])
  const  [loading, setLoading] = useState(false)
  // Search State
  const  [manuFacturer, setManuFacturer] = useState("")
  const  [model, setModel] = useState("")

  // filter state
const [fuel, setFuel] = useState("")
const [year, setYear] = useState(2022)

// pagination state
const [limit, setLimit] = useState(10)
const getCars =async () => {
  setLoading(true)
  try {
   const result = await fetchCars({
  manufacturer: manuFacturer || "",
  year: year || 2023,
  fuel: fuel || "",
  limit: limit || 10,
  model: model || "",
});
setAllCars(result)
 } catch (error) {
  console.log(error);
  
  
 } finally {
   setLoading(false)
 }
}

useEffect(() => {
  // console.log(fuel,year,manuFacturer,model);
  
  getCars();

}, [fuel,manuFacturer,model])

  // to make next js automaticly fetch data when we change the type of car 
  
  

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManuFacturer={setManuFacturer} setModel ={setModel} />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel}/>
            {/* <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} /> */}
          </div>
        </div>

        {allCars.length > 0  ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car,index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
{loading &&
<div className="mt-16 w-full flex-center">
  <Image
  src="/loader.svg"
  alt="loader"
  width={50}
  height={50}
  className="object-contain"
  />
</div>
}
            <ShowMore
              pageNumber={limit  / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            
          </div>
        )}
      </div>
    </main>
  );
}
