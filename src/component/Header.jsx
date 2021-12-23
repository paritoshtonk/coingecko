import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Header = ({ showSearch = true }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white flex ">
      <div className="text-black font-bold flex-grow m-2 cursor-pointer">
        CoinGecko
      </div>
      {showSearch ? (
        <div className="p-2 pt-3 cursor-pointer" onClick={() => navigate("/")}>
          <FaSearch />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
