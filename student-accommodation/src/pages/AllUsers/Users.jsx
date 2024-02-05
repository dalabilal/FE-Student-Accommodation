import { useEffect, useState } from "react";
import "./users.css";
import useNotification from "../../hook/notification.hook";

const Users = () => {
  const id = sessionStorage.getItem("userID");
  const { setNotification } = useNotification();
  const [ownerId, setOwnerId] = useState([]);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerResponse = await fetch(
          `https://localhost:3005/payment/owner`
        );
        if (ownerResponse.ok) {
          const ownerData = await ownerResponse.json();
          setOwnerId(ownerData);
        } else {
          console.error(
            "Failed to fetch owner data:",
            ownerResponse.statusText
          );
          setNotification({
            message: "Failed to fetch owner data",
            status: "err",
          });
        }

        const studentResponse = await fetch(
          `https://localhost:3005/signin/pay`
        );
        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          setStudentData(studentData);
        } else {
          console.error(
            "Failed to fetch student data:",
            studentResponse.statusText
          );
          setNotification({
            message: "Failed to fetch student data",
            status: "err",
          });
        }
      } catch (error) {
        console.error("Error during fetch:", error.message);
        setNotification({ message: "Error during fetch", status: "err" });
      }
    };

    fetchData();
  }, [id]);
  const renderUserDetails = (ownerId) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>PhoneNumber</th>
            <th>Pay or not</th>
          </tr>
        </thead>
        <tbody>
          {ownerId?.map((owner) => {
            const student = studentData?.find(
              (student) => student._id === owner.useid
            );
            if (student && owner.ownerId === id) {
              return (
                <tr key={owner._id}>
                  <td>{student.firstname}</td>
                  <td>{student.phoneNumber}</td>
                  <td>Yes</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    );
  };

  return <div className="users">{renderUserDetails(ownerId)}</div>;
};

export default Users;
