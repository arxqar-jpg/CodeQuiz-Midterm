# CodeQuiz Defense Guide

Use this as a quick review before the defense. Do not memorize every line — understand what each part does so you can explain and modify it.

## 1. 20-second project introduction

> CodeQuiz is a responsive programming quiz website. It has four pages: Home, Quiz, About Us and Contacts. Users choose Java, Python or HTML/CSS, answer five questions in 60 seconds, receive instant feedback, XP and an achievement badge. The website uses HTML, CSS, Bootstrap, Flexbox, Grid and JavaScript.

## 2. Where HTML is used

HTML creates the structure of all pages.

Semantic elements used:

- `header` — top area
- `nav` — navigation
- `main` — main page content
- `section` — content sections
- `article` — cards and team blocks
- `aside` — contact information
- `form`, `label`, `input`, `select`, `textarea` — feedback form
- `footer` — bottom area

Simple answer:

> HTML gives the page its structure and meaning. I used semantic tags so the code is clearer and more accessible.

## 3. Where CSS is used

Main file: `css/style.css`

CSS controls:

- colors and gradients
- typography
- spacing
- borders and shadows
- cards
- hover and focus states
- responsive behavior
- animations
- quiz answer states

## 4. Where Flexbox is used

Examples:

- `.hero-stats`
- `.topic-card-head`
- `.team-card`
- `.quiz-topline`
- `.quiz-status-cluster`
- `.contact-point`

Simple answer:

> Flexbox is useful when elements need to align in one row or one column with controlled spacing.

## 5. Where CSS Grid is used

Examples:

- `.steps-grid`
- `.profile-strip`
- `.tech-list`
- `.quiz-topic-grid`
- `.answer-list`
- `.result-stats`

Simple answer:

> CSS Grid is useful when I need a multi-column layout, for example topic cards or quiz answers.

## 6. Where Bootstrap is used

Examples in HTML:

- `container`
- `row`
- `col-lg-6`, `col-md-6`, `col-lg-4`
- `navbar`, `navbar-expand-lg`
- `collapse`, `navbar-toggler`
- `d-flex`, `gap-*`, `mt-*`, `py-*`

Simple answer:

> Bootstrap gives us a responsive grid, spacing utilities and a mobile navbar. We combine Bootstrap with our own CSS.

## 7. How responsiveness works

Three levels are used:

1. Bootstrap columns change by breakpoint.
2. Custom media queries change Grid/Flexbox layouts.
3. Fluid sizes such as `clamp()` keep headings readable.

Important media queries:

```css
@media (max-width: 991.98px) { ... }
@media (max-width: 767.98px) { ... }
@media (max-width: 575.98px) { ... }
```

Example:

```css
@media (max-width: 767.98px) {
    .answer-list {
        grid-template-columns: 1fr;
    }
}
```

This changes two answer columns into one column on smaller screens.

## 8. How the quiz works

Questions are stored in the `quizData` object in `js/script.js`.

Main functions:

- `startQuiz(topic)` — resets score, timer and opens a selected topic
- `renderQuestion()` — shows the current question and answer buttons
- `chooseAnswer(index)` — checks the selected answer
- `nextQuestion()` — moves to the next question
- `finishQuiz(timeExpired)` — calculates XP and shows the result
- `getAchievement(points)` — chooses a badge from the score
- `refreshSavedProgress()` — displays saved best scores and XP

## 9. Why HTML answers display correctly

The HTML/CSS quiz contains answers such as `<h1>` and `<p>`.

We do **not** insert answer text with `innerHTML`. Instead:

```js
const answerText = document.createElement("span");
answerText.textContent = answer;
```

Simple answer:

> `textContent` displays `<h1>` as visible text instead of interpreting it as a real HTML heading tag.

## 10. How timer works

At the start:

```js
secondsLeft = 60;
```

Then `setInterval()` reduces it every second.

When it reaches zero:

```js
finishQuiz(true);
```

## 11. How score and XP work

Each correct answer:

```js
score += 1;
```

At the end:

```js
const xp = score * 20;
```

Maximum: `5 × 20 = 100 XP`.

## 12. What localStorage does

`localStorage` stores small values in the browser.

We save:

- best Java score
- best Python score
- best HTML/CSS score
- total earned XP

Example:

```js
localStorage.setItem("codequiz-total-xp", String(currentTotalXp + xp));
```

The data stays after page refresh on the same browser.

## 13. What the Random Challenge button does

It selects one of the three topic names and opens `quiz.html` with a query parameter:

```js
window.location.href = `quiz.html?topic=${topic}`;
```

Then the Quiz page reads the parameter with `URLSearchParams` and starts that topic.

## 14. How the contact form works

HTML attributes provide basic validation:

- `required`
- `type="email"`
- `minlength`
- `maxlength`

JavaScript prevents a real server request and shows a demo success message.

## 15. Accessibility details

Examples:

- semantic HTML
- `aria-label` where needed
- `aria-live` for changing quiz content
- visible `:focus-visible` outline
- skip link
- `prefers-reduced-motion` support
- buttons use real `<button>` elements

## 16. Class vs ID

> A class can be reused on multiple elements. An ID should be unique on the page and is useful for JavaScript or a specific section.

## 17. Margin vs padding

> Margin is space outside an element. Padding is space inside an element.

## 18. Easy live changes the instructor may ask for

### Change the main accent color

In `css/style.css`:

```css
--cyan: #5ee7f2;
```

Change it to another color.

### Make the main title smaller

Find:

```css
.display-title
```

Change its `font-size`.

### Change quiz timer from 60 to 30 seconds

Find in `js/script.js`:

```js
secondsLeft = 60;
```

Change `60` to `30`.

### Make quiz answers one column on desktop

Find:

```css
.answer-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

Change to:

```css
.answer-list {
    grid-template-columns: 1fr;
}
```

### Add one new quiz question

Inside a topic in `quizData`, add:

```js
{
    question: "Your question?",
    answers: ["A", "B", "C", "D"],
    correct: 0,
    explanation: "Short explanation."
}
```

If you add more than five questions, also update any page text that says “five questions”.

## 19. Team pages

Kassymkhan:

- `about.html`
- `contact.html`

Darkhan:

- `index.html`
- `quiz.html`

## 20. Final defense reminder

Be ready to:

1. Open the hosted website.
2. Open the code.
3. Show HTML, CSS, Flexbox, Grid and Bootstrap examples.
4. Explain the quiz logic.
5. Make one small CSS or JavaScript change live.
6. Refresh the website and show the change.
