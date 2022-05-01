import { types } from '../types/types';

export const selectEdge = (edge) => {
    return {
        type: types.selectEdge,
        payload: {
            selected:true,
            edge:edge
        }
    }
}

export const noSelectEdge = () => {
    return {
        type: types.noSelectEdge,
        payload: {
            selected:false,
            edge:{}
        }
    }
}

export const setLabelEdge = (label) => {
    return {
        type: types.setLabelEdge,
        payload: {
            label:label
        }
    }
}

export const setLabelEmpty = () => {
    return {
        type: types.setLabelEmpty,
        payload: {
            label:''
        }
    }
}