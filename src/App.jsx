import { useEffect, useState } from "react";

import "./App.css";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [dataArray, setDataArray] = useState([]);
    const [displayData, setDisplayData] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [banList, setBanList] = useState([]);
    const [originalDataArray, setOriginalDataArray] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://api.harvardartmuseums.org/object?apikey=${ACCESS_KEY}&hasimage=1&size=100`
                );
                const data = await response.json();

                const filterData = data.records.filter(
                    (item) => item.primaryimageurl !== null
                );
                setOriginalDataArray(filterData);
                setDataArray(filterData);
            } catch (error) {
                console.log("Error", error);
            }
        }
        fetchData();
    }, []);

    function populateBanList(value) {
        setBanList((prev) => {
            if (!prev.includes(value)) {
                const updatedBanList = [...prev, value];

                const newList = originalDataArray.filter(
                    (item) =>
                        !updatedBanList.includes(item?.culture) &&
                        !updatedBanList.includes(item?.century) &&
                        !updatedBanList.includes(item?.classification) &&
                        !updatedBanList.includes(item?.division)
                );

                setDataArray(newList);
                return updatedBanList;
            }
            return prev;
        });
    }

    function getRandomData() {
        if (!dataArray.length) return null;
        const dataIndex = Math.floor(Math.random() * dataArray.length);
        const randomData = dataArray[dataIndex];
        return randomData;
    }
    function handleDisplay() {
        const randomObject = getRandomData();
        if (!randomObject) {
            alert("No more artwork to show — you've banned everything!");
            return;
        }
        setDisplayData(randomObject);
        setHistoryData((prev) => [...prev, randomObject]);

        console.log(displayData);
        console.log(dataArray);
    }
    function handleUnBan(value) {
        setBanList((prev) => {
            const updatedBanList = prev.filter((item) => item !== value);

            const newList = originalDataArray.filter(
                (item) =>
                    !updatedBanList.includes(item?.culture) &&
                    !updatedBanList.includes(item?.century) &&
                    !updatedBanList.includes(item?.classification) &&
                    !updatedBanList.includes(item?.division)
            );

            setDataArray(newList); // ✅ filtered from original list
            return updatedBanList;
        });
    }
    return (
        <>
            <div className="app-container">
                <History historyData={historyData} />
                <AnimalLayout
                    handleDisplay={handleDisplay}
                    displayData={displayData}
                    populateBanList={populateBanList}
                />
                <BanList banList={banList} handleUnBan={handleUnBan} />
            </div>
        </>
    );
}
// "https://nrs.harvard.edu/urn-3:HUAM:78315_dynmc"
function AnimalLayout({ handleDisplay, displayData, populateBanList }) {
    // console.log(displayData);
    return (
        <div className="animal-container">
            <h1>Museum Arts</h1>
            <p>Historical Arts</p>
            <div className="animal-card">
                <h2 className="name">{displayData && displayData.title}</h2>
                <div className="ban-attributes">
                    {displayData && displayData.culture && (
                        <button
                            onClick={() =>
                                populateBanList(displayData?.culture)
                            }
                        >
                            {" "}
                            {displayData?.culture}
                        </button>
                    )}
                    {displayData && displayData.century && (
                        <button
                            onClick={() =>
                                populateBanList(displayData?.century)
                            }
                        >
                            {" "}
                            {displayData.century}
                        </button>
                    )}
                    {displayData && displayData.classification && (
                        <button
                            onClick={() =>
                                populateBanList(displayData?.classification)
                            }
                        >
                            {" "}
                            {displayData.classification}
                        </button>
                    )}
                    {displayData && displayData.division && (
                        <button
                            onClick={() =>
                                populateBanList(displayData?.division)
                            }
                        >
                            {" "}
                            {displayData.division}
                        </button>
                    )}
                </div>

                <img
                    className="display-image"
                    src={
                        displayData?.primaryimageurl ||
                        displayData?.images?.[0]?.baseimageurl
                    }
                    alt=""
                />
            </div>
            <button className="new-dog-btn" onClick={handleDisplay}>
                🔀New image
            </button>
        </div>
    );
}

function History({ historyData }) {
    return (
        <div className="history-container">
            <h2>Who have we seen so far</h2>
            <div className="history-cards">
                {historyData &&
                    historyData.map((item, i) => (
                        <div key={i} className="history-card">
                            <img
                                className="history-image"
                                src={item?.primaryimageurl}
                                alt=""
                            />
                            <p>
                                A {item.culture} {item.classification} from the{" "}
                                {item.century}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
function BanList({ banList, handleUnBan }) {
    return (
        <div className="ban-lists-container">
            <p>Select an attribute in your listing to ban</p>
            <div className="ban-list">
                {banList.map((item, i) => (
                    <button onClick={() => handleUnBan(item)} key={i}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
