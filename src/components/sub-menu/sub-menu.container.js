import React from 'react';
import SubMenuComponent from './sub-menu.component';

const SubMenu = (props) => {
    const { handleItem, menuItems, anchorEl, handleClose, placement } = props;
    return (
        <SubMenuComponent
            handleItem={handleItem}
            menuItems={menuItems}
            anchorEl={anchorEl}
            handleClose={handleClose}
            placement={placement}
        />
    );
};

export default SubMenu;
