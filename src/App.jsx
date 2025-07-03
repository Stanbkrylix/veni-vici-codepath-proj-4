import { useEffect, useState } from "react";

import "./App.css";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [dogArray, setDogArray] = useState([]);

    useEffect(() => {
        async function fetchDog() {
            try {
                const response = await fetch(
                    " https://api.thedogapi.com/v1/breeds",
                    {
                        headers: {
                            "x-api-key": ACCESS_KEY,
                        },
                    }
                );
                const dog = await response.json();
                setDogArray(dog);
            } catch (error) {
                console.log("Error", error);
            }
        }
        fetchDog();
    }, []);

    // useEffect(() => {
    //     console.log("Updated dogArray:", dogArray);
    // }, [dogArray]);

    return (
        <>
            <div className="app-container">
                <History />
                <AnimalLayout />
                <BanList />
            </div>
        </>
    );
}

function AnimalLayout() {
    return (
        <div className="animal-container">
            <h1>Dogs</h1>
            <p>Different dog breeds</p>
            <div className="animal-card">
                <h2 className="name">Dog name</h2>
                <div className="ban-attributes">
                    <button>attributes to ban</button>
                    {/* <img src="" alt="" /> */}
                </div>
            </div>
            <button className="new-dog-btn">🔀New Dog</button>
        </div>
    );
}

function History() {
    return (
        <div className="history-div">
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
        <div className="ban-lists">
            <p>Select an attribute in your listing to ban</p>
            <div className="ban-list">
                <button>placeHolder</button>
            </div>
        </div>
    );
}

export default App;
