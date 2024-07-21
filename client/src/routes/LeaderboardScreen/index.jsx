import { useState, useRef } from "react";
import Card from "./Card";
import LeaderCard from "./LeaderCard";

export const Leaderboard = [
  {
    name: "Shawn Hanna",
    location: "India",
    points: 1550,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2022-02-10",
  },
  {
    name: "Fidel Hand",
    location: "USA",
    points: 2310,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2021-01-01",
  },
  {
    name: "Bessie Hickle",
    location: "Chaina",
    points: 350,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2021-08-17",
  },
  {
    name: "Adella Wunsch",
    location: "Japan",
    points: 2100,
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2021-10-23",
  },
  {
    name: "Clair O'Connell",
    location: "London",
    points: 1250,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2022-01-22",
  },
  {
    name: "Kameron Prosacco",
    location: "Canada",
    points: 5250,
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2022-01-21",
  },
];

function LeaderBoard() {
  const [Query, setQuery] = useState("");
  const [Error, setError] = useState(null);
  const [userarray, setuserarray] = useState(
    Leaderboard.sort((a, b) => b.points - a.points)
  );
  const nameRef = useRef();
  const pointsRef = useRef();
  const descriptionRef = useRef();

  function Onsearch() {
    if (Query.length < 3) {
      setError("User name must be greater than 3 characters");
    } else {
      setError(null);
      setuserarray(
        Leaderboard.filter((user) =>
          user.name.toLowerCase().includes(Query.toLowerCase())
        )
      );
    }
  }

  function OnchangeError(event) {
    setQuery(event.target.value);
    if (event.target.value.length >= 3) setError(null);
  }

  function submithandler(event) {
    event.preventDefault();
    if (
      nameRef.current.value &&
      descriptionRef.current.value &&
      pointsRef.current.value
    ) {
      setuserarray([
        {
          id: userarray.length + 1,
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          points: pointsRef.current.value,
          img: "",
        },
        ...userarray,
      ]);
    }
  }

  return (
    <>
      <h1 className="heading">Leader Board</h1>
      <div className="form-container">
        <Card className="form-card">
          <h3 className="form-heading">Add New User</h3>
          <form onSubmit={submithandler}>
            <div className="form-group">
              <label className="form-label">User Name</label>
              <input
                type="text"
                placeholder="Enter The Name of User"
                ref={nameRef}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input
                type="text"
                placeholder="Something About Yourself"
                ref={descriptionRef}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Points</label>
              <input
                type="number"
                placeholder="Enter Points of The user"
                ref={pointsRef}
              />
            </div>
            <button className="btn-submit" type="submit">
              Add User
            </button>
          </form>
        </Card>
        <img 
                    src="https://img.freepik.com/free-vector/trophy-flat-style_78370-3222.jpg" 
                    alt="Placeholder" 
                    style={{ width: '250px', height: '200px' }} 
                    className="placeholder-image" 
                />
        <Card className="search-card">
          <input
            type="text"
            placeholder="Search User"
            className={Error ? "input-error" : ""}
            onChange={OnchangeError}
            value={Query}
          />
          <button className="btn-search" onClick={Onsearch}>
            Search
          </button>
          {Error && <div className="error-message">{Error}</div>}
        </Card>
      </div>
      <div className="podium">
        <div className="third-place">
          <div className="podium-rank">3rd</div>
          <img src={userarray[2].img} alt="Third Place" className="rank-img" />
          <p className="rank-name">{userarray[2].name}</p>
        </div>
        <div className="second-place">
          <div className="podium-rank">2nd</div>
          <img src={userarray[1].img} alt="Second Place" className="rank-img" />
          <p className="rank-name">{userarray[1].name}</p>
        </div>
        <div className="first-place">
          <div className="podium-rank">1st</div>
          <img src={userarray[0].img} alt="First Place" className="rank-img" />
          <p className="rank-name">{userarray[0].name}</p>
        </div>
      </div>

      <Card className="leader-list">
        {userarray.length ? (
          userarray.map((user, index) => {
            return (
              <LeaderCard
                key={index}
                name={user.name}
                description={user.description}
                points={user.points}
                img={user.img}
                rank={index + 1}
              />
            );
          })
        ) : (
          <div className="no-record">No User Record Found</div>
        )}
      </Card>
    </>
  );
}

export default LeaderBoard;
