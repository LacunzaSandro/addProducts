/* eslint-disable react/prop-types */
import { useState } from 'react';
import FormInput from './Inputs/FormInput';
import inputs from '../services/inputsInProductForm';
import style from '../styles/productForm.module.css'

function ProductForm({ setDatos }) {
	const [validationErrors, setValidationErrors] = useState({});
	const [nuevoDato, setNuevoDato] = useState(
		{
			name:'',
			description: '',
			price:'',
			amount:0,
			subtotal:0
		}
		);

	const manejarCambios = (e) => {
		const { target } = e;
    const { name, value } = target;
		const newValues = {
			...nuevoDato,
			[name]: value,
		};
		setNuevoDato(newValues);

	};
  
	const manejarEnvio = () => {
		setDatos((prevDatos) => [...prevDatos, nuevoDato]);
		setNuevoDato({
			name:'',
			description: '',
			price:'',
			amount:0,
			subtotal:0
		});
	};
	

	const handleButtonClickk = (e) => {
		e.preventDefault();

		const newValidationErrors = {};

		for (const inputName in nuevoDato) {
			const inputElement = document.getElementsByName(inputName)[0];
			if(inputElement && inputElement.pattern) {
				const pattern = new RegExp(inputElement.pattern);
				if (!pattern.test(nuevoDato[inputName])) {
				newValidationErrors[inputName] = true;
				}
			}
		}
	
		setValidationErrors(newValidationErrors);

		if (Object.keys(newValidationErrors).length === 0) {
		manejarEnvio(e);
		}
	};

	return (
		<div className={style.productForm}>
			<div className={style.formulario}>
				<form onSubmit={manejarEnvio}>
				<h1>Producto</h1>
				{inputs.map((input) => (

					<FormInput
					key={input.id}
					{...input}
					value={nuevoDato[input.name]}
					onChange={manejarCambios}
					error={validationErrors[input.name]}
					errorMessage={input.errorMessage}
					/>
				))}
				<button onClick={handleButtonClickk} disabled={!nuevoDato.name || !nuevoDato.price}>CARGAR PRODUCTO</button>
				</form>
			</div>
		</div>
	);
  }

export default ProductForm;