import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import './styles/context-menu.css'; // Create this CSS file to style the menu

interface IProps{
    eventId: string
}
const ContextMenu: React.FC<IProps> = ({ eventId}: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const menuRef:any = useRef(null);

  const handleClickOutside = (event:any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="context-menu-container">
      {isMenuOpen && (
        <div className="custom-action" ref={menuRef}>
          <Link to={`/actions/?eventId=${eventId}`}>
            <FontAwesomeIcon icon={faTasks} /> Event Actions
          </Link>
          <Link to={`/eventview/${eventId}`}>
            <FontAwesomeIcon icon={faEye} /> View Event
          </Link>
          <Link to={`/eventedit/${eventId}`}>
            <FontAwesomeIcon icon={faEdit} /> Edit Event
          </Link>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
