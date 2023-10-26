import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Modal,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import useHttpRequest from '../hooks/useHttpRequest';

const columns = [
  { field: 'entryExitAmount', headerName: 'Entry Exit Amount', width: 300 },
  {
    field: 'movementDescription',
    headerName: 'Movement Description',
    sortable: false,
    width: 600,
  },
];

const ProductDetail = () => {
  const { productId } = useParams();
  const { data, loading, error, sendRequest } = useHttpRequest();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest(
      `http://localhost:3000/api/products/${productId}`,
      'GET',
      null,
      {
        'x-auth-token': user.token,
      }
    );
  }, []);

  useEffect(() => {
    setProduct(data);
  }, [data]);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    code: '',
  });

  const [productMovement, setProductMovement] = useState({
    movementDescription: '',
    entryExitAmount: 0,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveClick = () => {
    sendRequest(
      `http://localhost:3000/api/products/${productId}`,
      'PUT',
      {
        name: product.name,
        description: product.description,
        code: product.code,
      },
      {
        'x-auth-token': user.token,
      }
    );
  };

  const handleDeleteClick = () => {
    sendRequest(
      `http://localhost:3000/api/products/${productId}`,
      'DELETE',
      null,
      {
        'x-auth-token': user.token,
      }
    );

    navigate(-1);
  };

  const handleMovementClick = () => {
    sendRequest(
      `http://localhost:3000/api/products/${productId}/movements`,
      'POST',
      productMovement,
      {
        'x-auth-token': user.token,
      }
    );

    setOpen(false);
  };

  return (
    <Container maxWidth='xl'>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant='h4' component='h2'>
          Product Detail
        </Typography>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <form>
            <TextField
              fullWidth
              label='Product Name'
              variant='outlined'
              style={{ marginTop: '1rem' }}
              value={product?.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />

            <TextField
              fullWidth
              label='Description'
              variant='outlined'
              style={{ marginTop: '1rem' }}
              value={product?.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />

            <TextField
              fullWidth
              label='Code'
              variant='outlined'
              style={{ marginTop: '1rem' }}
              value={product?.code}
              onChange={(e) => setProduct({ ...product, code: e.target.value })}
            />

            <TextField
              fullWidth
              label='Quantity In Stock'
              variant='outlined'
              style={{ marginTop: '1rem' }}
              type='number'
              value={data?.quantity}
              disabled
            />

            <div style={{ marginTop: '1rem' }}>
              <Typography variant='h6' component='h3'>
                Product Movement List
              </Typography>
            </div>

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={data ? data?.movements : []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row) => row._id}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem',
              }}
            >
              <Button
                variant='contained'
                color='secondary'
                onClick={handleDeleteClick}
              >
                Delete
              </Button>

              <Button variant='contained' color='primary' onClick={handleOpen}>
                Add Product Movement
              </Button>

              <Button
                variant='contained'
                color='primary'
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </div>
          </form>

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                width: 600,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 2,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <TextField
                label='Add or Decrease Stock Quantity'
                variant='outlined'
                value={productMovement.entryExitAmount}
                onChange={(e) =>
                  setProductMovement({
                    ...productMovement,
                    entryExitAmount: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label='Description'
                variant='outlined'
                value={productMovement.movementDescription}
                onChange={(e) =>
                  setProductMovement({
                    ...productMovement,
                    movementDescription: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                }}
              >
                <Button
                  onClick={handleClose}
                  variant='contained'
                  color='secondary'
                >
                  Close
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleMovementClick}
                >
                  Save
                </Button>
              </div>
            </Box>
          </Modal>
        </>
      )}
      {error && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'red' }}>
          An error occurred: {error}
        </div>
      )}
    </Container>
  );
};

export default ProductDetail;
