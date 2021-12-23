import React from "react";

const ListContainer = ({
  searchText = "",
  searchField = "",
  dataSet = ["Bitcoin", "Etherium", "DogeCoin"],
  getItemLayout = null,
  onClickItem = null,
  showOnSearchTextCount = 0,
  maxRecordsToShow = 100,
  adaptiveColumns = false,
  columns = 1,
}) => {
  const getNoRecordHtml = () => {
    return (
      <div className="flex h-full font-bold p-3">
        <div className="m-auto">
          <h3> No Records</h3>
        </div>
      </div>
    );
  };
  const getListItems = (listitemResult) => {
    let dataSetEmpty =
      dataSet === null || dataSet.length === undefined || dataSet.length === 0;

    if (dataSetEmpty) return getNoRecordHtml();
    if (
      showOnSearchTextCount > searchText.trim().length &&
      dataSet.length > maxRecordsToShow
    ) {
      return (
        <div className="flex h-full font-bold p-3">
          <div className="m-auto">
            <h3>Search to see</h3>
          </div>
        </div>
      );
    }

    let filteredDataSet = dataSet;
    if (!dataSetEmpty) {
      if (searchText !== "") {
        if (searchField === "")
          filteredDataSet = dataSet.filter(
            (item) =>
              item.toLowerCase().indexOf(searchText.trim().toLowerCase()) !== -1
          );
        else
          filteredDataSet = dataSet.filter(
            (item) =>
              item[searchField]
                .toLowerCase()
                .indexOf(searchText.trim().toLowerCase()) !== -1
          );
      }
      dataSetEmpty = filteredDataSet.length === 0;
    }
    if (dataSetEmpty) return getNoRecordHtml();
    if (getItemLayout === null) {
      listitemResult.showRows = true;
      return filteredDataSet.map((item, index) => (
        <div
          className={
            "block px-3 py-2 hover:bg-gray-400 " +
            (index === dataSet.length - 1 ? "" : "border-b")
          }
          onClick={(e) => {
            if (onClickItem !== null) onClickItem(e, item, index, dataSet);
          }}
          key={item}
        >
          {item}
        </div>
      ));
    } else {
      listitemResult.showRows = true;
      return filteredDataSet.map((item, index) =>
        getItemLayout(item, index, dataSet)
      );
    }
  };
  let listitemResult = { showRows: false };
  const listItems = getListItems(listitemResult);
  const gridClasses =
    "grid " +
    (!listitemResult.showRows
      ? ""
      : adaptiveColumns
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-" + Math.max(1, Math.min(columns, 4)));

  return <div className={gridClasses}>{listItems}</div>;
};

export default ListContainer;
