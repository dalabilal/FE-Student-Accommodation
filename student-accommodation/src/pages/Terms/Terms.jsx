import './terms.css';

const Terms = () => {

    return (
        <div className="wrapper flex_align_justify">
            <div className="terms_service">

                <div className="tc_item tc_head flex_align_justify">
                    <div className="text">
                        <h2>STUDENT ACCOMMODATION TERMS OF SERVICE</h2>
                        <p>Last updated on Feb 11 2024</p>
                    </div>
                </div>

                <div className="tc_item tc_body">

                    <h3>Terms of Service And Privacy Policy:</h3>
                    <ol>
                        <li>
                            <h3>ACCOUNT APPROVAL:</h3>
                            <ol type="a">
                                <li> Accommodation owners registering on the platform will undergo an approval process by the admin.</li>
                                <li> Admin reserves the right to approve or reject accounts based on specified criteria.</li>
                                <li> During the registration process, the platform collects information necessary for account approval.</li>
                                <li> Admin may review and verify information before approving an owner's account</li>
                            </ol>
                        </li>

                        <li>
                            <h3>LOGIN SECURITY:</h3>
                            <ol type="a">
                                <li> The platform implements security measures to protect user login information.</li>
                                <li> After three unsuccessful login attempts, users will be required to enter a verification code to access their account, as an additional layer of security.</li>
                                <li> The verification code will be sent to the user's registered email.</li>
                            </ol>
                        </li>

                        <li>
                            <h3>PASSWORD RESET PROCEDURE:</h3>
                            <ol type="a">
                                <li> Users can reset their passwords through a secure process, possibly involving identity verification.</li>
                                <li> Emphasize the importance of maintaining the security of their account credentials.</li>
                                <li> Security measures are in place to prevent unauthorized password resets.</li>
                            </ol>
                        </li>

                        <li>
                            <h3> USER ACTION LOGGING:</h3>
                            <ol type="a">
                                <li> User actions within the platform will be logged for security and auditing purposes.</li>
                                <li> User actions are logged to enhance security and ensure compliance with platform policies.</li>
                                <li> The logged information will be used to enhance platform security and ensure compliance.</li>
                            </ol>
                        </li>
                        <li>
                            <h3> CHANGES TO POLICIES </h3>
                            <ul>
                                <li>
                                    Users should be notified of changes to the Terms of Service and Privacy
                                    Policy, including changes related to account approval, login, and user action logging.
                                </li>
                            </ul>
                        </li>

                        <li>
                            <h3>CONTACT US:</h3>
                            <ul> <li>Our email will send to the users email.</li></ul>
                        </li>
                    </ol>
                </div>
            </div>
        </div >
    );
};
export default Terms; 