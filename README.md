# Ubiquiti Home Assignment

By Arturs Kurzemnieks <arturs.kurzemnieks@gmail.com>

## User stories implemented

- I as a user can create to-do items, such as a grocery list
- I as another user can collaborate in real-time with user - so that we can (for example) edit our family shopping-list together
- I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on things that are still pending
- I as a user can filter the to-do list and view items that were marked as done - so that I can retrospect on my prior progress
- I as a user can see the cursor and/or selection of another-user as he selects/types when
he is editing text - so that we can discuss focused words during our online call


## Notes

A few additional user stories were planned but left half-way there as time was short.
- Multiple to-do lists can be created, designed that way from the beginning, didn't implement unique URLs. 
- Data is stored in an object on the server-side posing as fake "database". Could quite easily add Mongo or something to keep the todos persisted for real after server restarts.
- Freeze/unfreeze was also planned along with multiple to-do lists, user system already in place. Need to add owner ID to each todo list and some freezed/accessible state.

If there are any questions, please feel free to ask. I operated on the mindset that for a task
like this it's better to do things from scratch and leave some rough edges than to import lots of ready-made stuff.

![App screenshot](todoquiti-screenshot.jpg?raw=true "App screenshot")


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
