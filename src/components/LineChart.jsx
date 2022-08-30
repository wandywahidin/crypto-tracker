import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale,Tooltip,
    Legend, Filler } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

import { useGetPriceHistoryQuery } from '../services/coinsApi'
import Loader from './Loader'

const LineChart = ({coinName}) => {
    const {coinId} = useParams()
    const {data : coinPriceHistory, isFetching} = useGetPriceHistoryQuery(coinId)
    if(isFetching) return <Loader/>

    const coinPrice = []
    const coinTimeStamp =[]
    for (let i = 0; i < coinPriceHistory?.data.history.length; i++) {
        coinPrice.push(coinPriceHistory?.data.history[i].price)
        coinTimeStamp.push(new Date(coinPriceHistory?.data.history[i].timestamp *1000).toLocaleTimeString())
    }
    
    const data = {
        labels : coinTimeStamp,
        datasets : [
            {
                label : 'Price in USD',
                data : coinPrice,
                fill: true,
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderColor: '#0071bd',
            }
        ]
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${coinName} Price Chart in ${new Date(coinPriceHistory?.data.history[0].timestamp *1000).toLocaleDateString()}`,
          },
        },
    }

  return (
    <div>
        <Line data={data} options={options} className='bg-gray-800 text-white' />
    </div>
  )
}

export default LineChart