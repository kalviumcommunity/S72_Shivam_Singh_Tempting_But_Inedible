import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Header>
        <Title>Tempting but Inedible</Title>
        <Subtitle>
          Welcome to a world where beauty meets deception. Discover our collection of 
          visually stunning but completely inedible treasures. Each item is a testament 
          to the art of visual temptation!
        </Subtitle>
      </Header>
      
      <ButtonContainer>
        <AuthButton onClick={() => navigate('/login')}>Login</AuthButton>
        <AuthButton onClick={() => navigate('/')}>Sign Up</AuthButton>
      </ButtonContainer>

      <FeaturesGrid>
        <FeatureCard>
          <h3>Create Your Collection</h3>
          <p>Add and manage your own collection of visually appealing but inedible items.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Explore Others</h3>
          <p>Discover fascinating collections from other users around the world.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Share & Connect</h3>
          <p>Share your collection and connect with like-minded enthusiasts.</p>
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 4em;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
`;

const AuthButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 108, 255, 0.4);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto 0;
`;

const FeatureCard = styled.div`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #646cff;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`;

export default HomePage;