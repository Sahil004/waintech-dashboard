import React from 'react';
import SidebarItems from './SidebarItems';

const Sidebar = () => {
  return (
    <aside id='sidebar' className='sidebar border-right'>
      <div className='sidebar-title'>
        <div className='sidebar-brand w-75 pt-2 ps-2'>
          {/* Add brand name or logo here */}
        </div>
        <SidebarItems />
      </div>
    </aside>
  );
}

export default Sidebar;
