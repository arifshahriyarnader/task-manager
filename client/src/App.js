import './App.css';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Todo from './components/todo/Todo';
import UpdateTodo from './components/todo/UpdateTodo';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Footer from './components/footer/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
        <Route exact path="/" element={ <Home />}/>
        <Route  path="/todo" element={ <Todo />}/>
        <Route  path="/register" element={ <Signup />}/>
        <Route  path="/login" element={ <Signin />}/>
        <Route  path="/update" element={ <UpdateTodo />}/>
      </Routes>
      <Footer />
      </Router>
      
    </div>
  );
}

export default App;
