import { useEffect, useState } from "react";

import "./App.css";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [dataArray, setDataArray] = useState([]);
    const [displayData, setDisplayData] = useState(null);

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

    function getRandomDog() {
        const dogIndex = Math.floor(Math.random() * dataArray.length - 1);
        const randomDog = dataArray[dogIndex];
        return randomDog;
    }
    function handleDisplay() {
        setDisplayData(getRandomDog());
        // console.log(dataArray);
        console.log(displayData);
    }
    return (
        <>
            <div className="app-container">
                <History />
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
                {/* <h2 className="name">{displayData && displayData.name}</h2>
                <div className="ban-attributes">
                    {displayData && <button> {displayData.height.metric}</button>}
                    {displayData && <button> {displayData.life_span}</button>}
                    {displayData && (
                        <button> {displayData.weight.imperial}</button>
                    )}
                </div> */}

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

function History() {
    return (
        <div className="history-container">
            <h2>Who have we seen so far</h2>
            <div className="history-cards">
                <div className="history-card">
                    {/* <img src="" alt="" /> */}
                    <p>placeHolder</p>
                </div>
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
