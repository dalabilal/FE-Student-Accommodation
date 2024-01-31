import Input from "../../component/common/input/input.component"
import "./paymentform.css"

const PaymentForm = () => {

    const handelPAyment = (e) => {
        e.preventDefault();
    }

    return (
        <div className="payment-form">
            <form onSubmit={handelPAyment}>
                <Input
                    label="holder's name :"
                    required
                />
                <Input
                    label="Card  Number:"
                    placeholder="___-___-___-___"
                    type="number"
                    required
                />
                <Input
                    label="CVV(security number)"
                    type="number"
                    required
                />
                <Input
                    label="Exp date"
                    type="date"
                    required
                />
                <button type="submit">Pay</button>
            </form>

        </div>
    )
}

export default PaymentForm
