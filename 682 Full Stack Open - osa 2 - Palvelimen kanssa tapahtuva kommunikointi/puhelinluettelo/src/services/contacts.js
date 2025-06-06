import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newContanct => {
    return axios.post(baseUrl, newContanct)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newContact) => {
    console.log("Updating:", id)
    return axios.put(`${baseUrl}/${id}`, newContact)

}


export default { getAll, create, remove, update }