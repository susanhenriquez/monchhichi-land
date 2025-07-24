# 🐒 Monchhichi Land

A beautiful community website where Monchhichi enthusiasts can upload photos of their beloved dolls and create a shared collection. Built with React TypeScript and modern UI/UX design.

## 🌐 Live Website

**Visit the live site**: [https://susanhenriquez.github.io/monchhichi-land](https://susanhenriquez.github.io/monchhichi-land)

## ✨ Features

- **📸 Upload Form**: Users can upload photos of their Monchhichi dolls with names and descriptions
- **🎨 Community Collection**: View all submitted Monchhichi dolls in a beautiful gallery
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎭 Side-by-Side Layout**: Upload on the left, see collection on the right
- **✨ Beautiful Animations**: Smooth hover effects, floating elements, and gradient backgrounds
- **🔄 Real-time Updates**: New submissions appear instantly in the collection
- **💫 Modern UI/UX**: Clean design with warm gradients and professional typography

## 🚀 Development Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:susanhenriquez/monchhichi-land.git
   cd monchhichi-land
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)
   - The page will auto-reload when you make changes

## 📦 Deployment Instructions

### Deploy to GitHub Pages (Recommended)

**⚠️ Note**: GitHub Pages deployment is already configured for this project.

1. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Wait 5-10 minutes** for changes to go live at:
   - https://susanhenriquez.github.io/monchhichi-land

### Alternative Deployment Options

#### Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Connect your GitHub account
3. Select the `monchhichi-land` repository
4. Deploy automatically (detects React apps)
5. Get a custom `.netlify.app` domain

#### Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Import your GitHub repository
3. Deploy with zero configuration
4. Get a custom `.vercel.app` domain

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🛠️ Available Scripts

### Development
- `npm start` - Runs development server at http://localhost:3000
- `npm test` - Launches test runner
- `npm run build` - Creates production build

### Deployment
- `npm run deploy` - Deploys to GitHub Pages
- `npm run predeploy` - Automatically runs before deploy (builds the app)

## 📁 Project Structure

```
monchhichi-land/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Collection.tsx  # Community collection display
│   │   ├── LandingPage.tsx # Main page layout
│   │   └── UploadForm.tsx  # Upload form component
│   ├── App.tsx            # Main App component
│   ├── App.css           # Global styles
│   └── index.tsx         # App entry point
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎨 Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with gradients and animations
- **GitHub Pages** - Free hosting
- **gh-pages** - Deployment automation

## 🎯 How It Works

1. **Upload Section (Left Side)**
   - Users click to upload a Monchhichi photo
   - Fill in the doll's name, their name, and optional description
   - Submit to add to the community collection

2. **Collection Section (Right Side)**
   - Displays all submitted Monchhichi dolls
   - Shows photos, names, descriptions, and submission dates
   - Updates in real-time when new dolls are added

## 🔄 Making Updates

1. **Make your code changes**
2. **Test locally**
   ```bash
   npm start
   ```
3. **Commit and push changes**
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push
   ```
4. **Deploy to live site**
   ```bash
   npm run deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 About Monchhichi

Monchhichi was created in 1974 with the idea that such a doll, as a gift, could inspire friendship, love and happiness to people of all ages. This philosophy continues to guide the product development, and we hope you'll enjoy this community platform as much as we enjoyed creating it!

---

**Built with ❤️ for the Monchhichi community** 🐒✨
