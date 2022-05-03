export const updateProject = async (id, name, uid, diagramObject, username) => {
    //const url = `http://localhost:8080/projects/${id}`;
    const url = `https://c4maker-server.herokuapp.com/projects/${id}`;

    const data = {
        name,
        diagramObject,
        uid,
        username
    }
    console.log(`data: ${JSON.stringify(data)}`);
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    const dataResponse = await response.json(); 

    // console.log(`dataResponse, res del backend:, ${JSON.stringify(dataResponse)}`);
    console.log(`dataResponse, res del backend:, ${dataResponse}`);

    return dataResponse;
}