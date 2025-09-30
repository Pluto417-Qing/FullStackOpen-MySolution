import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getPersons = async () => {
    return axios
      .get(baseUrl)
      .then(res => res.data)
}

const addPerson = async (newPerson) => {
    return axios.post(baseUrl, newPerson).then(res => res.data)
}

const updatePerson = async (id, newPerson) => {
        return axios
            .put(`${baseUrl}/${id}`, newPerson)
            .then(res => res.data)
}

const deletePerson = async (id) => {
    return axios.delete(`${baseUrl}/${id}`)
            .then(() => id)
}

// npx json-server --port 3001 --watch db.json
export default { getPersons, updatePerson, addPerson, deletePerson }