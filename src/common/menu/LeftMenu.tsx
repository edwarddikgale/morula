import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faCalendarAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { pageNames } from '../../config/pageNames';
import { useAuth } from "../../providers/authProvider";
import { IonIcon } from '@ionic/react';
import { closeOutline, menuOutline } from 'ionicons/icons';

const LeftMenu = () =>{

    const {user} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsMenuOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
      
    return (
        <div>
            {user &&
                <div 
                    className={`sidebar ${isMenuOpen ? 'open' : ''}`}
                    style={{ right: isMenuOpen ? '-10px' : '-42px' }}
                    ref={menuRef} 
                >
                    <button className="menu-toggle" onClick={toggleMenu}>
                    <IonIcon icon={isMenuOpen ? closeOutline : menuOutline} />
                    </button>
                    <ul className="menu-list">
                    <li>
                        <Link to={pageNames.HOME}>
                        <FontAwesomeIcon icon={faHome} className='icon-margin' /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to={pageNames.SETTINGS}>
                        <FontAwesomeIcon icon={faCog} className='icon-margin' /> ISO 20121 Evidence
                        </Link>
                    </li>
                    <li>
                        <Link to={pageNames.EVENT}>
                        <FontAwesomeIcon icon={faCalendarAlt} className='icon-margin' /> My Events
                        </Link>
                    </li>
                    <li>
                        <Link to={pageNames.PROFILE}>
                        <FontAwesomeIcon icon={faUser} className='icon-margin' /> My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to={pageNames.LOGOUT}>
                        <FontAwesomeIcon icon={faSignOutAlt} className='icon-margin' /> Logout
                        </Link>
                    </li>
                    </ul>

                </div>
            }
        </div>
    )
}

export default LeftMenu;
