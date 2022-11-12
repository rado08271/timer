import {useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState} from "react";
import {count, restart, stop, useTimer} from "../hooks/use-timer";

const useLocalStorage = (key: string, initialValue: any, {serialize = JSON.stringify, deserialize = JSON.parse} = {}) => {
    const [value, setValue] = useState(() => {
        const localStorageValue = window.localStorage.getItem(key)
        if (localStorageValue) {
            return deserialize(localStorageValue)
        }

        return typeof initialValue === 'function' ? initialValue() : initialValue
    })

    const prevKeyRef = useRef(key)

    useEffect(() => {
        const prevKey = prevKeyRef.current

        if (prevKey !== key) {
            window.localStorage.removeItem(prevKey)
        }
        prevKeyRef.current = key
        window.localStorage.setItem(key, value)
    }, [key, value, serialize])

    return [value, setValue]
}
const Timer = ({countdown} : {countdown: number }) => {
    const [timer, saveTimer] = useLocalStorage('react:timer:timer', countdown);
    console.log("timer", timer)
    const [currentTime, dispatch, type] = useTimer(timer)
    const [darkMode, setDarkMode] = useLocalStorage('react:timer:darkmode', true)

    const defaultEffect = () => console.log("started")
    const [interval, createInterval] = useState<any>(null)

    useEffect(() => {
        return () => {
            clearInterval(interval)
            console.log("saving", currentTime)
            saveTimer(20)
        }
    }, [])

    useEffect(() => console.log(currentTime, type), [currentTime, type])

    const start = () => {
        clearInterval(interval)

        createInterval(setInterval(() => {
            count(dispatch)
            return clearInterval(interval)
        }, 1000))
    }

    const pause = () => {
        clearInterval(interval)
        stop(dispatch)
    }

    const kill = () => {
        clearInterval(interval)
        restart(dispatch, countdown)
        // createInterval(setInterval(() => , 1000))
    }

    const setProcess = () => {
        switch (type) {
            case "COUNT": {
                pause()
                return;
            }
            case "STOP": {
                start()
                return
            }
        }
    }

    return (
        <div className={`container ${darkMode ? 'black' : 'white'}`} onClick={setProcess} onDoubleClick={kill}>
            <div>{`${
                Number(currentTime) / 60 < 10 ? 0 : ''}${Number(Number(currentTime) / 60).toFixed(0)
            }:${
                Number(currentTime) % 60 < 10 ? 0 : ''}${Number(Number(currentTime) % 60).toFixed(0)
            }`}</div>
        </div>
    )
}


export { Timer }
