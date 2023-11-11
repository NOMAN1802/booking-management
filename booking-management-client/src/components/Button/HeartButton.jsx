import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useAdmin from '../../hooks/useAdmin';
import useHost from '../../hooks/useHost';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext } from 'react';

const HeartButton = ({ handleWishList, room, car }) => {
    
    
  const{user} = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isHost] = useHost();
    const handleClick = (item) => {
      // Conditionally handle the click based on the type of item (room or car)
      if (item === 'room') {
        handleWishList(room);
      } else if (item === 'car') {
        handleWishList(car);
      }
    };
  return (
    <button
      onClick={() => (room ?  handleClick('room') :  handleClick('car'))}
      disabled={isAdmin || isHost}
      className='
        relative
        hover:opacity-80
        transition
        cursor-pointer
      '
    >
      <AiOutlineHeart
        size={28}
        className='
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        '
      />
      <AiFillHeart
        size={24}
        className='fill-neutral-500/70 hover:fill-rose-500'
      />
    </button>
  );
}

export default HeartButton;
