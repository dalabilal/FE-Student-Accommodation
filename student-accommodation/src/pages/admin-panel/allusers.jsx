// Admin.js
import React, { useState, useEffect } from 'react';
import './admin.css';
import { Trash } from '@phosphor-icons/react/dist/ssr';

const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);


  useEffect(() => {
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


  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3005/admin/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setDeletedUsers((prevDeletedUsers) => [...prevDeletedUsers, userId]);
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };


  return (
    <div className='all-users'>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            !deletedUsers.includes(user._id) && (user.role !== 'admin') &&
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>
                <Trash onClick={() => handleDeleteUser(user._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allusers;
