import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
	Typography,
	CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import useHttpRequest from '../hooks/useHttpRequest';

const ProductList = () => {
  const { data, loading, error, sendRequest } = useHttpRequest();
  const { user } = useUser();

  useEffect(() => {
    sendRequest('http://localhost:3000/api/products', 'GET', null, {
      'x-auth-token': user.token,
    });
  }, []);

  return (
    <Container maxWidth='lg'>
			<div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant='h4' component='h2'>
          Product List
        </Typography>
      </div>

			{loading ? (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <CircularProgress />
        </div>
      ) : (
				<TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Quantity In Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((product) => (
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Link to={`/products/${product._id}`}>{product._id}</Link>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
			)}

			{error && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'red' }}>
          An error occurred: {error}
        </div>
      )}
    </Container>
  );
};

export default ProductList;
