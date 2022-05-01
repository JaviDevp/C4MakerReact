import { types } from "../types/types";

export const labelEdgeReducer = (state = {}, action) => {
    switch (action.type) {
        case types.setLabelEdge:
            return {
                label: action.payload.label
            };
        case types.setLabelEmpty:
            return {
                label: ''
            };
        default:
            return state;
    }
}
