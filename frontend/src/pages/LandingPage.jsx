import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LandingPage = ({ onGuestLogin }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>Tempting but Inedible</Title>
          <Subtitle>
            A Community of Visual Deception Artists
          </Subtitle>
        </Header>

        <MainContent>
          <Description>
            Welcome to a unique platform where art meets illusion. We celebrate objects 
            that challenge your perception - items that look deliciously edible but are 
            anything but. From soap that looks like cake to candles shaped like coffee, 
            discover a world of creative deception.
          </Description>

          <Features>
            <Feature>
              <FeatureIcon>📸</FeatureIcon>
              <FeatureTitle>Share Your Creations</FeatureTitle>
              <FeatureText>
                Build and showcase your collection of visually deceiving artworks
              </FeatureText>
            </Feature>
            <Feature>
              <FeatureIcon>🌟</FeatureIcon>
              <FeatureTitle>Get Inspired</FeatureTitle>
              <FeatureText>
                Explore amazing collections from artists worldwide
              </FeatureText>
            </Feature>
            <Feature>
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>Join the Community</FeatureTitle>
              <FeatureText>
                Connect with fellow artists and enthusiasts
              </FeatureText>
            </Feature>
          </Features>

          <CTASection>
            <CTAButton onClick={() => navigate('/login')}>
              Log In
            </CTAButton>
            <CTAButton onClick={() => navigate('/signup')} variant="secondary">
              Sign Up
            </CTAButton>
            <CTAButton onClick={onGuestLogin} variant="guest">
              Continue as Guest
            </CTAButton>
          </CTASection>
        </MainContent>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top right, #1a1a1a, #0a0a0a);
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
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

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const MainContent = styled.main`
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 4rem;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const Feature = styled.div`
  background: rgba(30, 30, 30, 0.6);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #646cff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const CTASection = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
`;

const CTAButton = styled.button`
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => {
    if (props.variant === 'secondary') return 'rgba(100, 108, 255, 0.1)';
    if (props.variant === 'guest') return 'rgba(255, 255, 255, 0.1)';
    return 'linear-gradient(45deg, #646cff, #ff6b6b)';
  }};
  color: white;
  border: ${props => {
    if (props.variant === 'secondary') return '1px solid #646cff';
    if (props.variant === 'guest') return '1px solid rgba(255, 255, 255, 0.2)';
    return 'none';
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => {
      if (props.variant === 'guest') return '0 7px 20px rgba(255, 255, 255, 0.2)';
      return '0 7px 20px rgba(100, 108, 255, 0.4)';
    }};
  }
`;

export default LandingPage;