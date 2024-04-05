import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setLaps([]);
        setIsRunning(false);
    }

    function lap() {
        const lapTime = Date.now() - startTimeRef.current;
        setLaps([...laps, lapTime]);
    }

    function formatTime(time) {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor(time / (1000 * 60) % 60);
        let seconds = Math.floor(time / 1000 % 60);
        let milliseconds = Math.floor((time % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}.${milliseconds}`;
    }

    return (
        <>
            <div className="stopwatch">
                <div className="display">{formatTime(elapsedTime)}</div>
                <div className="controls">
                    {!isRunning ? (
                        <button onClick={start} className="start-button">
                            Start
                        </button>
                    ) : (
                        <button onClick={stop} className="stop-button">
                            Stop
                        </button>
                    )}
                    <button onClick={reset} className="reset-button">
                        Reset
                    </button>
                    {isRunning && (
                        <button onClick={lap} className="lap-button">
                            Lap
                        </button>
                    )}
                </div>
                <div className="laps">
                    <h2>Lap Times:</h2>
                    <ul>
                        {laps.map((lapTime, index) => (
                            <li key={index}>{formatTime(lapTime)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default StopWatch;
