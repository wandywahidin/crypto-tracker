import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";

import crypto from "../assets/crypto.jpg";
import { useGetAllCoinsQuery } from "../services/coinsApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const Homepage = () => {
  const { data, isFetching } = useGetAllCoinsQuery(10);
  const globalCoins = data?.data?.stats;

  if (isFetching) return "Loading..."

  return (
    <>
      <div className="w-full">
        <div className="fixed -top-32 -z-10 bg-gradient-to-r from-black to-white">
          <img
            src={crypto}
            alt="crypto"
            className="w-full md:h-full h-screen object-cover"
          />
        </div>
        <div className="flex flex-col mt-36 items-center justify-center backdrop-filter backdrop-blur-sm md:w-[50%] rounded-full py-4 mx-auto">
          <h1 className="md:text-5xl text-3xl text-center font-bold w-96 mx-3">
            We make crypto simply and clear
          </h1>
          <h1 className="text-lg text-center p-4">
            An overview of the complete cryptocurrency market, including the
            number of cryptocurrencies, the total market cap, and thading
            volume.
          </h1>
          <Link
            to="cryptocurrencies"
            className="relative mt-4 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
              <span className="w-full h-full bg-gradient-to-br from-[#2fff05] via-[#54bdff] to-[#1e00ff] group-hover:from-[#2fff05] group-hover:via-[#54bdff] group-hover:to-[#1e00ff] absolute"></span>
              <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                <span className="relative text-xl text-white">Explore</span>
              </span>
          </Link>
        </div>
        <div className="flex mt-32 flex-col">
          <div className="flex justify-center gap-4 py-6 flex-wrap">
            <div className="md:p-4 p-2 border border-white backdrop-filter backdrop-blur">
              <h1 className="font-bold">Total Cryptocurrencies</h1>
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-900 font-extrabold md:text-3xl text-2xl">
                {globalCoins.totalCoins}
              </h1>
            </div>
            <div className="md:p-4 p-2 border border-white backdrop-filter backdrop-blur">
              <h1 className="font-bold">Total Exchange</h1>
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-900 font-extrabold text-2xl md:text-3xl">
                {millify(globalCoins.totalExchanges)}
              </h1>
            </div>
            <div className="md:p-4 p-2 border border-white backdrop-filter backdrop-blur">
              <h1 className="font-bold">Total Market Cap</h1>
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-900 font-extrabold md:text-3xl text-2xl">
                {millify(globalCoins.totalMarketCap)}
              </h1>
            </div>
            <div className="md:p-4 p-2 border border-white backdrop-filter backdrop-blur">
              <h1 className="font-bold">Total 24h Volume</h1>
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-900 font-extrabold md:text-3xl text-2xl">
                {millify(globalCoins.total24hVolume)}
              </h1>
            </div>
            <div className="md:p-4 p-2 border border-white backdrop-filter backdrop-blur">
              <h1 className="font-bold">Total Markets</h1>
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-900 font-extrabold md:text-3xl text-2xl">
                {millify(globalCoins.totalMarkets)}
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-center md:text-4xl text-2xl font-bold pt-4">
              Top 10 Cryptos In the World
            </h1>
            <div className=" -mt-5">
              <Cryptocurrencies simplified />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
