import { useEffect, useState } from "react";

import "./App.css";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [dogArray, setDogArray] = useState([]);
    const [displayDog, setDisplayDog] = useState(null);

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

    function getRandomDog() {
        const dogIndex = Math.floor(Math.random() * dogArray.length - 1);
        const randomDog = dogArray[dogIndex];
        return randomDog;
    }
    function handleDisplay() {
        setDisplayDog(getRandomDog());
        console.log(displayDog);
    }
    return (
        <>
            <div className="app-container">
                <History />
                <AnimalLayout handleDisplay={handleDisplay} />
                <BanList />
            </div>
        </>
    );
}

function AnimalLayout({ handleDisplay }) {
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
            <button className="new-dog-btn" onClick={handleDisplay}>
                🔀New Dog
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
