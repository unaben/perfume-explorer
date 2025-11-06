import MainDisplay from "./components/MainDisplay/MainDisplay";
import styles from "./App.module.css";

function App() {

  // fetch('https://perfumexplorer.bellefriends.com/images.json')
  // .then(res => {
  //   console.log('Status:', res.status);
  //   console.log('Headers:', res.headers.get('Access-Control-Allow-Origin'));
  //   return res.json();
  // })
  // .then(data => console.log('Data:', data))
  // .catch(err => console.error('Error:', err));

  console.log('NODE_ENV:', process.env.NODE_ENV);

  return (
    <div className={styles.container}>
      <MainDisplay />
    </div>
  );
}

export default App;
