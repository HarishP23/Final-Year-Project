# AI Learning Assistant

A full-stack Next.js application that helps users analyze their skill gaps from resumes and generates personalized learning roadmaps based on their goals using Google Gemini AI.

## 🚀 Features

- **Skill Gap Analysis**: Upload resume content and analyze missing skills for target job roles
- **AI-Powered Roadmap Generation**: Create personalized learning plans with timelines, resources, and checklists
- **Progress Tracking**: Dashboard with progress bars, streak tracking, and interactive checklists
- **Google Gemini AI**: Powered by Google's latest Gemini 1.5 Flash model
- **Modern UI/UX**: Clean, responsive design with TailwindCSS and smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 1.5 Flash
- **Icons**: Lucide React
- **Storage**: Local JSON file system

## 📁 Project Structure

```
career-guidance-agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── skillgap/route.ts
│   │   │   ├── roadmap/route.ts
│   │   │   └── dashboard/
│   │   │       ├── route.ts
│   │   │       └── progress/route.ts
│   │   ├── skillgap/page.tsx
│   │   ├── generate/page.tsx
│   │   ├── roadmap/page.tsx
│   │   ├── dashboard/page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── FormField.tsx
│   │   ├── SkillGapResult.tsx
│   │   └── RoadmapDisplay.tsx
│   └── lib/
│       ├── ai.ts
│       └── utils.ts
├── roadmaps/
│   └── user_roadmap.json
└── .env.local
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-guidance-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # AI Provider (set to gemini)
   AI_PROVIDER=gemini
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Usage

### 1. Skill Gap Analysis

1. Navigate to `/skillgap`
2. Paste your resume content or describe your skills
3. Enter your target job role
4. Click "Analyze Gaps" to get AI-powered analysis
5. Review present skills, missing skills, and suggestions

### 2. Generate Learning Roadmap

1. Navigate to `/generate`
2. Fill in the form with your:
   - Career dream/goal
   - Age (optional)
   - Current skill level
   - Daily study hours
   - Timeframe
3. Click "Generate My Roadmap"
4. Review your personalized learning plan

### 3. Track Progress

1. Navigate to `/dashboard`
2. View your progress overview
3. Mark completed skills, habits, and tasks
4. Track your learning streak
5. Monitor overall completion percentage

## 🔧 Configuration

### Google Gemini API

The application uses Google's Gemini 1.5 Flash model for all AI operations:

- **Model**: `gemini-1.5-flash` (latest and most capable)
- **Features**: Fast, accurate, and cost-effective
- **API**: Google Generative AI API

### API Key Setup

- **Google Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 📊 Features in Detail

### Skill Gap Analysis
- Analyzes resume content against target job role
- Identifies present skills, missing skills, and improvement suggestions
- Provides actionable recommendations

### Roadmap Generation
- Creates week-by-week learning timeline
- Suggests specific skills to learn
- Provides curated resources (YouTube, courses, books, tools)
- Includes habit-building recommendations
- Generates daily and weekly checklists

### Progress Tracking
- Interactive checklists for skills, habits, and tasks
- Learning streak tracking
- Progress percentage calculation
- Visual progress indicators

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Loading states, hover effects, and transitions
- **Color-coded Sections**: Different colors for different types of content
- **Interactive Elements**: Clickable checklists and progress tracking
- **Modern Gradients**: Beautiful background gradients for each page

## 🔒 Data Storage

- All roadmap and progress data is stored locally in `roadmaps/user_roadmap.json`
- No authentication required - file-based persistence
- Data persists between sessions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check that your Gemini API key is correctly set in `.env.local`
2. Ensure you have the latest version of Node.js
3. Try clearing your browser cache
4. Check the browser console for any errors

## 🎯 Roadmap

Future features planned:
- [ ] User authentication
- [ ] Multiple roadmap support
- [ ] Social sharing
- [ ] Export to PDF
- [ ] Mobile app
- [ ] Integration with learning platforms
- [ ] Advanced analytics
- [ ] Community features

---

Built with ❤️ using Next.js, TypeScript, and Google Gemini AI
