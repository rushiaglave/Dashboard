import React from "react";
import PropTypes from "prop-types";

export default function Navbar(props) {
    const navbarStyle = {
        backgroundColor: "#545454", // Change background color to your desired color
        borderBottom: "2px solid #FEA619", // Add a bottom border with your desired color
    };

    const logoStyle ={
        backgroundColor: '#515050',
        // borderRadius:"5px"
    };

    return (
        <nav
        className="navbar navbar-expand-lg"
        style={navbarStyle} // Apply the styles here
            
       >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    {/* company logo */}
                    <img
                        src={require("../img/chhayaFoundationLogo.png")}
                        alt="Chaya_Foundation"
                        width="80"
                        height="35"
                        style={logoStyle}
                    />
                    {props.title}
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                {/* Home */}
                            </a>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center align-items-center" style={{ color: '#FEA619', textAlign: 'center', height: '100%', width:'100%' }}>
                        <h3 style={{ margin: '0' }}>Geospatial Dashboard for Missing Cases Analysis</h3>
                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = { title: PropTypes.string };
