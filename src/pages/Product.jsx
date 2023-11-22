import './product.css'
import ProductForm from '../components/ProductForm';
import Cards from '../components/ProductList';
import { useState } from 'react';

function Product() {
	const [datos, setDatos] = useState([]);

	return (
		<div className='container'>
			<div className='izquierda'>
			<ProductForm setDatos={setDatos} />
			</div>
			<div className='derecha'>
			<Cards datos={datos} setDatos={setDatos}/>
			</div>
		</div>
	);
}
export default Product;