import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setEditProduct, updateProduct } from "../store/Action";
// import { Table, Button } from "react-bootstrap";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Footer from "./Footer";
import { Table,Button, Modal, Form ,ToggleButton,ButtonGroup} from "react-bootstrap";


function stringToColor(str: any) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
  return `#${color.padStart(6, '0')}`;
}

const Products = () => {
  const dispatch = useDispatch<any>();
  const products = useSelector((state: any) => state.products.data);
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  //edit product


  const initialProd = {
    name: "",
    des: "",
    price: 0,
    category: "",
    stock: {
      quantity: "0",
      inStock: true,
    },
    ISOReview: {
      rating: "",
      remarks: "",
    },
  };

  // const [editProduct, setEditProduct] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState<any>(initialProd);
  
  const handleEditProduct = (product:any) => {
    // let isStock= true;
    
    // // Set the edited product data
  
    setEditedProduct({
      id: product._id,
      name: product.name,
      des: product.des,
      price: product.price,
      category:product.category,
      stock:{
        quantity: product.stock.quantity,
      inStock: true,

      },
      
      ISOReview:{
      rating:product.ISOReview.rating,
      remarks: product.ISOReview.remarks,
      },
    });
    console.log('this is outside',editedProduct)
    
    //  Dispatch the setEditProduct action to update the slice state
     dispatch(setEditProduct(editedProduct));

     // Show the edit modal
     setShowEditModal(true);

   };

  const handleEditClose = () => {
    setEditProduct(null);
    setShowEditModal(false);
    setEditedProduct(initialProd);
  };

  const handleSaveChanges = () => {
    // Dispatch the updateProduct thunk to update the edited product
    // if(editedProduct.stock.quantity===0){
    //   console.log(editedProduct)
    //   editedProduct.stock.inStock=false;
    // }
    dispatch(updateProduct(editedProduct))
      // Unwrap the promise returned by createAsyncThunk
      .then(() => {
        // Close the edit modal
        setShowEditModal(false);
      })
      .catch((error:any) => {
        // Handle any errors here
        console.error("Update product failed:", error);
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>ISO Ratings</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any,index:number) => (
            <tr key={product.id}>
              <td>
                <div
                  className="product-circle"
                  style={{ backgroundColor: stringToColor(product.name), alignItems: "left" }}
                >
                  {product.name.charAt(0).toUpperCase()}
                </div>
                {product.name}
              </td>
              <td>{product.des}</td>
              <td>
                {product.stock.quantity === 0 ? (
                  <span style={{ color: "red" }}><b>Out of Stock</b></span>
                ) : (
                  product.stock.quantity
                )}
              </td>
              <td>₹ {product.price}</td>
              <td>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                >
                  <Typography component="legend"><b></b></Typography>
                  <Rating name="read-only" value={product.ISOReview.rating} readOnly />
                </Box>
              </td>
              <td><Button variant=""  onClick={() => handleEditProduct(product)}><img src="https://cdn-icons-png.flaticon.com/512/6324/6324968.png"style={{ width: '40px', height: '40px' }}/></Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={handleEditClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="name">
          <Form.Label><b>Product Name</b></Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="des">
          <Form.Label><b>Description</b></Form.Label>
          <Form.Control
            type="text"
            name="des"
            value={editedProduct.des}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, des: e.target.value })
            }
          />
        </Form.Group>

        <div className="row">
  <div className="col-md-6">
    <Form.Group controlId="price" className="mb-3">
      <Form.Label><b>Price</b></Form.Label>
      <Form.Control
        type="text"
        name="price"
        value={editedProduct.price}
        onChange={(e) =>
          setEditedProduct({
            ...editedProduct,
            price: Number(e.target.value) || 0,
          })
        }
      />
    </Form.Group>
  </div>
  <div className="col-md-6">
    <Form.Group controlId="category" className="mb-3">
      <Form.Label><b>Category</b></Form.Label>
      <Form.Select
        name="category"
        value={editedProduct.category}
        onChange={(e) =>
          setEditedProduct({
            ...editedProduct,
            category: e.target.value,
          })
        }
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Toys">Toys</option>
        <option value="Other">Other</option>
      </Form.Select>
    </Form.Group>
  </div>
</div>



        <Form.Group controlId="stock.quantity">
          <Form.Label><b>Quantity</b></Form.Label>
          <Form.Control
            type="text"
            name="quantity"
            value={editedProduct.stock.quantity}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                stock: {
                  ...editedProduct.stock,
                  quantity: Number(e.target.value)||0,
                },
              })
            }
          />
        </Form.Group>

        {/* <Form.Group controlId="ISOReview.rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="text"
            name="rating"
            value={editedProduct.ISOReview.rating}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                ISOReview: {
                  ...editedProduct.ISOReview,
                  rating: e.target.value,
                },
              })
            }
          />
        </Form.Group> */}

<Box sx={{ "& > legend": { mt: 2 } }}>
                <Typography component="legend">
                  <b>Ratings</b>
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={editedProduct.ISOReview.rating}
                  onChange={(e:any) =>
                    setEditedProduct({
                      ...editedProduct,
                      ISOReview: {
                        ...editedProduct.ISOReview,
                        rating: e.target.value,
                      },
                    })}
                />
              </Box>

        <Form.Group controlId="ISOReview.remarks">
          <Form.Label><b>Remarks</b></Form.Label>
          <Form.Control
            type="text"
            name="remarks"
            value={editedProduct.ISOReview.remarks}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                ISOReview: {
                  ...editedProduct.ISOReview,
                  remarks: e.target.value,
                },
              })
            }
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleEditClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
      <Footer />
    </>
  );
};

export default Products;
