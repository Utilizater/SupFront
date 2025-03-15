import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';

// Mock data for the consultation
const mockConsultation = {
  id: 'new-1234567890',
  expert: {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Nutritionist, PhD',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
  },
  consultationType: 'Initial Consultation',
  scheduledTime: 'March 20, 2025 at 10:00 AM',
  status: 'Scheduled',
  messages: [
    {
      id: '1',
      sender: 'expert',
      text: "Hello! Thank you for scheduling a consultation with me. Before our session, could you please share a bit more about your health goals and any specific concerns you'd like to address?",
      timestamp: '2025-03-15T09:30:00',
      isRead: true,
    },
    {
      id: '2',
      sender: 'user',
      text: "Hi Dr. Johnson! I'm mainly looking to improve my energy levels and gut health. I've been experiencing some digestive issues and fatigue lately.",
      timestamp: '2025-03-15T09:35:00',
      isRead: true,
    },
    {
      id: '3',
      sender: 'expert',
      text: "I understand. Those are common concerns that can often be addressed with the right approach. Could you share a bit about your current diet and any supplements you're already taking?",
      timestamp: '2025-03-15T09:40:00',
      isRead: true,
    },
    {
      id: '4',
      sender: 'user',
      text: "I try to eat healthy but often end up having quick meals due to my busy schedule. I'm currently taking a multivitamin and occasionally some vitamin D.",
      timestamp: '2025-03-15T09:45:00',
      isRead: true,
    },
    {
      id: '5',
      sender: 'expert',
      text: "Thank you for sharing that. I'll prepare some initial thoughts for our consultation. In the meantime, could you also fill out the health questionnaire I've attached? This will help me get a more complete picture of your health status.",
      timestamp: '2025-03-15T09:50:00',
      isRead: true,
      attachments: [
        {
          id: '1',
          name: 'Health Questionnaire.pdf',
          type: 'pdf',
          size: '245 KB',
        },
      ],
    },
  ],
  recommendations: [
    {
      id: '1',
      title: 'Digestive Enzyme Complex',
      description:
        'Take 1 capsule with each meal to support digestion and nutrient absorption.',
      dosage: '1 capsule 3x daily with meals',
      link: '#',
    },
    {
      id: '2',
      title: 'Probiotic Blend (50 Billion CFU)',
      description:
        'High-potency probiotic to support gut microbiome health and immune function.',
      dosage: '1 capsule daily on empty stomach',
      link: '#',
    },
  ],
};

const ConsultationChat: React.FC = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockConsultation.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // In a real app, you would fetch the consultation data based on consultationId
  useEffect(() => {
    // Simulating API call to fetch consultation data
    console.log(`Fetching consultation data for ID: ${consultationId}`);
    // setConsultation(fetchedConsultation);
  }, [consultationId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: `new-${Date.now()}`,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setMessages([...messages, newMsg as any]);
    setNewMessage('');

    // In a real app, you would send this message to your backend
    console.log('Sending message:', newMsg);

    // Simulate expert response after a delay
    setTimeout(() => {
      const expertReply = {
        id: `new-${Date.now() + 1}`,
        sender: 'expert',
        text: "Thank you for your message. I'll review this information before our consultation.",
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      setMessages((prev) => [...prev, expertReply as any]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToExperts = () => {
    navigate('/consultations');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Chat Header */}
      <AppBar position='static' color='default' elevation={1}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleBackToExperts}>
            <ArrowBackIcon />
          </IconButton>

          <Avatar
            src={mockConsultation.expert.imageUrl}
            sx={{ ml: 1, mr: 2 }}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1' component='div'>
              {mockConsultation.expert.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {mockConsultation.expert.title}
            </Typography>
          </Box>

          <Chip
            label={mockConsultation.status}
            color={
              mockConsultation.status === 'Scheduled' ? 'primary' : 'success'
            }
            size='small'
            sx={{ mr: 2 }}
          />

          <IconButton edge='end' color='inherit'>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Consultation Info Card */}
      <Container maxWidth='lg' sx={{ py: 2 }}>
        <Card variant='outlined' sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant='subtitle1' gutterBottom>
                  Consultation Type
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {mockConsultation.consultationType}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant='subtitle1' gutterBottom>
                  Scheduled Time
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {mockConsultation.scheduledTime}
                </Typography>
              </Grid>

              {mockConsultation.recommendations &&
                mockConsultation.recommendations.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant='subtitle1' gutterBottom sx={{ mt: 1 }}>
                      Supplement Recommendations
                    </Typography>

                    {mockConsultation.recommendations.map((rec) => (
                      <Box key={rec.id} sx={{ mt: 1 }}>
                        <Typography variant='body2' fontWeight='bold'>
                          {rec.title}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {rec.description}
                        </Typography>
                        <Typography variant='body2' color='primary'>
                          Dosage: {rec.dosage}
                        </Typography>
                      </Box>
                    ))}
                  </Grid>
                )}
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: '#f5f5f5',
        }}>
        <Container maxWidth='md'>
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  mb: 2,
                  justifyContent:
                    message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
                disableGutters>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection:
                      message.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    maxWidth: '80%',
                  }}>
                  {message.sender === 'expert' && (
                    <ListItemAvatar>
                      <Avatar src={mockConsultation.expert.imageUrl} />
                    </ListItemAvatar>
                  )}

                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      backgroundColor:
                        message.sender === 'user' ? '#e3f2fd' : 'white',
                      borderRadius: 2,
                    }}>
                    <ListItemText
                      primary={message.text}
                      secondary={formatTime(message.timestamp)}
                      secondaryTypographyProps={{
                        sx: { textAlign: 'right', mt: 1, fontSize: '0.75rem' },
                      }}
                    />

                    {message.attachments && message.attachments.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        {message.attachments.map((attachment) => (
                          <Box
                            key={attachment.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 1,
                              border: '1px solid #e0e0e0',
                              borderRadius: 1,
                              backgroundColor: '#f9f9f9',
                            }}>
                            {attachment.type === 'pdf' ? (
                              <InsertDriveFileIcon
                                color='primary'
                                sx={{ mr: 1 }}
                              />
                            ) : (
                              <ImageIcon color='primary' sx={{ mr: 1 }} />
                            )}
                            <Typography variant='body2'>
                              {attachment.name} ({attachment.size})
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Paper>
                </Box>
              </ListItem>
            ))}
          </List>
          <div ref={messagesEndRef} />
        </Container>
      </Box>

      {/* Message Input Area */}
      <Container maxWidth='md' sx={{ py: 2 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <IconButton color='primary' sx={{ p: 1 }}>
              <AttachFileIcon />
            </IconButton>

            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder='Type your message...'
              variant='outlined'
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewMessage(e.target.value)
              }
              onKeyPress={handleKeyPress}
              sx={{ mx: 1 }}
            />

            <Button
              variant='contained'
              color='primary'
              endIcon={<SendIcon />}
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}>
              Send
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ConsultationChat;
