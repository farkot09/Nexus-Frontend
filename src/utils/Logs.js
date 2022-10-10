import {direcionDeServidor} from "./server"

export const obtenerLogs = async () => {
    try {
        const res = await fetch(`${direcionDeServidor}logs`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
export const obtenerLogsPorTipo = async (tipo) => {
    try {
        const res = await fetch(`${direcionDeServidor}logs/${tipo}`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}