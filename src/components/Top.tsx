import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Top.css";
import { fetchProducts } from "../store/Action";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../pages/AddForm";

const Navbar = () => {
  const dispatch = useDispatch<any>();
  const products = useSelector((state: any) => state.products.data);
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [showProductForm, setShowProductForm] = useState(false);

  // Function to toggle the display of the ProductForm modal
  const toggleProductForm = () => {
    setShowProductForm(!showProductForm);
  };

  return (
    <>
      <div className="superNav border-bottom py-2 bg-light">
        <div className="container">
          <div className="row"></div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-shop me-2"></i> <strong>Shopping Cart</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
            <div className="input-group">
              <span className="border-warning input-group-text bg-warning text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input type="text" className="form-control border-warning" style={{ color: "#7a7a7a" }} />
              <button className="btn btn-warning text-white">Search</button>
            </div>
          </div>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <div className="ms-auto d-none d-lg-block">
              <div className="input-group">
                <span className="border-warning input-group-text bg-warning text-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type="text" className="form-control border-warning" style={{ color: "#7a7a7a" }} />
                <button className="btn btn-warning text-white">Search</button>
              </div>
            </div>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link mx-2 text-uppercase" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="/">
                  Products
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="/">
                  Services
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="/">
                  All Items: <b>{products.length}</b>{" "}
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="custom-link">
                {/* Use the onClick event to toggle the ProductForm modal */}
                <span className="nav-link mx-2 text-uppercase" onClick={toggleProductForm}>
                  ➕ Add Product
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Conditionally render the ProductForm modal */}
      {showProductForm && <ProductForm onClose={toggleProductForm} />}
    </>
  );
};

export default Navbar;
