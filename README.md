# Cocktell - Search Cocktail Recipe

This is the final project "Forkify" of [The Complete JavaScript Course 2022: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/). This course solidify my understanding on different JavaScript concepts (e.g. DOM, Mordern OOP, Asynchronous JS and Modern tools for JS) and gives me useful exercises and realistic project to improve my coding skills.

The project "Cocktell" is project to practice Asynchronous JS, OOP, Error Handling and other tools such as NPM, Parcel and Git. The appllication incorporate search function, a user can search for diffent cocktail recipes by cocktail name or ingredient. The user can then view the recipe details, change servings and bookmark a recipe. The user can also upload a self-generated recipe to the API.

The project consumes data from [CocktailDB API](https://www.thecocktaildb.com/api.php).

![screenshoot](Screenshot-Cocktell.png?raw=true)

## Overview

### The challenge

Users should be able to:

- Search for recipe by name or ingredient
- Search for recipe and view the results on Pagination area
- Navigate the search results and view results in pages
- View a recipe in the Recipe area when they click on a preview in the Pagination area
- Change servings of the menu and view immediate change in the quantity of ingredient
- Bookmark recipes and view bookmarked recipes in the Bookmark view
- Upload user-generated recipes to the API
- Load bookmarks and user-generated recipes when they reload the page

### Links

- Live Site URL: [Forkify Netlify](https://forkify-isaactangky.netlify.app/)

## My process

### Built with

- AJAX, fetch API
- DOM Manipulation
- Error handling and error message rendering
- Model-View-Controller Architecture
- OOP
- Publisher/Subcriber Pattern
- [Fracty](https://www.npmjs.com/package/fracty) - npm
- [Parcel](https://parceljs.org/)

### What I learned

The **MVC architecture** is the most important concept I learned in the project. I was amazed by how this help to clearify the structure of the projects. From my understanding, model helps to deal with the business logic and state, Controller calls the actual functions and View components accept user input and render information to the user. This architecture help to increase the maintainability and expandibility of the codes. I look forward to exploring more on this architecture and other architecture concepts.

The **Publish-subcribe pattern** is a useful solution to add EventListener to views. Under the MVC architecture, the eventListener should be added in the View component, and corresponding callback functions are defined in Controller. Since the handler should not be defined in the View, we define funtions to accept handlers from contraller:

```js
addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault() // cannot call handler directly
      handler();
    });
  }
```

and call the addHandler methods at page load. By applying the pattern, we do not need to add event listeners in the controller, which means that we can maintain the MVC structure.

The **Algorithm to Update the DOM** was also good lesson to me. I was also frustrated by the that the whole page has to be reloaded even when I change only one component in the DOM. Janas' algorithm creates a virtual DOM fragment containing the new elements, compares the existing DOM and new elements, updates the element text content and attribute only when there are any changes. This algorithm prevent the whole page reloading and flashing. This algorithm is useful in reducing the page loads and improving user experience.

**Error Handling**

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

New features to be implements

- displaying no of pages at the bottom of Pagination area
- sort search results by duration / num of ing
- perform ingredient input validation
- improve recipe ingredient input

- shopping list feature

- Weekly meal planning feature

- Get nutrition data from food-api

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

All html and CSS designs are credited to Jonas Schmedtmann.

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
