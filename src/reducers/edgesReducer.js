import { types } from "../types/types";

export const edgesReducer = (state = {}, action) => {
    switch (action.type) {
        case types.selectEdge:
            return {
                selected: action.payload.selected,
                edge: action.payload.edge
            };
        case types.noSelectEdge:
            return {
                selected: false,
                edge:{}
            }
        default:
            return state;
    }
}
