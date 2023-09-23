import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Formik, Field, Form, ErrorMessage } from "formik";
import schema from "./Validation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/Action";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch<any>();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // Call the onClose function to close the modal
    // onClose();
  };
  const handleShow = () => setShow(true);
  const [value, setValue] = React.useState<number | null>(null);

  const navigate = useNavigate();

  // Use useEffect to open the modal when the component mounts
  useEffect(() => {
    handleShow();
  }, []);

  // HANDLING THE SUBMIT
  const handleSubmit = async (values: any) => {
    try {
      // Convert the quantity value to a number
      const quantity = parseFloat(values.quantity);

      // Dispatch the addProduct action with the product data
      const productData: any = {
        name: values.productName,
        des: values.description,
        price: values.price,
        category: values.category,
        stock: {
          quantity: quantity,
          inStock: true,
        },
        ISOReview: {
          rating: value,
          remarks: values.comments,
        },
      };

      // Dispatch the addProduct action and wait for it to complete
      const resultAction = await dispatch(addProduct(productData));

      // Check if the addProduct action succeeded
      if (addProduct.fulfilled.match(resultAction)) {
        console.log("Product added successfully");
        toast("🦄 Yay your product is successfully added to cart!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Close the modal after successful submission
      }
      handleClose();
      navigate("/")
      //  else {
      //   console.error("Failed to add product:", resultAction.error);
      // }
    } catch (error: any) {
      console.error("Error adding product:", error);

      if (error.response) {
        console.error("Server response data:", error.response.data);
      }
    }
  };
  

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="light"
      />
   

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              productName: "",
              description: "",
              price: 0,
              category: "",
              quantity: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
           <Form>
              {/* ... (rest of your form code) */}
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="productName">
                      <b>Product Name</b>
                    </label>
                    <Field
                      type="text"
                      name="productName"
                      className="form-control"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="productName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="productDescription">
                      <b>Description</b>
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      rows={1}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="productPrice">
                      <b>Price</b>
                    </label>
                    <Field
                      type="number"
                      name="price"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="productCategory">
                      <b>Category</b>
                    </label>
                    <Field as="select" name="category" className="form-control">
                      <option>Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Books">Books</option>
                      <option value="Toys">Toys</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="stockQuantity">
                  <b>Stock Quantity</b>
                </label>
                <Field type="text" name="quantity" className="form-control" />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-danger"
                />
              </div>

              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Typography component="legend">
                  <b>Ratings</b>
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>

              <div className="mb-3">
                <label htmlFor="comments">
                  <b>Comments</b>
                </label>
                <Field
                  as="textarea"
                  name="comments"
                  className="form-control"
                  rows={3}
                />
              </div>

              <div className="text-end">
                <Button
                  variant="success"
                  style={{ marginRight: "5px" }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
       
      </Modal>
    </div>
  );
};

export default ProductForm;
