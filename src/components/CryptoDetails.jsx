import React, {useState} from 'react'
import { useParams, Link } from "react-router-dom";
import millify from 'millify'
import HTMLReactParser, { domToReact } from 'html-react-parser'
import {SiBitcoincash} from 'react-icons/si'
import {IoIosPodium} from 'react-icons/io'
import {IoLayers} from 'react-icons/io5'
import {ImStatsBars} from 'react-icons/im'
import {MdSell, MdOutlineFormatListNumbered} from 'react-icons/md'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import {CgArrowsExchangeAltV} from 'react-icons/cg'
import {BsPatchCheckFill, BsCurrencyExchange} from 'react-icons/bs'
import {GiAbstract098} from 'react-icons/gi'

import Loader from "./Loader";

import { useGetDetailCoinQuery, useGetOhlcDetailQuery } from "../services/coinsApi";
import LineChart from './LineChart';

const CryptoDetails = () => {
  const { coinId } = useParams()
  const {data: coinDetail, isFetching} = useGetDetailCoinQuery(coinId)
  const {data: coinOhlc, isLoading} = useGetOhlcDetailQuery(coinId)
  if(isFetching) return <Loader/>
  if(isLoading) return <Loader/>
  const detail = coinDetail?.data?.coin
  const ohlc = coinOhlc?.data?.ohlc[0]
  return (
    <div className='mt-28  mx-8'>
      <h1 className={`text-3xl text-center font-bold text-[${detail?.color}]`}>{detail?.name} Coin Statistics</h1>
      <div className='md:flex-row flex flex-col justify-center items-center md:justify-between my-4'>
        <div className='flex gap-3 items-center'>
          <img src={detail?.iconUrl} alt={detail?.name} className='w-8' />
          <h1 className='text-2xl font-bold'>{detail?.name}</h1>
          <h1 className='text-blue-400'>{detail?.symbol}  #{detail?.rank}</h1>
        </div>
        <h1 className='md:text-2xl text-base font-bold text-blue-400'>Price <span className='text-white'>${millify(detail?.price, {precision:7})}</span></h1>
      </div>
      <div className=' flex justify-between mt-3 mx-1 text-sm flex-wrap gap-2 md:flex-nowrap md:gap-0'>
        <p className='text-blue-400'>Open <span className='text-white font-bold'>${millify(ohlc?.open, {precision:5})}</span></p>
        <p className='text-blue-400'>High <span className='text-white font-bold'>${millify(ohlc?.high, {precision:5})}</span></p>
        <p className='text-blue-400'>Low <span className='text-white font-bold'>${millify(ohlc?.low, {precision:5})}</span></p>
        <p className='text-blue-400'>Average <span className='text-white font-bold'>${millify(ohlc?.avg, {precision:5})}</span></p>
        <p className='text-blue-400'>Close <span className='text-white font-bold'>${millify(ohlc?.close, {precision:5})}</span></p>
        <p className='text-blue-400'>24h <span className={detail?.change > 0 ? ' text-green-600' : ' text-red-600'}>{millify(detail?.change, {precision:5})}%</span></p>
      </div>
      <div className='mt-8'>
        <LineChart coinName={detail?.name} coinHistory={history}/>
      </div>
      <div className='text-end mt-4 mb-8'>
        <Link
          to="cryptocurrencies"
          className="relative mt-4 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#2fff05] via-[#54bdff] to-[#1e00ff] group-hover:from-[#2fff05] group-hover:via-[#54bdff] group-hover:to-[#1e00ff] absolute"></span>
            <span className="relative px-2 md:px-6 py-1 md:py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <span className="relative text-xs md:text-xl text-white">Add to watchlist</span>
            </span>
        </Link>
      </div>
      {/* description */}
      <div className='flex flex-col md:flex-row justify-between text-white'>
        <div className='flex flex-col md:w-[48%] text-justify'>
          <h1 className='text-2xl font-bold'>What is {detail?.name}</h1>
          <div className=' leading-7'>
            {HTMLReactParser(detail?.description, {replace:({attribs, children}) => {
              if(attribs === 'h3') {
                return <h3 className='text-2xl font-bold'>{domToReact(children)}</h3>
              }
            }})}
          </div>
          <div className='mt-8'>
            <h1 className='text-2xl font-bold'>Link of {detail?.name}</h1>
            {detail?.links.map((link, index) => (
              <div key={index} className='flex justify-between border-b-2 border-gray-500 py-2'>
                <p>{link.type.toUpperCase()}</p>
                <a href={link.url} target='_blank' rel="noopener noreferrer" className=' hover:text-blue-400'>{link.name}</a>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col md:w-[48%] text-justify mt-6 md:mt-0'>
          <h1 className='text-2xl font-bold'>Value Statistic</h1>
          <p className='text-blue-400'>An overview showing the statistics of {detail?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          <div className='flex flex-col bg-gray-700 gap-4 mt-4'>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-3 items-center'><RiMoneyDollarCircleFill size={28}/> <span>Price to USD</span></p>
              <p>$ {millify(detail?.price, {precision:7})}</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><SiBitcoincash size={24}/> <span>Price to BTC</span></p>
              <p>{millify(detail?.btcPrice, {precision:7})} Btc</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><IoIosPodium size={24}/> <span>Rank</span></p>
              <p># {detail?.rank}</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><IoLayers size={24}/> <span>24h volume</span></p>
              <p>$ {millify(detail['24hVolume'], {precision:3})}</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><MdSell size={24}/> <span>Market cap</span></p>
              <p>$ {millify(detail?.marketCap, {precision:3})}</p>
            </div>
            <div className='flex justify-between items-center border-b-2 border-gray-500 px-4 py-2'>
              <p className='flex gap-4 items-center'><ImStatsBars size={24}/> <span className='flex flex-col'>All-time high <span>(dialy avg.)</span> </span></p>
              <p className='flex flex-col items-end'>$ {millify(detail?.allTimeHigh?.price, {precision:7})} <span className='text-xs'>on ({new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(detail?.allTimeHigh.timestamp*1000)})</span></p>
            </div>
          </div>
          {/* supply information */}
          <h1 className='text-2xl font-bold mt-8'>Supply Information</h1>
          <p className='text-blue-400'>View the total and circulating supply of {detail?.name}, including details on how the supplies are calculated.</p>
          <div className='flex flex-col bg-gray-700 gap-4 mt-4'>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-3 items-center'><MdOutlineFormatListNumbered size={28}/> <span>Number of markets</span></p>
              <p>{detail?.numberOfMarkets}</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><CgArrowsExchangeAltV size={24}/> <span>Number of exchanges</span></p>
              <p>{detail?.numberOfExchanges}</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><BsPatchCheckFill size={22}/> <span>Approved supply</span></p>
              <p>{detail?.supply.confirmed? 'Yes' : 'No'}</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><BsCurrencyExchange size={24}/> <span>Circulating supply</span></p>
              <p>{millify(detail?.supply.circulating, {precision:3})} {detail?.symbol}</p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><GiAbstract098 size={24}/> <span>Total of supply</span></p>
              <p>{millify(detail?.supply.total, {precision:3})} {detail?.symbol}</p>
            </div>
            <div className='flex justify-between items-center border-b-2 border-gray-500 p-4'>
              <p className='flex gap-4 items-center'><IoIosPodium size={24}/> <span>Tier of coin</span></p>
              <p className='flex flex-col items-end'>#{detail?.tier}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoDetails