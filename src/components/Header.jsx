import React from 'react';
import SidebarItems from './SidebarItems';

const Header = () => {
    return (
        <header className='header bg-white'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header d-flex">
                            <button type="button" className="btn-close text-reset col-4 ms-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <SidebarItems />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
