import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SearchBox from '../components/SearchBox';
import { Grid, GridItem } from '@chakra-ui/react';
import { useContext, useEffect, useState, useReducer } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Flex,
  Spacer,
  Text,
  Heading,
  Link,
  useToast,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast({
          title: `error`,
          status: 'error',
          isClosable: true,
        });
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Store</title>
      </Helmet>
      <Grid
        h="400px"
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={12} colSpan={1}>
          <Menu>
            <MenuButton w="100%" h="50" bg="#7fad39" p="4">
              <Flex>
                <Text color="white">DEPARTMENT</Text>
                <Spacer />
                <HamburgerIcon m="auto" />
              </Flex>
            </MenuButton>
            <MenuList>
              {categories.map((category) => {
                return (
                  <MenuItem key={category}>
                    <Link href={`/search?category=${category}`}>
                      {category}
                    </Link>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem colSpan={3} rowSpan={2}>
          <SearchBox h="100%" />
        </GridItem>
        <GridItem colSpan={3} rowSpan={10}>
          <Image
            h="100%"
            w="100%"
            src="https://res.cloudinary.com/duub1fspr/image/upload/v1656978439/bg1_uvufgv.jpg"
          />
        </GridItem>
      </Grid>
      <Heading align="center" m="4" bg="gray.50">
        PRODUCTS
      </Heading>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
