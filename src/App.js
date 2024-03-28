import CartMenu from "./components/Cart/CartMenu";
import Header from "./components/Layout/Header";
import PopularMeals from "./components/PopularMeals";
import CardWithSlider from "./components/UI/CardWithSlider";

function App() {
  return (
    <main className="bg-black">
      <div className="container mx-auto px-4">
        <Header />
        <CardWithSlider />
        <PopularMeals />
        <CartMenu />
      </div>
    </main>
  );
}

export default App;
