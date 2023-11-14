// add to wish list
//room wishList
export const roomWishList = async roomData =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/wishList`, {
        method: 'POST',
        headers :{
            'content-type': 'application/json',
        },
        body: JSON.stringify(roomData),
    })
    const data = await response.json()
    return data;
}

// car wishList


export const carWishList = async carData =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/wishList`, {
        method: 'POST',
        headers :{
            'content-type': 'application/json',
        },
        body: JSON.stringify(carData),
    })
    const data = await response.json()
    return data;
}
//Blog wishList
export const blogWishList = async blogData =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/wishList`, {
        method: 'POST',
        headers :{
            'content-type': 'application/json',
        },
        body: JSON.stringify(blogData),
    })
    const data = await response.json()
    return data;
}


// Get all wishlist for a user by email
export const getWishList = async email => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/wishList?email=${email}`
    )
    const bookings = await response.json()
    return bookings
  }
  
  // delete a wish list
  export const deleteWishList = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wishList/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting wish list item:', error);
      throw error; 
    }
  };
  