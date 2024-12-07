import Roulette from './Roulette.jsx'

const App = () => {
  const sections = ["1등","2등","3등","4등","5등","6등"];

  return (

      <div>
        <h1>React Roulette</h1>
        <Roulette sections={sections} size={500} />
      </div>
  );
};

export default App;
