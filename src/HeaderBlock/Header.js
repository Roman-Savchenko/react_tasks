import React from 'react';
import Title from './../TitleBlock/Title'

class Header extends React.Component
{
    render(){
        return   <div id="header" className="row">
            <div id="logo" className="col-md-3">
                <div className="well">Здесь мог быть красивый логотип
                </div>
            </div>
            <Title/>
        </div>
    }
}

export default Header;