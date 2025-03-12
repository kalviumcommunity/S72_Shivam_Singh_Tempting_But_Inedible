import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <HomeContainer>
      <ContentWrapper>
        <Header>
          <Title>Welcome to Tempting but Inedible</Title>
          <Subtitle>
            Discover the Art of Visual Deception
          </Subtitle>
        </Header>

        <Section>
          <SectionTitle>What We're About</SectionTitle>
          <Description>
            We celebrate the fascinating world of objects that look deliciously appealing but are completely inedible. From soap cupcakes to decorative candles that look like real food, our platform showcases the artistry in creating these visually deceiving items.
          </Description>
        </Section>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🎨</FeatureIcon>
            <h3>Create & Share</h3>
            <p>Build your personal collection of visually deceiving items and share them with our community.</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <h3>Explore & Discover</h3>
            <p>Browse through unique collections from creators around the world.</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>❤️</FeatureIcon>
            <h3>Connect & Engage</h3>
            <p>Like, comment, and connect with fellow enthusiasts who share your passion.</p>
          </FeatureCard>
        </FeaturesGrid>

        <Section>
          <SectionTitle>Why Join Us?</SectionTitle>
          <Description>
            Whether you're a creator of deceptive art or simply appreciate the craft, our platform offers a unique space to showcase, discover, and discuss these fascinating objects. Join our growing community of artists and enthusiasts today!
          </Description>
        </Section>
      </ContentWrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  background: radial-gradient(circle at top right, #1a1a1a, #0a0a0a);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5em;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Section = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #646cff;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled.div`
  background: rgba(30, 30, 30, 0.6);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
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
`;

export default HomePage;