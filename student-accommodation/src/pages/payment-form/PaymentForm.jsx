import { useEffect, useState } from "react";
import Input from "../../component/common/input/input.component"
import useNotification from "../../hook/notification.hook";
import "./paymentform.css"

const PaymentForm = () => {
    const { setNotification } = useNotification();
    const [housingTerms , setHousingTerms] = useState('');
    const id = sessionStorage.getItem('housingID');

    const handelPAyment = async (e) => {
        e.preventDefault();

        const holdername = e.target.holdername.value;
        const cardnum = e.target.cardnum.value;
        const cvv = e.target.cvv.value;
        const expDate = e.target.expDate.value;
        const useid = sessionStorage.getItem('userID');

        if (!isValidCardNumber(cardnum)) {
            setNotification({ message: 'Invalid card number. Please enter a 16-digit card number.', status: 'error' });
            return;
        }

        if (!isValidCVV(cvv)) {
            setNotification({ message: 'Invalid CVV. Please enter a 3-digit CVV.', status: 'error' });
            return;
        }


        const payInfo = {
            holdername :holdername,
            cardnum : cardnum,
            cvv :cvv,
            expDate :expDate,
            useid :useid,
            housingId:id,
        }

        try {
            const response = await fetch("http://localhost:3005/payment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payInfo)
            })
            if (response.ok) {
                setNotification({ message: 'payment successfuly', status: 'success' });
            } else {
                setNotification({ message: 'faild', status: 'error' });

            }
        } catch (error) {
            setNotification({ message: 'Server Error', status: 'warning' })
        }
    }

    useEffect(() => {
        const fetchHousingData = async () => {
          try {
            const response = await fetch(`http://localhost:3005/term/${id}`);
            if (response.ok) {
              const data = await response.json();
              setHousingTerms(data);
            } else {
            //   console.error('Failed to fetch housing data:', response.statusText);
            //   setNotification({ message: 'Failed to fetch housing terms', status: 'err' });
            }
          } catch (error) {
            console.error('Error during fetch:', error.message);
            // setNotification({ message: 'Error during fetch', status: 'err' });
          }
        };
    
        fetchHousingData();
      }, [id]);
        // Validation functions
        const isValidCardNumber = (cardNumber) => /^\d{16}$/.test(cardNumber);
        const isValidCVV = (cvv) => /^\d{3}$/.test(cvv);

    return (
        <div className="payment-form">
            <p>{housingTerms.fees}</p>
            <p>{housingTerms.term}</p>
            <form onSubmit={handelPAyment}>
                <Input
                    label="holder's name :"
                    required
                    name="holdername"
                    />
                <Input
                    label="Card  Number:"
                    placeholder="___-___-___-___"
                    type="number"
                    name="cardnum"
                    required
                    />
                <Input
                    label="CVV(security number)"
                    type="number"
                    name="cvv"
                    required
                    />
                <Input
                    label="Exp date"
                    type="date"
                    name="expDate"
                    required
                />
                <button type="submit">Pay</button>
            </form>

        </div>
    )
}

export default PaymentForm
