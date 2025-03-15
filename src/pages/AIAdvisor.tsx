import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Message type definition
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  saved?: boolean;
}

// Supplement recommendation type
interface SupplementRecommendation {
  id: string;
  name: string;
  description: string;
  dosage: string;
  price: number;
  benefits: string[];
  image?: string;
}

const AIAdvisor: React.FC = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your AI supplement advisor. I can help you find the right supplements based on your health goals and needs. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<
    SupplementRecommendation[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompts for the user
  const suggestedPrompts = [
    'What supplements can help with energy?',
    'I need help with sleep issues',
    'Recommend supplements for joint pain',
    'What should I take for immune support?',
    'Best supplements for stress and anxiety?',
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      generateAIResponse(userMessage.text);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const generateAIResponse = (userMessage: string) => {
    // This is a mock implementation - in a real app, this would call an API
    let aiResponse = '';
    let newRecommendations: SupplementRecommendation[] = [];

    // Simple keyword matching for demo purposes
    const lowerCaseMessage = userMessage.toLowerCase();

    if (
      lowerCaseMessage.includes('energy') ||
      lowerCaseMessage.includes('tired') ||
      lowerCaseMessage.includes('fatigue')
    ) {
      aiResponse =
        "Based on your interest in energy support, I recommend considering these supplements. Vitamin B12 is essential for energy production, while CoQ10 supports cellular energy. Ashwagandha can help with stress-related fatigue, and Iron may be beneficial if you're experiencing fatigue due to low iron levels.";

      newRecommendations = [
        {
          id: '101',
          name: 'Vitamin B12',
          description:
            'Essential vitamin for energy production and nervous system function',
          dosage: '1000mcg daily',
          price: 15.99,
          benefits: [
            'Increases energy',
            'Supports red blood cell formation',
            'Improves mood',
          ],
          image: '/supplements/b12.jpg',
        },
        {
          id: '102',
          name: 'CoQ10',
          description: 'Coenzyme that helps generate energy in cells',
          dosage: '100-200mg daily',
          price: 24.99,
          benefits: [
            'Supports cellular energy production',
            'Antioxidant properties',
            'Heart health',
          ],
          image: '/supplements/coq10.jpg',
        },
        {
          id: '103',
          name: 'Ashwagandha',
          description: 'Adaptogenic herb that helps the body manage stress',
          dosage: '300-500mg twice daily',
          price: 19.99,
          benefits: [
            'Reduces fatigue',
            'Lowers stress and anxiety',
            'Improves concentration',
          ],
          image: '/supplements/ashwagandha.jpg',
        },
        {
          id: '104',
          name: 'Iron Complex',
          description:
            'Essential mineral for oxygen transport and energy production',
          dosage: '18mg daily (for adults)',
          price: 12.99,
          benefits: [
            'Prevents anemia',
            'Reduces fatigue',
            'Improves cognitive function',
          ],
          image: '/supplements/iron.jpg',
        },
      ];
    } else if (
      lowerCaseMessage.includes('sleep') ||
      lowerCaseMessage.includes('insomnia')
    ) {
      aiResponse =
        'For sleep support, I recommend considering these supplements. Melatonin can help regulate your sleep cycle, while Magnesium helps relax muscles and calm the nervous system. L-Theanine promotes relaxation without drowsiness, and Valerian Root has been used traditionally for sleep support.';

      newRecommendations = [
        {
          id: '201',
          name: 'Melatonin',
          description: 'Hormone that regulates sleep-wake cycle',
          dosage: '1-3mg before bedtime',
          price: 9.99,
          benefits: [
            'Reduces time to fall asleep',
            'Improves sleep quality',
            'Helps with jet lag',
          ],
          image: '/supplements/melatonin.jpg',
        },
        {
          id: '202',
          name: 'Magnesium Glycinate',
          description: 'Essential mineral in a highly absorbable form',
          dosage: '300-400mg before bedtime',
          price: 18.99,
          benefits: [
            'Muscle relaxation',
            'Calms nervous system',
            'Improves sleep quality',
          ],
          image: '/supplements/magnesium.jpg',
        },
        {
          id: '203',
          name: 'L-Theanine',
          description: 'Amino acid found in tea leaves',
          dosage: '200mg before bedtime',
          price: 14.99,
          benefits: [
            'Promotes relaxation',
            'Reduces stress',
            'Improves sleep quality',
          ],
          image: '/supplements/l-theanine.jpg',
        },
        {
          id: '204',
          name: 'Valerian Root',
          description: 'Herb traditionally used for sleep support',
          dosage: '300-600mg before bedtime',
          price: 12.99,
          benefits: [
            'Reduces time to fall asleep',
            'Improves sleep quality',
            'Calming effect',
          ],
          image: '/supplements/valerian.jpg',
        },
      ];
    } else if (
      lowerCaseMessage.includes('joint') ||
      lowerCaseMessage.includes('pain') ||
      lowerCaseMessage.includes('arthritis')
    ) {
      aiResponse =
        'For joint support, I recommend considering these supplements. Glucosamine and Chondroitin support cartilage health, while Omega-3 fatty acids help reduce inflammation. Turmeric/Curcumin is a powerful anti-inflammatory, and Collagen provides building blocks for joint tissue.';

      newRecommendations = [
        {
          id: '301',
          name: 'Glucosamine & Chondroitin',
          description: 'Compounds found naturally in cartilage',
          dosage: '1500mg Glucosamine / 1200mg Chondroitin daily',
          price: 29.99,
          benefits: [
            'Supports cartilage health',
            'Reduces joint pain',
            'Improves mobility',
          ],
          image: '/supplements/glucosamine.jpg',
        },
        {
          id: '302',
          name: 'Omega-3 Fish Oil',
          description:
            'Essential fatty acids with anti-inflammatory properties',
          dosage: '1000-2000mg daily',
          price: 22.99,
          benefits: [
            'Reduces inflammation',
            'Supports joint health',
            'Heart and brain benefits',
          ],
          image: '/supplements/omega3.jpg',
        },
        {
          id: '303',
          name: 'Turmeric/Curcumin',
          description: 'Powerful anti-inflammatory compound',
          dosage: '500-1000mg daily with black pepper extract',
          price: 19.99,
          benefits: [
            'Reduces inflammation',
            'Antioxidant properties',
            'Supports joint health',
          ],
          image: '/supplements/turmeric.jpg',
        },
        {
          id: '304',
          name: 'Collagen Peptides',
          description: 'Protein that provides structure to joints',
          dosage: '10-15g daily',
          price: 24.99,
          benefits: [
            'Supports joint tissue',
            'Improves skin health',
            'Strengthens bones',
          ],
          image: '/supplements/collagen.jpg',
        },
      ];
    } else if (
      lowerCaseMessage.includes('immune') ||
      lowerCaseMessage.includes('cold') ||
      lowerCaseMessage.includes('sick')
    ) {
      aiResponse =
        'For immune support, I recommend considering these supplements. Vitamin C and Zinc are essential for immune function, while Vitamin D plays a crucial role in immune regulation. Elderberry has traditional use for immune support, and Probiotics support gut health which is linked to immunity.';

      newRecommendations = [
        {
          id: '401',
          name: 'Vitamin C',
          description: 'Essential vitamin with antioxidant properties',
          dosage: '500-1000mg daily',
          price: 12.99,
          benefits: [
            'Supports immune function',
            'Antioxidant protection',
            'Collagen production',
          ],
          image: '/supplements/vitamin-c.jpg',
        },
        {
          id: '402',
          name: 'Zinc',
          description: 'Essential mineral for immune cell function',
          dosage: '15-30mg daily',
          price: 10.99,
          benefits: [
            'Supports immune response',
            'Wound healing',
            'Protein synthesis',
          ],
          image: '/supplements/zinc.jpg',
        },
        {
          id: '403',
          name: 'Vitamin D3',
          description: 'Fat-soluble vitamin important for immune regulation',
          dosage: '1000-5000 IU daily',
          price: 14.99,
          benefits: ['Immune regulation', 'Bone health', 'Mood support'],
          image: '/supplements/vitamin-d.jpg',
        },
        {
          id: '404',
          name: 'Elderberry Extract',
          description: 'Berry with traditional use for immune support',
          dosage: '150-300mg daily',
          price: 16.99,
          benefits: [
            'Immune support',
            'Rich in antioxidants',
            'Supports respiratory health',
          ],
          image: '/supplements/elderberry.jpg',
        },
      ];
    } else if (
      lowerCaseMessage.includes('stress') ||
      lowerCaseMessage.includes('anxiety')
    ) {
      aiResponse =
        'For stress and anxiety support, I recommend considering these supplements. Ashwagandha is an adaptogen that helps the body manage stress, while L-Theanine promotes relaxation. Magnesium helps calm the nervous system, and Rhodiola Rosea may help improve stress resilience.';

      newRecommendations = [
        {
          id: '501',
          name: 'Ashwagandha',
          description: 'Adaptogenic herb that helps the body manage stress',
          dosage: '300-500mg twice daily',
          price: 19.99,
          benefits: [
            'Reduces stress and anxiety',
            'Balances cortisol levels',
            'Improves resilience',
          ],
          image: '/supplements/ashwagandha.jpg',
        },
        {
          id: '502',
          name: 'L-Theanine',
          description: 'Amino acid found in tea leaves',
          dosage: '200-400mg daily',
          price: 14.99,
          benefits: [
            'Promotes relaxation without drowsiness',
            'Reduces stress',
            'Improves focus',
          ],
          image: '/supplements/l-theanine.jpg',
        },
        {
          id: '503',
          name: 'Magnesium Glycinate',
          description: 'Essential mineral in a highly absorbable form',
          dosage: '300-400mg daily',
          price: 18.99,
          benefits: [
            'Calms nervous system',
            'Muscle relaxation',
            'Supports mood',
          ],
          image: '/supplements/magnesium.jpg',
        },
        {
          id: '504',
          name: 'Rhodiola Rosea',
          description: 'Adaptogenic herb that helps the body adapt to stress',
          dosage: '200-400mg daily',
          price: 21.99,
          benefits: [
            'Improves stress resilience',
            'Reduces fatigue',
            'Enhances mental performance',
          ],
          image: '/supplements/rhodiola.jpg',
        },
      ];
    } else {
      aiResponse =
        "I'd be happy to recommend supplements for your specific needs. Could you please provide more details about your health goals or concerns? For example, are you looking for support with energy, sleep, immune function, stress management, or something else?";
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setRecommendations(newRecommendations);
    setIsLoading(false);
  };

  const toggleSaveMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, saved: !message.saved }
          : message
      )
    );
  };

  const addToCart = (supplementId: string) => {
    // In a real app, this would add the item to the cart
    console.log(`Added supplement ${supplementId} to cart`);
    // Show feedback to user
    alert(`Added supplement to cart!`);
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 600,
              position: 'relative',
            }}>
            <Typography variant='h6' component='h2' gutterBottom>
              AI Supplement Advisor
            </Typography>

            {/* Messages container */}
            <Box
              sx={{
                flexGrow: 1,
                overflow: 'auto',
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                mb: 2,
              }}>
              <List>
                {messages.map((message) => (
                  <ListItem
                    key={message.id}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems:
                        message.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '100%',
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        maxWidth: '80%',
                      }}>
                      {message.sender === 'ai' && (
                        <Avatar
                          sx={{
                            bgcolor: 'secondary.main',
                            mr: 1,
                            mt: 0.5,
                          }}>
                          <SmartToyIcon />
                        </Avatar>
                      )}

                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          bgcolor:
                            message.sender === 'user'
                              ? 'primary.main'
                              : 'background.paper',
                          color:
                            message.sender === 'user'
                              ? 'primary.contrastText'
                              : 'text.primary',
                          borderRadius: 2,
                          maxWidth: '100%',
                        }}>
                        <Typography
                          variant='body1'
                          sx={{ whiteSpace: 'pre-wrap' }}>
                          {message.text}
                        </Typography>
                      </Paper>

                      {message.sender === 'user' && (
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            ml: 1,
                            mt: 0.5,
                          }}>
                          <PersonIcon />
                        </Avatar>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 0.5,
                        ml: message.sender === 'ai' ? 7 : 0,
                        mr: message.sender === 'user' ? 7 : 0,
                      }}>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{ mr: 1 }}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>

                      {message.sender === 'ai' && (
                        <IconButton
                          size='small'
                          onClick={() => toggleSaveMessage(message.id)}
                          color={message.saved ? 'primary' : 'default'}>
                          {message.saved ? (
                            <BookmarkIcon fontSize='small' />
                          ) : (
                            <BookmarkBorderIcon fontSize='small' />
                          )}
                        </IconButton>
                      )}
                    </Box>
                  </ListItem>
                ))}
                <div ref={messagesEndRef} />
              </List>

              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>

            {/* Input area */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder='Type your message...'
                variant='outlined'
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                multiline
                maxRows={3}
                sx={{ mr: 1 }}
              />
              <Button
                variant='contained'
                color='primary'
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}>
                Send
              </Button>
            </Box>

            {/* Suggested prompts */}
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {suggestedPrompts.map((prompt, index) => (
                <Chip
                  key={index}
                  label={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  clickable
                  color='primary'
                  variant='outlined'
                  size='small'
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Recommendations panel */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 600, overflow: 'auto' }}>
            <Typography variant='h6' component='h2' gutterBottom>
              Recommended Supplements
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {recommendations.length > 0 ? (
              <Box>
                {recommendations.map((supplement) => (
                  <Card key={supplement.id} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        height: 120,
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Box
                        component='img'
                        src={supplement.image}
                        alt={supplement.name}
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement>
                        ) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.innerHTML =
                              '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#9e9e9e" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant='h6' component='h3' gutterBottom>
                        {supplement.name}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        paragraph>
                        {supplement.description}
                      </Typography>
                      <Typography variant='body2'>
                        <strong>Dosage:</strong> {supplement.dosage}
                      </Typography>
                      <Typography variant='body2' sx={{ mt: 1 }}>
                        <strong>Benefits:</strong>
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5,
                          mt: 0.5,
                        }}>
                        {supplement.benefits.map((benefit, index) => (
                          <Chip key={index} label={benefit} size='small' />
                        ))}
                      </Box>
                      <Typography variant='h6' color='primary' sx={{ mt: 1 }}>
                        ${supplement.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => addToCart(supplement.id)}>
                        Add to Cart
                      </Button>
                      <Button size='small'>Learn More</Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography
                variant='body1'
                color='text.secondary'
                align='center'
                sx={{ mt: 4 }}>
                Ask the AI advisor about your health goals to get personalized
                supplement recommendations.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AIAdvisor;
