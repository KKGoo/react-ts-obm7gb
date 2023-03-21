import * as React from 'react';
import './style.css';

/**
 * 1. Request the 'users' from the following endpoint and
 *    display each user name on screen.
 *    - https://jsonplaceholder.typicode.com/users
 * 2. Each user has its own company information, when a user
 *    is selected show their company information.
 */
export default function App() {
  const [loading, setLoading] = React.useState();
  const [data, setData] = React.useState<User[]>([]);
  const [company, setCompany] = React.useState<Company>();

  const handleCompany = (identifier) => {
    const index = data.find(({ id }) => identifier === id);
    setCompany(index.company);
  };

  const userList = data.map((usuario) => (
    <div>
      <p>{usuario.id}</p>
      <p>{usuario.name}</p>
      <button onClick={() => handleCompany(usuario.id)}>Ver company</button>
    </div>
  ));

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>{company?.name}</div>
        <div>{company?.catchPhrase}</div>
        <div>{company?.bs}</div>

      </div>
      {userList}
    </div>
  );
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;

}
