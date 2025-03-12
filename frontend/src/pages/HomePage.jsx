import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <ContentWrapper>
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
          <AuthButton onClick={() => navigate('/signup')}>Sign Up</AuthButton>
        </ButtonContainer>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🎨</FeatureIcon>
            <h3>Create Your Collection</h3>
            <p>Add and manage your own collection of visually appealing but inedible items.</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <h3>Explore Others</h3>
            <p>Discover fascinating collections from other users around the world.</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💫</FeatureIcon>
            <h3>Share & Connect</h3>
            <p>Share your collection and connect with like-minded enthusiasts.</p>
          </FeatureCard>
        </FeaturesGrid>
      </ContentWrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: radial-gradient(circle at top right, #1a1a1a, #0a0a0a);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 4.5em;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 30px rgba(100, 108, 255, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
  animation: slideUp 1s ease-out 0.3s both;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AuthButton = styled.button`
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(100, 108, 255, 0.4);

    &:before {
      left: 100%;
    }
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem auto 0;
  animation: slideUp 1s ease-out 0.6s both;
`;

const FeatureCard = styled.div`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 108, 255, 0.3);
    box-shadow: 0 10px 30px rgba(100, 108, 255, 0.1);
  }

  h3 {
    color: #646cff;
    margin: 1rem 0;
    font-size: 1.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export default HomePage;