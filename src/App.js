import './App.module.css';
import Header from './components/Header';
import Booking from './components/Booker/Booking';
import DataProvider from './store/DataProvider';
import CloseWrapper from './components/CloseWrapper';

function App() {
  return (
    <DataProvider>
      <CloseWrapper>
        <Header />
        <main>
          <Booking />
        </main>
      </CloseWrapper>
    </DataProvider>
  );
}

export default App;
