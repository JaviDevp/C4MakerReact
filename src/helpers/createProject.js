const objetoNuevoDiagrama = {
    nodes:[],
    edges:[],
    viewport:{
        x:0,
        y:0,
        zoom:1
    }
}

const nuevoDiagramaTexto = JSON.stringify(objetoNuevoDiagrama);

export const createProject = async (name = 'nuevo diagrama', uid, diagramObject = "", username) => {
    const url = `http://localhost:8080/projects`;
    const data = {
        uid,
        name,
        diagramObject: objetoNuevoDiagrama,
        username
    }
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    const dataResponse = await response.json();
    // console.log(JSON.stringify(dataResponse));
    return dataResponse;
    
}