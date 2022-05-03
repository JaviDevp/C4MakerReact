export const updateProjectName = async (id, name) => {
    //const url = `http://localhost:8080/projects/${id}/name`;
    const url = `https://c4maker-server.herokuapp.com/projects/${id}/name`;

    const data = {
        name,
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