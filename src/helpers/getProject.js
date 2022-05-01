
export const getProject = async(id) => {
    const url = `http://localhost:8080/projects/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('data del backend', data);

    return data;
}