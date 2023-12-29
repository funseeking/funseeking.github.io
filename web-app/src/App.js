import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "./Firebase.js";
import { challenges } from "./Challenges.js";

function App() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({
    numCompleted: 0,
    completed: [],
    uid: "",
    name: "",
  });

  useEffect(() => {
    if (user) {
      const userRef = firestore.collection("userInfo").doc(user.uid);
      userRef
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            setUserData(docSnapshot.data());
          } else {
            const data = {
              numCompleted: 0,
              completed: [],
              uid: user.uid,
              name: user.displayName,
            };
            userRef.set(data);
            setUserData(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const handleChallengeCompleted = (completedChallenge) => {
    const updatedUserData = {
      ...userData,
      completed: [...userData.completed, completedChallenge],
    };

    // Update the user's document in Firestore
    firestore.collection("userInfo").doc(user.uid).set(updatedUserData);

    // Update the state to trigger a re-render
    setUserData(updatedUserData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 w-100">
      <Intro />
      {user ? (
        <>
          <SignOut />
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 p-2 w-screen">
            {userData && (
              <CompletedChallenges completedChallenges={userData.completed} />
            )}
            <CurrentChallenge
              completedChallenges={userData.completed}
              onChallengeCompleted={handleChallengeCompleted}
            />
            <Leaderboard data={userData} />
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

function Intro() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:m-6">
      <h1 className="text-6xl text-amber-500 mx-4">Fun Seeking</h1>
      <div className="flex flex-col items-center justify-center">
        <p>Exciting prompts to make life more thrilling!</p>
        <p>
          <b>Created by Sandra Tang</b> (
          <a href="https://github.com/SandraTang" className="underline">
            @SandraTang
          </a>{" "}
          on Github)
        </p>
      </div>
    </div>
  );
}

function CompletedChallenges({ completedChallenges }) {
  return (
    <div className="lg:h-full flex flex-col items-center gap-2 w-1/3 sm:w-1/2 xs:w-full p-6 rounded-lg text-white bg-lime-500">
      <h1 className="text-xl">Completed</h1>
      <table>
        <tbody>
          {completedChallenges.map((challenge, index) => (
            <tr key={index + 1}>
              <td className="font-bold">{index + 1}</td>
              <td>{challenge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CurrentChallenge({ completedChallenges, onChallengeCompleted }) {
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const availableChallenges = challenges.filter(
    (challenge) => !completedChallenges.includes(challenge)
  );

  const getRandomChallenge = () => {
    if (availableChallenges.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * availableChallenges.length
      );
      setCurrentChallenge(availableChallenges[randomIndex]);
    } else {
      setCurrentChallenge(null);
    }
  };

  const handleSkip = () => {
    getRandomChallenge();
  };

  const handleCompleted = () => {
    if (currentChallenge) {
      // Add the completed challenge to the user's document
      onChallengeCompleted(currentChallenge);

      // Get a new random challenge
      getRandomChallenge();
    }
  };

  useEffect(() => {
    getRandomChallenge(); // Set a new random challenge initially
  }, [completedChallenges]);

  // Display the current challenge or a message if no challenges available
  const challengeDisplay = currentChallenge ? (
    <p className="text-center">{currentChallenge}</p>
  ) : (
    <p className="text-center">No challenges available</p>
  );

  return (
    <div className="lg:h-full flex flex-col items-center gap-2 w-1/3 sm:w-1/2 xs:w-full p-6 rounded-lg text-white bg-amber-500">
      <h1 className="text-xl">Challenge</h1>
      <div className="py-6 text-3xl">{challengeDisplay}</div>
      {currentChallenge && (
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleCompleted}
            className="text-amber-500 rounded-3xl bg-white px-4 py-2 font-bold"
          >
            COMPLETED
          </button>
          <button
            onClick={handleSkip}
            className="rounded-3xl border border-2 border-white px-4 py-2 font-bold text-white"
          >
            SKIP
          </button>
        </div>
      )}
    </div>
  );
}

function Leaderboard({ data }) {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore
          .collection("userInfo")
          .orderBy("numCompleted", "desc")
          .limit(10)
          .get();

        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          completed: doc.data().completed.length,
        }));

        setLeaderboardData(data);

        console.log(leaderboardData);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="lg:h-full flex flex-col items-center gap-2 w-1/3 sm:w-1/2 xs:w-full p-6 rounded-lg text-white bg-sky-500">
      <h1 className="text-xl">Leaderboard</h1>
      <table>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index + 1}>
              <td className="font-bold">{index + 1}</td>
              <td>
                {user.name} completed {user.completed}{" "}
                {user.completed === 1 ? `challenge` : `challenges`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <button
      onClick={signInWithGoogle}
      className="border border-white text-white px-5 py-4 rounded-2xl bg-amber-500"
    >
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        onClick={() => auth.signOut()}
        className="border border-black px-2 py-1 rounded-md"
      >
        Sign Out
      </button>
    )
  );
}

export default App;
