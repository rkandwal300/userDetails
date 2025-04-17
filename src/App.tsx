import Header from './components/shared/Header';
import UserList from './components/shared/UserList/UserList';

function App() {
  return (
    <main className=" h-screen flex flex-col flex-1">
      <Header />
      <UserList />
    </main>
  );
}

export default App;
