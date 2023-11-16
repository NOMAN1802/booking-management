//Add a blog

export const addBlog = async roomData =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        method: 'POST',
        headers :{
            'content-type': 'application/json',
        },
        body: JSON.stringify(roomData),
    })
    const data = await response.json()
    return data;
}

// Get all blogs

export const getAllBlogs = async () =>{
   const response  = await fetch(`${import.meta.env.VITE_API_URL}/blogs`)
    const data = await response.json()
    return data

}

export const getFeaturedBlogs = async () =>{

    const response  = await fetch(`${import.meta.env.VITE_API_URL}/featuredBlog`)
    const data = await response.json()
    return data

}

// Get Blog details
export const getBlog = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${id}`)
    const data = await response.json()
    return data
  }


     //get filtered blogs for hosts
 export const getBlogs = async email => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${email}`)
    const data = await response.json()
    return data
  }

     // Delete a blogs
     export const deleteBlog = async id => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        })
        const result = await response.json()
        return result
      }
        
      
        // update a blog
      export const updateBlog = async (carData, id) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
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