/* eslint-disable react/prop-types */
import style from '../styles/productList.module.css'

function Cards({ datos, setDatos }) {
	const sumarPrecios = () => {
		const total = datos.reduce((acumulador, dato) => acumulador + parseFloat(dato.subtotal), 0);
		return total.toFixed(2);
	};
	const substractAmount = (dato) => {
		setDatos((prevDatos) =>
			prevDatos.map((d) =>
				d.name === dato.name
				? {
					...d,
					amount: Math.max(0, d.amount - 1),
					subtotal: Math.max(0, d.amount - 1) * d.price,
				}
				: d
			)
		);
	};
	
	const addAmount = (dato) => {
		setDatos((prevDatos) =>
		prevDatos.map((d) =>
			d.name === dato.name
			? { ...d, amount: d.amount + 1, subtotal: (d.amount + 1) * d.price }
			: d
			)
		);
	};
	
	return (
    <div className={style.productList}>
		<div className={style.placeList}>
			{
			datos.length > 0 ? (
			datos.map((dato) => (
				<div key={dato.name+dato.price} className={style.cards}>
					<div className={style.cardText}>
						<span className={style.textItem}></span>
						<p><strong>Nombre:</strong>  {dato.name}</p>
						{dato.description.length > 30 ? (
						<p><strong>Descripción: </strong>
						{dato.description.substring(0, 30)}... <a href='#'>Más</a>
						</p>
						) : (
						<p><strong>Descripción: </strong>{dato.description}</p>
						)}
						<p><strong>Precio Unitario:</strong> {dato.price}</p>
						<p><strong>Subtotal:</strong> {dato.subtotal}</p>		
					</div > 
					<div className={style.controls}>
						<button onClick={()=>substractAmount(dato)} disabled={dato.amount === 0}>-</button>
						<span>{dato.amount}</span>
						<button onClick={()=>addAmount(dato)} >+</button>
					</div>
				</div>
			))
			) : (
				<div className={style.noItemsMessage}>
					<p>No hay items disponibles</p>
				</div>
			)
			}
			{datos.length > 0 && (
				<p className={style.total}>
					<strong>Total:</strong> {sumarPrecios()}
				</p>
			)}
        </div>
    </div>
  );
}

export default Cards;