import React from "react";
import Header from "../component/Header";
import { FaChevronRight } from "react-icons/fa";
import ListContainer from "../component/ListContainer";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/list")
      .then((response) => response.json())
      .then((data) => setCoins(data));
  }, []);

  const onValueChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="grid h-full grid-template-row-auto-1fr">
      <Header showSearch={false} />
      <div className="grid grid-template-row-auto-1fr h-full overflow-hidden">
        <div className="shadow">
          <input
            className="bg-gray-200 w-1/2 mx-auto block my-5 border-2 rounded p-2"
            placeholder="Search"
            value={searchText}
            onChange={onValueChange}
          ></input>
        </div>
        <div className="overflow-auto">
          <ListContainer
            searchText={searchText}
            dataSet={coins}
            searchField="name"
            adaptiveColumns={true}
            showOnSearchTextCount={2}
            getItemLayout={(item, index, dataSet) => {
              return (
                <div
                  key={item.id}
                  className={
                    "flex hover:bg-gray-400 cursor-pointer " +
                    (index === dataSet.length - 1 ? "" : "border-b")
                  }
                  onClick={() => navigate("/Coin/" + item.id)}
                >
                  <div className=" flex-grow m-2">{item.name}</div>
                  <div className="m-2 pt-1">
                    <FaChevronRight />
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
