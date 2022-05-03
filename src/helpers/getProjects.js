

export const getProjects = async (uid) => {
    //const url = `http://localhost:8080/projects/${uid}/projects`;
    const url = `https://c4maker-server.herokuapp.com/projects/${uid}/projects`;


    const response = await fetch(url);
    const data = await response.json();
    // console.log('data', data);

    return data;

}