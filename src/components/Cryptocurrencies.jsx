import React, { useState, useEffect } from "react";
import millify from "millify";
import { useNavigate } from "react-router-dom";

import { useGetAllCoinsQuery } from "../services/coinsApi";
import Loader from "./Loader";

const Cryptocurrencies = ({simplified}) => {
  const navigate = useNavigate()
  const count = simplified ? 10 : 100;
  const { data : coins, isFetching} = useGetAllCoinsQuery(count);
  const [coinlist, setCoinlist] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    setCoinlist(coins?.data.coins)
    const filterData = coins?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchQuery));
    setCoinlist(filterData)
  },[coins, searchQuery])

  if(isFetching) {
    return <Loader/>
  }

  const handleToDetail = (coinId) => {
    navigate(`/crypto/${coinId}`)
  }

  return (
    <>
      <div className="container pt-16 mx-auto w-full">
        {
          !simplified && (
            <div className="flex justify-center my-6">
              <input type="text" placeholder="Search Crypto" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} className='w-[50%] text-center px-2 py-2 text-white bg-transparent border border-white text-xl'/>
            </div>
          )
        }
        <div className=" overflow-x-auto relative mx-auto">
          <table className="w-full mx-auto text-sm text-left text-white">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Rank
                </th>
                <th scope="col" className="py-3 px-6 text-center md:text-start">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Symbol
                </th>
                <th scope="col" className="py-3 px-6">
                  24h %
                </th>
                <th scope="col" className="py-3 px-6">
                  Market Cap
                </th>
                <th scope="col" className="py-3 px-6">
                  24h Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {coinlist?.map((item) => (
                <tr className=" border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 backdrop-filter backdrop-blur" key={item.uuid} onClick={() => handleToDetail(item.uuid)}>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.rank}</th>
                  <th className="flex items-center gap-4 py-4 px-6">
                    <img className="w-7" src={item.iconUrl} alt={item.name} />{" "}
                    {item.name}
                  </th>
                  <th className="py-4 px-6">{item.symbol}</th>
                  <th className={item.change > 0 ? 'px-6 py-4 text-green-600' : 'px-6 py-4 text-red-600'}>{item.change} %</th>
                  <th className="py-4 px-6">{millify(item.marketCap)}</th>
                  <th className="py-4 px-6">{millify(item["24hVolume"])}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cryptocurrencies;
