
export const deleteProject = async ( id ) =>  {
    //const url = `http://localhost:8080/projects/${id}`;
    const url = `https://c4maker-server.herokuapp.com/projects/${id}`;

    
    
    console.log(`eliminando el proyecto con id: ${id}`);
    const response = await fetch(url, {
        method: 'DELETE',
    })
    const dataResponse = await response.json(); 

    // console.log(`dataResponse, res del backend:, ${JSON.stringify(dataResponse)}`);
    console.log(`dataResponse delete, res del backend:, ${dataResponse}`);

    return dataResponse;
}