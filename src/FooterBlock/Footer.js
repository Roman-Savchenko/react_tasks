import React from 'react';

class Footer extends React.Component
{
    render(){
        return    <div id="footer">
                    <div className="footer-bottom row">
                        <div className="copyrights col-sm-6 col-md-6"><div className="well">Список контактов</div></div>
                        <div className="social-icons col-sm-6 col-md-6"><div className="well">Адресса</div></div>
                    </div>
                </div>
    }
}

export default Footer;