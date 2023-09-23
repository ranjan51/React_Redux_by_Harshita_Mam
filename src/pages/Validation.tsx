import * as yup from 'yup';

const schema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  description: yup.string().required('Product Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Please enter a product price'),
  category: yup.string().notOneOf([''], 'Category is required').required('Category is required'),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .required('Stock Quantity is required'),
});

export default schema;