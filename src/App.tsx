import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/shared/Header';
import UserList from './components/shared/UserList/UserList';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: 0,
        cacheTime: 5 * 60 * 1000,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
    <main className="h-screen flex flex-col flex-1">
      <Header />
      <UserList />
    </main>
    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer />
  </QueryClientProvider>
  
  );
}

export default App;
