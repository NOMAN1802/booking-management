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

    const response  = await fetch(`${import.meta.env.VITE_API_URL}/blogs/featured`)
    const data = await response.json()
    return data

}

// Get Blog details
export const getBlog = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${id}`)
    const data = await response.json()
    return data
  }