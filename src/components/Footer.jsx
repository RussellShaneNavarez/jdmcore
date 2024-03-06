import '../styles/Footer.css';

export const Footer = () => {

    return(
        <footer>
            <div className="row">
                <div className="col">
                    <img src={require('../assets/img/logo.png')} className='logo-footer' />
                    <p>
                        JDM Core, discover the thrill of <br></br>
                        best japanese cars in history.
                    </p>
                </div>
                <div className="col">
                    <h3>Contacts</h3>
                    <p> Milan, IT </p>
                    <p className="email-id"> russell18@gmail.com </p>
                    <p className="email-id"> christian07@gmail.com </p>
                    <h4> +39 324 892 2189</h4>
                </div>
                <div className="col">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">Cars</a></li>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </div>
                <div className="col">
                    <h3> Work with us </h3>
                    <form>
                        <input type="email" placeholder="Enter your email..." required></input>
                        <button type="submit"></button>
                    </form>
                   
                    <div className="social-icons">
                        <p> Chri Socials: </p>
                        <img src={require('../assets/img/github-logo.png')}></img>
                        <img src={require('../assets/img/linkedin-icon.png')}></img>
                        <img src={require('../assets/img/whatsapp-logo.png')}></img>
                    </div>
                    <br></br>
                    <div className="social-icons">
                        <p> Russell Socials: </p>
                        <img src={require('../assets/img/github-logo.png')}></img>
                        <img src={require('../assets/img/linkedin-icon.png')}></img>
                        <img src={require('../assets/img/whatsapp-logo.png')}></img>
                    </div>
                </div>
            </div>
        </footer>
    )
};

