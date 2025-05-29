import React, { useEffect, useState, useContext } from "react";
import confetti from "canvas-confetti";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api"

const StreakTracker = ({ currentStreak, bestStreak }) => {
    const [hasCelebrated, setHasCelebrated] = useState(false);
    const [hasLoggedToday, setHasLoggedToday] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(()=>{
        const prevBest = parseInt(localStorage.getItem("bestStreak")) || 0;
        if(currentStreak > prevBest && !hasCelebrated){
            confetti({
                particleCount: 500,
                spread: 150,
                shapes:["circle","square","star"],
                origin: {y : 0.6}
            })
            setHasCelebrated(true);
            localStorage.setItem("bestStreak",currentStreak)
        }
    },[currentStreak,bestStreak,hasCelebrated]);

    useEffect(()=>{
        const fetchTodayStatus = async () =>{
            try {
                const response = await API.get("/streaks/log-status",{
                    headers : {Authorization : `Bearer ${user}`}
                })
                setHasLoggedToday(response.data.hasLoggedToday);
            } catch (error) {
                console.error("Error fetching today's log status",error)
            }
        }
        fetchTodayStatus();
    },[user]);

    const progress = bestStreak > 0 ? (currentStreak / bestStreak) * 100 : 0;

    
    return (
        <div className="bg-white rounded-2xl shadow p-4 w-full max-w-md m-3">

            <h2 className='text-xl font-bold mb-2'>🔥 Your Workout Streak</h2>
            <p className='text-lg'>Current Streak: <span className="font-semibold">{currentStreak} day{currentStreak <= 1 ? "" : "s"}</span></p>
            <p className='text-sm text-gray-500'>🏆 Best Streak: <strong>{bestStreak}</strong> day{bestStreak <= 1 ? "" : "s"}</p>

            {hasLoggedToday
            ? <p className="text-green-600 font-semibold m-2">
                ✅ You've logged a workout today!
            </p>
            : <p className="text-red-500 font-semibold m-2">
                ❗Don't forget to log today's workout!
            </p>}

            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress.toFixed(1)}%` }}
                >
                </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{progress.toFixed(1)}% towards your Best Streak 💪</p>
        </div>
        );
    };

export default StreakTracker;