# CodeQuiz — Web Technologies I Midterm Project

CodeQuiz is a responsive mini website for practicing basic programming knowledge through short interactive quizzes. The project is designed to be easy to use, easy to defend, and consistent across desktop, tablet and mobile screens.

## Live project

The project is GitHub Pages-ready. **Before LMS submission, publish this folder and paste the final GitHub Pages URL here and in the LMS Online text field.**

Live URL: `ADD-YOUR-GITHUB-PAGES-URL-HERE`

## Main pages

- `index.html` — Home page, topic cards, saved progress and random challenge
- `quiz.html` — Interactive Java, Python and HTML/CSS quizzes
- `about.html` — Project idea, technology stack, design principles and team roles
- `contact.html` — Responsive feedback form with HTML validation

## Team contribution

### Kassymkhan
- `about.html`
- `contact.html`

### Darkhan
- `index.html`
- `quiz.html`

Both team members contributed to shared styling, testing and project consistency.

## Technologies used

- HTML5 semantic structure
- CSS3 custom design
- CSS Flexbox
- CSS Grid
- Bootstrap 5.3 responsive grid and navbar
- JavaScript for quiz logic, timer, progress, explanations, XP, streaks and form feedback
- `localStorage` for saved best scores and total XP

## Features

- 3 programming topics
- 5 questions per topic
- 60-second timer
- Progress bar
- Keyboard shortcuts 1–4
- Instant correct/wrong feedback
- Short explanation after every answer
- XP rewards
- Correct-answer streak
- Achievement badges
- Best score saved for each topic
- Total XP saved in the browser
- Random Challenge button
- Responsive navigation
- Responsive contact form with built-in browser validation
- Visible keyboard focus styles and reduced-motion support

## Responsive design

The website uses:

- Bootstrap `container`, `row`, `col-*` and responsive navbar classes
- CSS Grid for topic, step, quiz answer and result layouts
- Flexbox for navigation, cards, statistics and quiz controls
- Custom media queries for tablet and mobile layouts

Tested target widths:

- 1440 px desktop
- 768 px tablet
- 390 px mobile
- 320 px small mobile

## Project structure

```text
CodeQuiz_Midterm_Final/
├── index.html
├── quiz.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── codequiz-badge.svg
├── vendor/
│   ├── bootstrap.min.css
│   └── bootstrap.bundle.min.js
├── screenshots/
├── README.md
├── DEFENSE_GUIDE.md
└── .nojekyll
```

## How to run locally

1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge or Firefox.
3. Navigate through all four pages.
4. Open `quiz.html`, choose a topic and complete the quiz.

No internet connection is required because Bootstrap is stored locally in the `vendor` folder.

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload all files from this project folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save and wait for GitHub to provide the Pages URL.
7. Open the URL and test all four pages.
8. Replace `ADD-YOUR-GITHUB-PAGES-URL-HERE` above with the real URL.
9. Paste the same URL into the LMS Online text field.

## Final submission checklist

- [x] Responsive desktop layout
- [x] Responsive tablet layout
- [x] Responsive mobile layout
- [x] HTML semantic tags
- [x] CSS Flexbox
- [x] CSS Grid
- [x] Bootstrap responsive components
- [x] Four main HTML pages
- [x] At least two pages per team member
- [x] No external image links
- [x] Local Bootstrap files included
- [x] Quiz logic works
- [x] HTML/CSS answers render safely as text
- [x] Form validation works
- [x] README included
- [x] Defense guide included
- [ ] Publish to GitHub Pages and add the real URL before LMS submission
- [ ] Both team members submit the project files in LMS

## AI assistance acknowledgement

Generative AI was used as an assistant for brainstorming, debugging, code suggestions, testing and interface refinement. The project team remains responsible for reviewing, understanding, modifying, testing and explaining the final submission during the defense.
