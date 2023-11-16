import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { imageUpload } from '../../api/utils'
import UpdateBlogForm from '../Forms/UpdateBlogForm'
import { updateBlog } from '../../api/blogs'
import Swal from 'sweetalert2'

const UpdateBlogModal = ({ setIsEditModalOpen, isOpen, refetch, blog, id }) => {
  const [loading, setLoading] = useState(false)
  
  const [blogData, setBlogData] = useState(blog)

  const handleImageUpdate = image => {
    setLoading(true)
    imageUpload(image)
      .then(res => {
        setBlogData({ ...blogData, image: res.data.display_url })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(blogData)
    const updatedData = Object.assign({}, { ...blogData })
    delete updatedData._id
    setLoading(true)
    updateBlog(updatedData, id)
      .then(data => {
        console.log(data)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Blog is Updated',
            showConfirmButton: false,
            timer: 1500,
          });
        setLoading(false)
        refetch()
        setIsEditModalOpen(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsEditModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Update Blog Info
                </Dialog.Title>
                <div className='mt-2 w-full'>
                  <UpdateBlogForm
                    handleSubmit={handleSubmit}
                    blogData={blogData}
                    setBlogData={setBlogData}
                    handleImageUpdate={handleImageUpdate}
                    loading={loading}
                   
                  />
                </div>
                <hr className='mt-8 ' />
                <div className='mt-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateBlogModal