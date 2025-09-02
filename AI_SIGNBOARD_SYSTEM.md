# AI Signboard Designer System

## Overview

The AI Signboard Designer is a comprehensive system that allows users to create professional signboard designs using artificial intelligence. The system includes user authentication, daily generation limits, design saving, and team collaboration features.

## Key Features

### 1. User Authentication
- **Sign In/Sign Up**: Users must be authenticated to access the designer
- **Session Management**: User sessions are maintained across browser sessions
- **Secure Access**: Only authenticated users can generate designs

### 2. AI Design Generation
- **Store Information Input**: Users provide store name and business type
- **AI Prompt Input**: Custom specifications for design requirements
- **4 Design Previews**: Each generation creates 4 unique design variations
- **Daily Limits**: Users can generate up to 2 sets of designs per day

### 3. Design Management
- **Auto-Save**: All generated designs are automatically saved to user profiles
- **Design History**: Users can view all their previously generated designs
- **Design Selection**: Users can select their preferred design from the 4 options

### 4. Order Workflow
- **Design Selection**: Users choose their preferred design
- **Team Connection**: System connects users with design team members
- **Order Processing**: Team finalizes design and completes order process

### 5. User Dashboard
- **Design Gallery**: View all saved designs
- **Generation Tracking**: Monitor daily generation usage
- **Order Status**: Track ordered designs

## System Architecture

### Components

#### Authentication System
- `AuthContext.tsx` - Global authentication state management
- `AuthGuard.tsx` - Protected route component
- `LoginForm.tsx` - User login interface
- `SignUpForm.tsx` - User registration interface

#### AI Designer
- `AISignboardDesigner.tsx` - Main designer interface
- `AISignboardService.ts` - AI generation service
- `UserDashboard.tsx` - User design management

#### Pages
- `SignBoardPage.tsx` - Main designer page
- `LoginPage.tsx` - Authentication page
- `SignUpPage.tsx` - Registration page
- `DashboardPage.tsx` - User dashboard

### Data Flow

1. **User Authentication**
   ```
   User → Login/Signup → AuthContext → Session Storage
   ```

2. **Design Generation**
   ```
   User Input → AI Service → 4 Design Images → User Profile Storage
   ```

3. **Order Process**
   ```
   Design Selection → Team Connection → Order Processing
   ```

## Usage Instructions

### For Users

1. **Getting Started**
   - Visit `/signboard` to access the designer
   - Sign in or create an account if not authenticated
   - You'll be redirected to the login page if not signed in

2. **Creating Designs**
   - Fill in your store information (name and business type)
   - Describe your ideal signboard design in the AI prompt field
   - Click "Generate 4 Design Previews"
   - Wait for AI to generate your designs (this may take a few moments)

3. **Selecting and Ordering**
   - Review the 4 generated designs
   - Click on your preferred design to select it
   - Click "Place Order & Connect with Team"
   - Our team will contact you within 24 hours

4. **Managing Designs**
   - Visit `/dashboard` to view all your saved designs
   - Track your daily generation usage
   - View order status for designs you've ordered

### Daily Limits

- Each user can generate **2 sets of designs per day**
- Each generation creates **4 unique design variations**
- Limits reset daily at midnight
- Users are notified when they reach their daily limit

### Design Specifications

When describing your ideal signboard, consider including:
- **Colors**: Preferred color schemes or specific colors
- **Style**: Modern, vintage, minimalist, bold, etc.
- **Lighting**: Neon, LED, backlit effects
- **Materials**: Metal, acrylic, wood preferences
- **Text Style**: Font preferences, text effects
- **Special Requirements**: Size constraints, mounting specifications

## Technical Implementation

### Authentication Flow
```typescript
// User login
const { login } = useAuth();
await login(email, password);

// Check authentication status
const { isAuthenticated, user } = useAuth();

// Protected routes
<AuthGuard>
  <AISignboardDesigner />
</AuthGuard>
```

### AI Generation
```typescript
// Generate designs
const images = await AISignboardService.generateDesigns({
  storeInfo: { storeName, businessType },
  aiPrompt: userPrompt,
  userId: user.id
});

// Save to user profile
saveDesign({
  storeName,
  businessType,
  aiPrompt,
  generatedImages: images,
  ordered: false
});
```

### Daily Limits
```typescript
// Check generation availability
const canGenerate = user.dailyGenerationsUsed < user.maxDailyGenerations;

// Increment usage
incrementGenerationCount();
```

## Security Features

- **Authentication Required**: All design features require user authentication
- **Session Management**: Secure session handling with localStorage
- **Rate Limiting**: Daily generation limits prevent abuse
- **Data Privacy**: User designs are private and secure

## Future Enhancements

1. **Premium Plans**: Higher daily limits for premium users
2. **Design Templates**: Pre-made templates for common business types
3. **Collaboration**: Share designs with team members
4. **Export Options**: Download designs in various formats
5. **Order Tracking**: Real-time order status updates
6. **Payment Integration**: Direct payment processing
7. **Design Variations**: Generate variations of existing designs

## Support

For technical support or questions about the AI Signboard Designer:
- Contact our development team
- Check the user dashboard for design status
- Review this documentation for usage guidelines

## API Integration

The system uses Hugging Face's Stable Diffusion XL model for AI image generation. Ensure the `VITE_HUGGINGFACE_API_TOKEN` environment variable is properly configured for the AI service to function.

```env
VITE_HUGGINGFACE_API_TOKEN=your_huggingface_token_here
```
