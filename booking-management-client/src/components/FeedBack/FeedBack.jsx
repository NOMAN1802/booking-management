import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useHost from '../../hooks/useHost';
import Button from '../Button/Button';

const FeedBack = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isHost] = useHost();
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState('');
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a backend API endpoint to handle feedback submissions
    const feedbackData = {
      name: user.displayName,
      rating: currentValue,
      comment: comment,
    };

    try {
      // Send a POST request to your backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully!');
        // Reset the form values
        setCurrentValue(0);
        setHoverValue(undefined);
        setComment('');
      } else {
        console.error('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
      <div className="flex flex-row">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || currentValue) > index ? 'orange' : 'grey'}
            className="mr-2 cursor-pointer"
          />
        ))}
      </div>
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-2/3 h-32 px-4 py-3 rounded-md"
      />
      <div className='w-1/4'>
      <Button type="submit" label='Comment' disabled={isAdmin || isHost || !user} />
      </div>
       
    </form>
  );
};

export default FeedBack;
