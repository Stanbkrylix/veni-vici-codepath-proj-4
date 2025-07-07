import { useEffect, useState } from "react";

import "./App.css";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [dataArray, setDataArray] = useState([]);
    const [displayData, setDisplayData] = useState(null);
    const [historyData, setHistoryData] = useState([]);

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
                setDataArray(filterData);
            } catch (error) {
                console.log("Error", error);
            }
        }
        fetchData();
    }, []);

    function getRandomData() {
        const dataIndex = Math.floor(Math.random() * dataArray.length - 1);
        const randomData = dataArray[dataIndex];
        return randomData;
    }
    function handleDisplay() {
        const randomObject = getRandomData();
        setDisplayData(randomObject);
        setHistoryData((prev) => [...prev, randomObject]);

        console.log(displayData);
    }
    return (
        <>
            <div className="app-container">
                <History historyData={historyData} />
                <AnimalLayout
                    handleDisplay={handleDisplay}
                    displayData={displayData}
                />
                <BanList />
            </div>
        </>
    );
}
// "https://nrs.harvard.edu/urn-3:HUAM:78315_dynmc"
function AnimalLayout({ handleDisplay, displayData }) {
    // console.log(displayData);
    return (
        <div className="animal-container">
            <h1>Dogs</h1>
            <p>Different dog breeds</p>
            <div className="animal-card">
                <h2 className="name">{displayData && displayData.title}</h2>
                <div className="ban-attributes">
                    {displayData && <button> {displayData.culture}</button>}
                    {displayData && <button> {displayData.century}</button>}
                    {displayData && (
                        <button> {displayData.classification}</button>
                    )}
                    {displayData && <button> {displayData.division}</button>}
                </div>

                <img
                    className="display-image"
                    src={displayData && displayData.images[0].baseimageurl}
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
                    historyData.map((item) => (
                        <div className="history-card">
                            <img
                                className="history-image"
                                src={item.primaryimageurl}
                                alt=""
                            />
                            <p>placeHolder</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
function BanList() {
    return (
        <div className="ban-lists-container">
            <p>Select an attribute in your listing to ban</p>
            <div className="ban-list">
                <button>placeHolder</button>
            </div>
        </div>
    );
}

export default App;
