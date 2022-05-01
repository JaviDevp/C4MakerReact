import { useEffect, useState } from "react";
import { getProject } from "../helpers/getProject";

export const useFetchProject = (id) => {
    const [state, setState] = useState({});
    useEffect( () => {
        getProject(id).then(data =>{
            // console.log(data);
            setState(data);
        })
    }, [id])
    return state;
}