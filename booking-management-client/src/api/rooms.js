//Add a room

export const addRoom = async roomData =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        method: 'POST',
        headers :{
            'content-type': 'application/json',
        },
        body: JSON.stringify(roomData),
    })
    const data = await response.json()
    return data;
}

// Get all rooms

export const getAllRooms = async () =>{
   const response  = await fetch(`${import.meta.env.VITE_API_URL}/rooms`)
    const data = await response.json()
    return data

}

// export const getRooms = async () => {
//     const url = `${import.meta.env.VITE_API_URL}/rooms`;
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
//   };

//  Get featured rooms

export const getFeaturedRooms = async () =>{

    const response  = await fetch(`${import.meta.env.VITE_API_URL}/rooms/featured`)
    const data = await response.json()
    return data

}


// Get room details
export const getRoom = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`)
    const data = await response.json()
    return data
  }