/**
 * Fake Fetching of single item
 * @param {string} email
 * @param {string} password
 */
const signUpUser = async (firstname, lastname, phoneNumber, email, password) => {
    try {
        const response = await fetch(`http://localhost:3000/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    phoneNumber,
                    email,
                    password
                })
            });
        return await await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export {
    signUpUser
};