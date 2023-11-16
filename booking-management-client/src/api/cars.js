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


//  Get featured cars

export const getFeaturedCars = async () =>{
    const response  = await fetch(`${import.meta.env.VITE_API_URL}/featuredCar`)
    const data = await response.json()
    return data

}
// Get Car details
export const getCar = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/car/${id}`)
    const data = await response.json()
    return data
  }


    //get filtered cars for hosts
 export const getCars = async email => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cars/${email}`)
    const data = await response.json()
    return data
  }
  
   // Delete a cars
  export const deleteCar = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
    const result = await response.json()
    return result
  }
    
  
    // update a car
  export const updateCar = async (carData, id) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        body: JSON.stringify(carData),
      })
    
      const data = await response.json()
      return data
    }