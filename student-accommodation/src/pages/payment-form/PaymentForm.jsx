import Input from "../../component/common/input/input.component"
import useNotification from "../../hook/notification.hook";
import "./paymentform.css"

const PaymentForm = () => {
    const { setNotification } = useNotification();

    const handelPAyment = async (e) => {
        e.preventDefault();

        const holdername = e.target.holdername.value;
        const cardnum = e.target.cardnum.value;
        const cvv = e.target.cvv.value;
        const expDate = e.target.expDate.value;
        const useid = sessionStorage.getItem('userID');

        const payInfo = {
            holdername :holdername,
            cardnum : cardnum,
            cvv :cvv,
            expDate :expDate,
            useid :useid
        }
        console.log(payInfo);

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

    return (
        <div className="payment-form">
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
