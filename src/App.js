import "./App.css";
import Footer from "./features/footer/Footer";
import Header from "./features/header/Header";
import TodoList from "./features/todos/TodoList";

function App() {
  return (
    <div className="App">
      <nav>
        <section className="text-center">
          <h1>Redux Example</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
