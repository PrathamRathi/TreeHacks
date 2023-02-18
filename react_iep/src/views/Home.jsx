import logo from "../assets/cool-image.svg";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="title-description">
        <h1>
          “Personalized Learning Solutions for Students with Disabilities”
        </h1>
      </div>
      <img src={logo} alt="logo" className="home-logo" />
    </div>
  );
};

export default Home;
