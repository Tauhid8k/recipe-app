import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

const Regular = () => {
  const [regular, setRegular] = useState([]);

  const getRegular = async () => {
    const checkRegular = localStorage.getItem("regular");
    if (checkRegular) {
      setRegular(JSON.parse(checkRegular));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("regular", JSON.stringify(data.recipes));
      setRegular(data.recipes);
    }
  };

  useEffect(() => {
    getRegular();
  }, []);

  return (
    <>
      <Wrapper>
        <h3>Regular Pics</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            gap: "2rem",
            drag: "free",
          }}
        >
          {regular.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={`/recipe/${recipe.id}`}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 1rem;
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 10px;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    left: 50%;
    bottom: 0%;
    z-index: 10;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Regular;
