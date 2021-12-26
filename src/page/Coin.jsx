import React from "react";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import LineChartCoin from "../component/LineChartCoin";
const timeFrames = ["1Y", "200D", "60D", "30D", "14D", "7D"];
const Coin = () => {
  const params = useParams();
  const [data, setData] = React.useState(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = React.useState(0);
  const allMarketData = React.useRef([]);
  function numberWithCommas(x) {
    if (x === undefined || x === null) return "0";
    var str = x.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        fetch(
          "https://api.coingecko.com/api/v3/coins/" +
            params.id +
            "/market_chart?vs_currency=usd&days=365"
        )
          .then((response) => response.json())
          .then((data) => {
            var prices = [];
            data.prices.forEach((item) => {
              prices.push({ Date: item[0], Price: item[1] });
            });
            allMarketData.current = prices;
            if (selectedTimeFrame != 0) setSelectedTimeFrame(0);
            setDailyData(prices);
          });
      });
  }, [params.id]);
  const [dailyData, setDailyData] = React.useState(null);

  const getLoadingDiv = () => {
    return (
      <div className="flex h-full font-bold p-3">
        <div className="m-auto">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  };

  const getCoinHeader = () => (
    <>
      <div className="p-2">
        <img src={data.image.thumb} className="inline-block" alt="coinIcon" />
        <h1 className="font-bold p-1 inline-block">
          {data.name + " (" + data.symbol + ")"}
        </h1>
      </div>
      <div className="p-2">
        <h2 className="font-bold p-1 inline-block text-lg">
          {"$ " + numberWithCommas(data.market_data.current_price.usd)}
        </h2>
        {getPriceChangeDiv()}
      </div>
    </>
  );

  const getRangeBar = () => (
    <div className="p-2">
      <div className="bg-gray-400 h-1 mx-2">
        <div
          className="bg-gray-800 h-1"
          style={{ width: getHighLowCurrentPercentWidth() + "%" }}
        ></div>
      </div>
      <div className="p-2 flex flex-grow">
        <div className="flex-grow">
          {numberWithCommas(
            data.market_data.low_24h.usd < data.market_data.current_price.usd
              ? data.market_data.low_24h.usd
              : data.market_data.current_price.usd
          )}
        </div>
        <div className="flex-grow text-center">Range 24H</div>
        <div className="flex-grow text-right">
          {numberWithCommas(data.market_data.high_24h.usd)}
        </div>
      </div>
    </div>
  );

  const getHighLowCurrentPercentWidth = () => {
    const marketData = data.market_data;
    if (marketData.current_price.usd <= marketData.low_24h.usd) return 0;
    return (
      ((marketData.current_price.usd - marketData.low_24h.usd) /
        (marketData.high_24h.usd - marketData.low_24h.usd)) *
      100
    );
  };

  const getPriceChangeDiv = () => {
    var textColorClass = "text-green-600";
    if (data.market_data.price_change_percentage_24h_in_currency.usd < 0)
      textColorClass = "text-red-600";
    return (
      <h3
        className={"font-bold p-0 inline-block text-normal " + textColorClass}
      >
        {data.market_data.price_change_percentage_24h_in_currency.usd.toPrecision(
          4
        ) + "%"}
      </h3>
    );
  };

  const getDescription = () => (
    <div className="p-2">
      <h3 className="font-bold p-1">Description</h3>
      <p className="p-1 text-sm">{removeTags(data.description.en)}</p>
    </div>
  );

  const getMarketData = () => (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1">
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">Market Cap</div>
          <div>{"$" + numberWithCommas(data.market_data.market_cap.usd)}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">Fully Diluted Valuation</div>
          <div>
            {"$" +
              numberWithCommas(data.market_data.fully_diluted_valuation.usd)}
          </div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">Total Volume</div>
          <div>{"$" + numberWithCommas(data.market_data.total_volume.usd)}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">Circulation Supply</div>
          <div>{numberWithCommas(data.market_data.circulating_supply)}</div>
        </div>{" "}
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">Total Supply</div>
          <div>{numberWithCommas(data.market_data.total_supply)}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">Max Supply</div>
          <div>{numberWithCommas(data.market_data.max_supply)}</div>
        </div>
      </div>
    </div>
  );

  const getAlphaByTime = () => (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-1">
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">24H</div>
          <div>{data.market_data.price_change_percentage_24h + "%"}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">7D</div>
          <div>{data.market_data.price_change_percentage_7d + "%"}</div>
        </div>{" "}
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">14D</div>
          <div>{data.market_data.price_change_percentage_14d + "%"}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">30D</div>
          <div>{data.market_data.price_change_percentage_30d + "%"}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">60D</div>
          <div>{data.market_data.price_change_percentage_60d + "%"}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">200D</div>
          <div>{data.market_data.price_change_percentage_200d + "%"}</div>
        </div>
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">1Y</div>
          <div>{data.market_data.price_change_percentage_1y + "%"}</div>
        </div>{" "}
        <div className="flex border-b pb-2 px-2">
          <div className="flex-grow">Market Cap Change</div>
          <div>{data.market_data.market_cap_change_percentage_24h + "%"}</div>
        </div>
      </div>
    </div>
  );

  const getTimeFrameSelectors = () => (
    <div className="border-2 rounded w-fit float-right mx-3">
      {timeFrames.map((timeFrame, index) => {
        return (
          <div
            key={timeFrame}
            className={
              "inline-block border px-2 cursor-pointer " +
              (selectedTimeFrame == index ? "bg-gray-300" : "")
            }
            onClick={(e) => {
              if (index == selectedTimeFrame) return;
              let sliceIndex = 365;
              switch (index) {
                case 1:
                  sliceIndex = 200;
                  break;
                case 2:
                  sliceIndex = 60;
                  break;
                case 3:
                  sliceIndex = 30;
                  break;
                case 4:
                  sliceIndex = 14;
                  break;
                case 5:
                  sliceIndex = 7;
                  break;
              }
              setSelectedTimeFrame(index);
              setDailyData(
                allMarketData.current.slice(
                  allMarketData.current.length - sliceIndex
                )
              );
            }}
          >
            {timeFrame}
          </div>
        );
      })}
    </div>
  );

  if (data == null)
    return (
      <div className="grid h-full grid-template-row-auto-1fr">
        <Header />
        {getLoadingDiv()}
      </div>
    );

  return (
    <div className="grid h-full grid-template-row-auto-1fr">
      <Header />
      <div className="h-full overflow-auto border-t ">
        <div className="h-full container m-auto">
          {getCoinHeader()}
          {getRangeBar()}
          {getMarketData()}
          {getDescription()}
          <div className="p-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-1">
              <div>
                <div style={{ height: 35 }}>{getTimeFrameSelectors()}</div>
                <LineChartCoin data={dailyData} />
              </div>
              {getAlphaByTime()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
