import {useEffect, useReducer} from "react";
import {TimerAction, timerReducer} from "../reducers/reducer-timer";

export const useTimer = (startTime: number, reducer?: () => TimerAction) => {
    const [{timer: currentTime, type}, dispatch] = useReducer(timerReducer, {type: "STOP", timer: startTime});

    useEffect(() => {
    }, [startTime, timerReducer, currentTime])

    return [currentTime, dispatch, type]
}

export const count = (dispatch: any) => dispatch({type: "COUNT"})
export const stop = (dispatch: any) => dispatch({type: "STOP"})
export const restart = (dispatch: any, timer: number) => dispatch({type: "RESTART", timer})
