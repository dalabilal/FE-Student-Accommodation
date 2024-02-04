// Admin.js
import React, { useState, useEffect } from 'react';
import './admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3005/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUsers(userData.users);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const handleCheckboxChange = (userId) => {
    // Toggle the selected status of the user
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleApproveUsers = async () => {
    try {
      const response = await fetch('http://localhost:3005/admin/approve-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds: selectedUsers }),
      });

      if (response.ok) {
        // Fetch updated user data after approval
        const updatedUsers = await fetch('http://localhost:3005/admin/users')
        setUsers(updatedUsers.users);
        console.log('Users approved successfully');
      } else {
        console.error('Failed to approve users:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving users:', error.message);
    }
  };

  return (
    <div className='all-users'>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
           user.role !== 'admin'&&  <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <input
                  type='checkbox'
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleApproveUsers}>Approve Selected Users</button>
    </div>
  );
};

export default Admin;
