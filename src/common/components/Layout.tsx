import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../providers/authProvider';
import { IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import LeftMenu from 'common/menu/LeftMenu';

import './styles/layout.css';
import { pageNames } from 'config/pageNames';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="d-flex">
      <div className='left-menu-container'>
        <LeftMenu />
      </div>     
      <div className="d-flex flex-column min-vh-100 flex-grow-1">
        <header className="background-primary text-white p-2 d-flex justify-content-between align-items-center">
          <div>{/* SUSACTT */}</div>
          <div>
            <div className="row align-items-center">
              <div className="col-auto mt-n4 mr-2">
                {user && user.displayName ? user.displayName : user?.email}
              </div>
              {user && (
                <div className="col-auto ml-2">
                  <Link to={pageNames.LOGOUT} className="ml-2">
                    <span>
                      <IonIcon icon={logOutOutline} style={{ marginLeft: '5px', color: 'white', fontSize: '24px' }} />
                    </span>
                  </Link>
                </div>
              )}
            </div>     
          </div>
        </header>
        <main className="flex-grow-1 p-3">{children}</main>
        <footer className="background-primary text-white p-2 mt-auto">
          Copyright © 2024. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
