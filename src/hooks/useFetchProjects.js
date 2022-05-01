import { useEffect, useState } from "react";
import { getProjects } from "../helpers/getProjects";

export const useFetchProjects = (uid) => {
    const [state, setState] = useState([]);
    useEffect( () => {
        getProjects(uid).then(data =>{
            // console.log(data);
            setState(data);
        })
    }, [uid])
    return state;
}