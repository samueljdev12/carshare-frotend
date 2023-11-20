import { Link, useLocation } from "react-router-dom";
import CarShareLogo from "/Car2.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const pathLocation = useLocation().pathname;
  // console.log(pathLocation);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // use navigate for redirecting user
  const navigate = useNavigate();

  // use dispatch for redux actions
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg main-bg-color position-sticky w-100 z-3">
        <div className="container-fluid p-3">
          <Link className="navbar-brand p-0" to="/">
            <img
              src={CarShareLogo}
              alt="Logo"
              className="brand-logo align-text-top"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end fs-5 fw-semi-bold"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <Link className={`nav-link ${pathLocation === '/' ?'active' : ''}`} aria-current="page" to="/">
                Home
              </Link>
              <Link className={`nav-link ${pathLocation === '/about' ?'active' : ''}`} to="/about">
                About us
              </Link>
              <Link className={`nav-link ${pathLocation === '/contact' ?'active' : ''}`} to="/contact">
                Contact us
              </Link>
              <Link className={`nav-link ${pathLocation === '/booking' ?'active' : ''}`} to="/booking">
                Book Now
              </Link>
              {!isAuthenticated && (
                <Link className={`nav-link ${pathLocation === '/signup' ?'active' : ''}`} to="/signup">
                  Sign Up
                </Link>
              )}
              {isAuthenticated && (
                <Link className={`nav-link btn btn-primary mx-2 bg text-light ${pathLocation === '/my_account' ?'active' : ''}`} to="/my_account">
                  My Account
                </Link>
              )}
              {isAuthenticated ? (
                <button
                  className="btn btn-danger btn-sm p-2 text-light "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Logout
                </button>
              ) : (
                <Link className={`nav-link ${pathLocation === '/login' ?'active' : ''}`} to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/*  modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">Are you sure you want to logout?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button onClick={handleLogout} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
