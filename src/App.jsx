import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const deffaultTeams = [
  "PSG",
  "Liverpool",
  "Chelsea",
  "Napoli",
  "Arsenal",
  "France",
  "Portugal",
  "Argentina",
  "Germany",
  "England",
  "Italy",
  "Brazil",
  "Spain",
  "Atletico Madrid",
  "FC Barcelona",
  "FC Bayern",
  "Real Madrid",
  "Manchester City",
  "Manchester United",
  "Tottenham",
  "AC Milan",
  "Inter Milan",
  "Juventus",
];

function App() {
  const [players, setPlayers] = useState([]);
  const [inputPlayer, setInputPlayer] = useState(""); // controled input
  const [inputTeam, setTeamInput] = useState(""); // controled input
  const [Player1Team, setPlayer1Team] = useState("");
  const [Player2Team, setPlayer2Team] = useState("");
  const [disabled, setDisabled] = useState("disabled");
  const [show, setshow] = useState(false);
  useEffect(() => {
    if (players.length <= 1) {
      setDisabled("disabled");
    } else if (players.length > 1) {
      setDisabled("primary");
    }
  }, [players, setDisabled]);
  const generateTeam = () => {
    let temp1 = Math.round(Math.random() * (deffaultTeams.length - 1));
    let temp2 = Math.round(Math.random() * (deffaultTeams.length - 1));
    while (temp1 == temp2) {
      temp2 = Math.round(Math.random() * (deffaultTeams.length - 1));
    }
    setPlayer1Team(deffaultTeams[temp1]);
    setPlayer2Team(deffaultTeams[temp2]);
  };
  const addToPool = () => {
    if (inputPlayer == "") return;
    let tmp = [...players];
    if (tmp.includes(inputPlayer)) return;

    tmp.push(inputPlayer);
    setPlayers(tmp);
    setInputPlayer("");
  };
  function shufflePlayers() {
    let tmpPlayers = [...players];
    for (let z = 0; z < 10; z++) {
      for (let i = tmpPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tmpPlayers[i], tmpPlayers[j]] = [tmpPlayers[j], tmpPlayers[i]];
      }
    }
    setPlayers(tmpPlayers);
  }
  const clear = () => {
    setInputPlayer("");
    setPlayers([]);
  };
  const addTeam = () => {
    if (deffaultTeams.includes(inputTeam)) return;
    deffaultTeams.push(inputTeam);
    setTeams(deffaultTeams);
  };
  return (
    <>
      <div className="container  flex justify-center py-24 gap-5">
        <div className="flex justify-center gap-5 h-max">
          <div className=" p-5 bg-base-200 rounded-lg shadow-md min-h-[288px]  grid place-content-center">
            <input
              onChange={(e) => {
                setInputPlayer(e.target.value);
              }}
              value={inputPlayer}
              type="text"
              placeholder="Player"
              className="input input-bordered input-primary min-w-[300px]  mb-5"
            />
            <button
              onClick={() => addToPool()}
              className="btn btn-primary w-full mb-5"
            >
              Add to pool
            </button>
            {players.length > 0 && (
              <>
                <div className="p-5 bg-base-300 rounded-lg shadow-md mb-5">
                  {players.map((player, i) => {
                    return (
                      <div
                        className="text-xl flex justify-start gap-3 "
                        key={player}
                      >
                        <span className="text-primary ">{i + 1}:</span>{" "}
                        <span className="font-bold">{player}</span>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    shufflePlayers();
                  }}
                  className={`btn ${
                    disabled == "disabled" ? "btn-disabled" : "btn-secondary"
                  } w-full mb-5`}
                >
                  shuffle
                </button>
                <button
                  onClick={() => {
                    clear();
                  }}
                  className="btn btn-primary w-full"
                >
                  Clear
                </button>
              </>
            )}
          </div>
          <div className="p-5 bg-base-200 rounded-lg shadow-md grid place-content-center">
            <div className="text-center font-bold text-primary text-3xl mb-7">
              Match Up Generator
            </div>
            <div className="flex items-center gap-5 mb-5">
              <div className="h-[3rem] rounded-md  bg-primary flex px-4 items-center text-xl text-black font-bold">
                Player 1
              </div>
              <div className="h-[3rem] rounded-md w-64 bg-secondary flex px-4 items-center text-xl text-black font-bold">
                {Player1Team}
              </div>
            </div>
            <div className="flex items-center gap-5 mb-5">
              <div className="h-[3rem] rounded-md  bg-primary flex px-4 items-center text-xl text-black font-bold">
                Player 2
              </div>
              <div className="h-[3rem] rounded-md w-64 bg-secondary flex px-4 items-center text-xl text-black font-bold">
                {Player2Team}
              </div>
            </div>
            <button
              onClick={() => {
                generateTeam();
              }}
              className="btn btn-secondary w-full mb-5"
            >
              Generate
            </button>
            <button
              onClick={() => {
                setshow(!show);
              }}
              className="btn btn-primary w-full mb-5"
            >
              {show ? "hide" : "show"} Teams
            </button>
          </div>
        </div>
        {show && (
          <div className="p-5 bg-base-200 rounded-lg shadow-md h-max">
            <div className="text-center font-bold text-primary text-3xl mb-7">
              Teams
            </div>
            {deffaultTeams.map((team) => {
              return (
                <div key={team} className="text-primary-content text-xl mx-5">
                  {team}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
