import '../styles/Footer.css';

export const Footer = () => {

    return(
        <footer className='footer'>
            <div className="row">
                <div className="col">
                    <img src={require('../assets/img/logo.png')} className='logo-footer' />
                </div>
                <div className="col">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/cars">Cars</a></li>
                        <li><a href="/account">Account</a></li>
                    </ul>
                </div>
                <div className="col">
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contacts">Contact</a></li>
                    </ul>
                </div>
                <div className="col">
                    <div className="social-icons">
                        <p> Chri Socials: </p>
                        <a href="https://github.com/chrimitra"><img src={require('../assets/img/github-logo.png')}></img></a>
                        <a href="https://www.linkedin.com/in/christianmartinmitra/"><img src={require('../assets/img/linkedin-icon.png')}></img></a>
                        <a href="https://www.instagram.com/chrimitra/"><img src={require('../assets/img/instagram-logo.png')}></img></a>
                        <a href="mailto:christianmitra7@gmail.com"><img src={require('../assets/img/gmail-logo.png')}></img></a>
                    </div>
                    <br></br>
                    <div className="social-icons">
                        <p> Russ Socials: </p>
                        <a href="https://github.com/RussellShaneNavarez"><img src={require('../assets/img/github-logo.png')}></img></a>
                        <a href="https://www.linkedin.com/in/russell-shane-navarez/"><img src={require('../assets/img/linkedin-icon.png')}></img></a>
                        <a href="https://www.instagram.com/russnvrz/"><img src={require('../assets/img/instagram-logo.png')}></img></a>
                        <a href="mailto:russellnavarez18@gmail.com"><img src={require('../assets/img/gmail-logo.png')}></img></a>
                    </div>
                </div>
            </div>
            <hr className='hr'></hr>
            <div className="bottom-container">
                <p>© 2024 Copyright. All rights Reserved.</p>
                <p> Designed by @chrimitra & @russnvrz. </p>
            </div>
        </footer>
    )
};

