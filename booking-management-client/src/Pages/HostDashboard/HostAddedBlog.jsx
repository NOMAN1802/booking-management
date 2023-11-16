/* eslint-disable no-unused-vars */
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useLocation } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import { useQuery } from '@tanstack/react-query';
import HostAddedBlogRow from './HostAddedBlogRow';

const HostAddedBlog = () => {

    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const location = useLocation()
    const { refetch, data: blogs = [] } = useQuery({
        queryKey: ['blogs', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(
                `${import.meta.env.VITE_API_URL}/blogs/${user?.email}`
            )
            console.log('res from axios', res.data)
            return res.data
        },
    })

    return (

        <Container>
            <SectionTitle
                subHeading={location.pathname === '/dashboard/hostDashboard' ? 'My Added Blog Info' : 'No Blog added yet!'}
                heading={location.pathname === '/dashboard/hostDashboard' ? 'My Posted Blogs' : 'My Posted Blog'}
            ></SectionTitle>

            {blogs && blogs.length > 0 ? (
                <div className='rounded shadow-sm bg-gray-50 w-full sm:overflow-x-auto'>

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Photo</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Delete</th>
                                <th>Update</th>
                                
    
                            </tr>
                            </thead>
                            <tbody>
                                {blogs &&
                                    blogs.map((blog, index) => <HostAddedBlogRow
                                        index={index}
                                        key={blog?._id}
                                        blog={blog}
                                        refetch={refetch}

                                    />
                                    )}


                            </tbody>



                        </table>
                    </div>
                </div>
            ) : (
                <div className='pt-12'>
                    <Heading
                        title={location.pathname === '/dashboard/hostDashboard' ? 'No activity found' : 'You do not add any  Blog yet!'}
                        subtitle={location.pathname === '/dashboard/hostDashboard' ? 'Go to add blog and add some blog ' : 'Explore ibooking and add  your blog'}
                        center={true}
                    />
                </div>
            )}
        </Container>

    );
};

export default HostAddedBlog;