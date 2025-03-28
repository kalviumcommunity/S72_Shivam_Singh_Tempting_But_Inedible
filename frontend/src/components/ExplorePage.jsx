import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

// Base URL for the backend API
const BASE_URL = 'https://s72-shivam-singh-tempting-but-inedible.onrender.com';

const ExplorePage = () => {
  const [allCollections, setAllCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
    fetchAllCollections();
  }, []);

  const fetchAllCollections = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/entities/all`);
      if (!response.ok) throw new Error('Failed to fetch collections');
      const data = await response.json();
      setAllCollections(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setLoading(false);
    }
  };

  const handleLike = async (entityId) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/entities/${entityId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUser.id })
      });

      if (!response.ok) throw new Error('Failed to like item');
      
      fetchAllCollections();
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };

  if (loading) return <LoadingMessage>Loading collections...</LoadingMessage>;

  return (
    <Container>
      <Header>
        <Title>Explore Collections</Title>
        <Description>
          Discover amazing collections of visually deceiving items from our community.
          {!currentUser && (
            <GuestMessage>
              Sign in to like items and create your own collection!
            </GuestMessage>
          )}
        </Description>
      </Header>
      
      <GridContainer>
        {allCollections.map((item) => (
          <Card key={item._id}>
            <ImageContainer>
              <img src={item.img} alt={item.name} />
            </ImageContainer>
            <Content>
              <Title>{item.name}</Title>
              <Description>{item.description}</Description>
              <Category>{item.category}</Category>
              <LikeButton onClick={() => handleLike(item._id)}>
                {item.likes.includes(currentUser?.id) ? (
                  <AiFillHeart color="#ff6b6b" />
                ) : (
                  <AiOutlineHeart />
                )}
                <span>{item.likes.length}</span>
              </LikeButton>
            </Content>
          </Card>
        ))}
      </GridContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const GuestMessage = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(100, 108, 255, 0.1);
  border-radius: 8px;
  color: #646cff;
  font-size: 0.9rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: rgba(30, 30, 30, 0.6);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Category = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(100, 108, 255, 0.1);
  color: #646cff;
  border-radius: 20px;
  font-size: 0.8rem;
  margin: 0.5rem 0;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }

  svg {
    font-size: 1.2rem;
  }

  span {
    font-size: 0.9rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
`;

export default ExplorePage;
