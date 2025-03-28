import React, { useEffect, useState } from "react";
import AddEntityForm from "./AddEntityForm";
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

// Base URL for the backend API
const BASE_URL = 'https://s72-shivam-singh-tempting-but-inedible.onrender.com';

const Entities = () => {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingEntity, setEditingEntity] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const userData = JSON.parse(userStr);
            setUser(userData);
            if (userData.isGuest) {
                setLoading(false);
                return;
            }
            fetchEntities();
        }
    }, []);

    const getPositiveMessage = (likeCount) => {
        if (likeCount === 0) return "Share this with the community!";
        if (likeCount === 1) return "Someone loves your creation!";
        if (likeCount < 5) return "Your creation is getting noticed!";
        if (likeCount < 10) return "People are loving your work!";
        return "Your creation is a community favorite! 🌟";
    };

    const fetchEntities = async () => {
        if (!user || user.isGuest) return;
        
        try {
            const response = await fetch(`${BASE_URL}/api/entities?userId=${user.id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setEntities(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching entities:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && !user.isGuest) {
            fetchEntities();
        }
    }, [user]);

    const handleEntityAdded = () => {
        fetchEntities();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/entities/${id}?userId=${user.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            fetchEntities();
        } catch (error) {
            console.error('Error deleting entity:', error);
            alert('Failed to delete item. Please try again.');
        }
    };

    const handleEdit = (entity) => {
        setEditingEntity(entity);
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`${BASE_URL}/api/entities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...updatedData, userId: user.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            setEditingEntity(null);
            fetchEntities();
        } catch (error) {
            console.error('Error updating entity:', error);
            alert('Failed to update item. Please try again.');
        }
    };

    if (!user) return <StyledMessage>Please log in to view your collection.</StyledMessage>;
    if (loading) return <StyledMessage>Loading...</StyledMessage>;
    if (error) return <StyledMessage>Error: {error}</StyledMessage>;
    if (user.isGuest) {
        const handleGuestAction = (action) => {
            // Clear the guest user data
            localStorage.removeItem('user');
            // Navigate to the appropriate page
            navigate(action === 'signup' ? '/signup' : '/login');
        };

        return (
            <GuestContainer>
                <GuestMessage>
                    <GuestTitle>Guest Access Limited</GuestTitle>
                    <GuestDescription>
                        As a guest user, you can browse collections but cannot create or manage your own collection.
                        Please sign up for a full account to:
                    </GuestDescription>
                    <GuestFeatures>
                        <Feature>• Create and manage your collection</Feature>
                        <Feature>• Add new items</Feature>
                        <Feature>• Edit and delete your items</Feature>
                        <Feature>• Get full access to all features</Feature>
                    </GuestFeatures>
                    <GuestButtons>
                        <SignupButton onClick={() => handleGuestAction('signup')}>
                            Sign Up Now
                        </SignupButton>
                        <LoginButton onClick={() => handleGuestAction('login')}>
                            Log In
                        </LoginButton>
                    </GuestButtons>
                </GuestMessage>
            </GuestContainer>
        );
    }

    return (
        <Container>
            <Header>
                <Title>Your Inedible Collection</Title>
                <Description>
                    Welcome to your personal collection of visually deceiving items. 
                    Here you can add, edit, and manage your fascinating collection of objects 
                    that look delicious but are completely inedible.
                </Description>
            </Header>
            
            <FormSection>
                <AddEntityForm 
                    onEntityAdded={handleEntityAdded}
                    editingEntity={editingEntity}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingEntity(null)}
                    userId={user.id}
                />
            </FormSection>
            
            <CollectionGrid>
                {entities.length > 0 ? (
                    entities.map((entity) => (
                        <ItemCard key={entity._id}>
                            {entity.img && (
                                <ItemImage src={entity.img} alt={entity.name} />
                            )}
                            <ItemContent>
                                <ItemName>{entity.name}</ItemName>
                                <ItemDescription>{entity.description}</ItemDescription>
                                <CategoryTag>{entity.category}</CategoryTag>
                                
                                <LikesSection>
                                    <LikeCount>
                                        <HeartIcon>
                                            <AiFillHeart color="#ff6b6b" />
                                        </HeartIcon>
                                        {entity.likes?.length || 0} likes
                                    </LikeCount>
                                    <PositiveMessage>
                                        {getPositiveMessage(entity.likes?.length || 0)}
                                    </PositiveMessage>
                                </LikesSection>

                                <ButtonGroup>
                                    <EditButton onClick={() => handleEdit(entity)}>
                                        Edit
                                    </EditButton>
                                    <DeleteButton onClick={() => handleDelete(entity._id)}>
                                        Delete
                                    </DeleteButton>
                                </ButtonGroup>
                            </ItemContent>
                        </ItemCard>
                    ))
                ) : (
                    <EmptyMessage>No items found in your collection. Add some inedible items!</EmptyMessage>
                )}
            </CollectionGrid>
        </Container>
    );
};

const Container = styled.div`
    padding: 7rem 2rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 3rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    background: linear-gradient(45deg, #646cff, #ff6b6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
`;

const FormSection = styled.div`
    margin-bottom: 4rem;
`;

const CollectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
`;

const ItemCard = styled.div`
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

const LikesSection = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 12px;
    margin: 1rem 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LikeCount = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

const HeartIcon = styled.span`
    display: flex;
    align-items: center;
`;

const PositiveMessage = styled.p`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    font-style: italic;
    margin: 0;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const Button = styled.button`
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
`;

const EditButton = styled(Button)`
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);

    &:hover {
        background: rgba(76, 175, 80, 0.2);
        transform: translateY(-2px);
    }
`;

const DeleteButton = styled(Button)`
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.2);

    &:hover {
        background: rgba(244, 67, 54, 0.2);
        transform: translateY(-2px);
    }
`;

const StyledMessage = styled.p`
    text-align: center;
    padding: 2rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.2rem;
`;

const EmptyMessage = styled.p`
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
`;

const GuestContainer = styled.div`
    padding: 7rem 2rem 2rem;
    max-width: 800px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GuestMessage = styled.div`
    background: rgba(30, 30, 30, 0.6);
    padding: 3rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    width: 100%;
`;

const GuestTitle = styled.h1`
    font-size: 2.5rem;
    background: linear-gradient(45deg, #646cff, #ff6b6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
`;

const GuestDescription = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
`;

const GuestFeatures = styled.div`
    text-align: left;
    margin: 2rem 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
`;

const Feature = styled.div`
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const GuestButtons = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
`;

const SignupButton = styled.button`
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #646cff, #ff6b6b);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 20px rgba(100, 108, 255, 0.4);
    }
`;

const LoginButton = styled.button`
    padding: 1rem 2rem;
    background: transparent;
    color: #646cff;
    border: 1px solid #646cff;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(100, 108, 255, 0.1);
        transform: translateY(-2px);
    }
`;

export default Entities;
