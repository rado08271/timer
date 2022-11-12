export type TimerAction = {type: "COUNT" | "RESTART" | "STOP", timer?: number}
export const timerReducer = (state: TimerAction, action: TimerAction): TimerAction => {
    const currentTime = state.timer ?? 0

    switch (action.type) {
        case "COUNT": return {
            type: (currentTime) - 1 > 0 ? "COUNT" : "STOP",
            timer: (currentTime > 0) ? currentTime - 1 : 0
        }
        case "RESTART": return {...action, type: "STOP"}
        case "STOP": return {...state, type: "STOP"}
        default: throw "Unknown action for state"
    }
}

