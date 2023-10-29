//Add a car

export const addCar = async carData =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
        method: 'POST',
        headers :{
            'content-type': 'application/json',
        },
        body: JSON.stringify(carData),
    })
    const data = await response.json()
    return data;
}

// Get all cars

export const getAllCars = async () =>{

    const response  = await fetch(`${import.meta.env.VITE_API_URL}/cars`)
    const data = await response.json()
    return data

}
// Get Car details
export const getCar = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/car/${id}`)
    const data = await response.json()
    return data
  }