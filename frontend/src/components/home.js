import { useEffect,useState } from "react";
import axios from 'axios'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
    const [users,setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/getusers')
        .then(users => setUsers(users.data))
        .catch(err => console.log(err))

    }, [])
    const handleClick = () => {
        navigate("/login");
      
      }
    return (
        <div className="w-100 vh-100 justify-content-center align-item-center">
            <div className="w-50">
        <table className="table">
            <thead>
                <tr>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                       return  <tr>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        </div>
        <Button className="primary-button my-2 full-width-button" htmlType="logout" onClick={handleClick}>
            LOGout
          </Button>
        </div>
    )
}

export default Home;