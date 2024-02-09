import { useEffect, useState } from "react";
import Input from "../../component/common/input/input.component";
import useNotification from "../../hook/notification.hook";
import "./paymentform.css";
import GooglePayButton from "@google-pay/button-react";
import { useUser } from "../../service/UserContext";

const PaymentForm = () => {
  const { setNotification } = useNotification();
  const [housingTerms, setHousingTerms] = useState("");
  const id = sessionStorage.getItem("housingID");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatuse] = useState(false);
  const { owner } = useUser();

  const handelPAyment = async (e) => {
    e.preventDefault();

    const useid = sessionStorage.getItem("userID");

    const payInfo = {
      status: status,
      useid: useid,
      housingId: id,
      ownerId: owner,
    };

    try {
      const response = await fetch("http://localhost:3005/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payInfo),
      });
      if (response.ok) {
        // setNotification({ message: "payment successfuly", status: "success" });
        setShowModal(false);
      } else {
        setNotification({ message: "faild", status: "error" });
      }
    } catch (error) {
      setNotification({ message: "Server Error", status: "warning" });
    }
  };

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
        console.error("Error during fetch:", error.message);
        // setNotification({ message: 'Error during fetch', status: 'err' });
      }
    };

    fetchHousingData();
  }, [id]);

  return (
    <div className="payment-container">
      <div className="payment-form">
        <form className="inner-payment-form" onSubmit={handelPAyment}>
          <div id="rental-agreement">
            <input id="check" type="checkbox" required />
            <label id="agreeQ">Are u agree with these terms?</label>
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <p>Are you sure you want to proceed with the payment?</p>
                <button type="submit">Yes</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  No
                </button>
              </div>
            </div>
          )}
          <button type="submit">
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "1",
                  currencyCode: "USD",
                  countryCode: "US",
                },
                shippingAddressRequired: true,
                callbackIntents: ["PAYMENT_AUTHORIZATION"],
              }}
              onLoadPaymentData={(paymentRequest) => {
                setStatuse(true);
                // setNotification({
                //   message: "payment successfuly",
                //   status: "success",
                // });
              }}
              onPaymentAuthorized={(paymentData) => {
                setStatuse(true);
                setNotification({
                  message: "payment successfuly",
                  status: "success",
                });
                return { transactionState: "SUCCESS" };
              }}
              existingPaymentMethodRequired="false"
              buttonColor="black"
              buttonType="buy"
            ></GooglePayButton>
          </button>
        </form>
      </div>
      <div className="payment-info">
        <p id="fees"> Fees per month: {housingTerms.fees}</p>
        <p id="terms">{housingTerms.term}</p>
      </div>
    </div>
  );
};

export default PaymentForm;
