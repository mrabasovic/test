import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Karticom');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Nacin placanja</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="karticom"
              value="Karticom"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="karticom">Karticom</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="pouzecem"
              value="Pouzecem"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="pouzecem">Pouzecem</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Nastavi
          </button>
        </div>
      </form>
    </div>
  );
}
