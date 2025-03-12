import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ExplorePage = () => {
  const [allCollections, setAllCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    setCurrentUser(JSON.parse(userStr));
    fetchAllCollections();
  }, [navigate]);

  const fetchAllCollections = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/entities/all');
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
      const response = await fetch(`http://localhost:3000/api/entities/${entityId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUser.id })
      });

      if (!response.ok) throw new Error('Failed to like item');
      
      // Update the collections to reflect the new like
      fetchAllCollections();
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };

  if (loading) return <LoadingMessage>Loading collections...</LoadingMessage>;

  return (
    <ExploreContainer>
      <Title>Explore All Collections</Title>
      <CollectionsGrid>
        {allCollections.map((item) => (
          <CollectionCard key={item._id}>
            {item.img && (
              <ItemImage src={item.img} alt={item.name} />
            )}
            <ItemContent>
              <ItemName>{item.name}</ItemName>
              <ItemDescription>{item.description}</ItemDescription>
              <CategoryTag>{item.category}</CategoryTag>
              <CreatorInfo>Added by: {item.createdBy}</CreatorInfo>
              <LikeSection>
                <LikeButton 
                  onClick={() => handleLike(item._id)}
                  liked={item.likes?.includes(currentUser?.id)}
                >
                  {item.likes?.includes(currentUser?.id) ? (
                    <AiFillHeart size={24} />
                  ) : (
                    <AiOutlineHeart size={24} />
                  )}
                </LikeButton>
                <LikeCount>{item.likes?.length || 0} likes</LikeCount>
              </LikeSection>
            </ItemContent>
          </CollectionCard>
        ))}
      </CollectionsGrid>
    </ExploreContainer>
  );
};

const ExploreContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #646cff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CollectionCard = styled.div`
  background: rgba(30, 30, 30, 0.6);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ItemContent = styled.div`
  padding: 1.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const CategoryTag = styled.span`
  background: rgba(100, 108, 255, 0.2);
  color: #646cff;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

const CreatorInfo = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.liked ? '#ff6b6b' : 'rgba(255, 255, 255, 0.7)'};
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const LikeCount = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
`;

export default ExplorePage;