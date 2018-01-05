<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project we will take a look at an employee management application and learn how it works. We will cover the following topics, found below in the list, by going through each project stage and building out a part of the application.

* State
* Props
* JavaScript Classes
* .bind
* this
* componentWillReceiveProps ( React life cycle method )

We can control which stage we are on by using `index.js` in the `src/` directory. On line 3 in `src/index.js` you should see:

```js
import App from './Stage 1/App';
```

We can change stages by changing the number in the string. For example if I wanted stage 2, I would do: 

```js
import App from './Stage 2/App';
```

<b> It's imperative to change the stage number in `src/index.js` when moving from stage to stage in this README! </b>

Also, in this project the stages will build on top of each other. Every stage will have you repeat the process of the last stage(s). Try to do the previous stage(s) steps from memory if possible and re-visit their detailed instructions if you get lost. Files containing the solution can be found on the <a href="https://github.com/DevMountain/react-2-afternoon/tree/solution/src">solution branch</a>. 

<br />

# Live Example

<a href="https://devmountain.github.io/react-2-afternoon/">Click Me!</a>

<img src="https://github.com/DevMountain/react-2-afternoon/blob/solution/readme/1.png" />

## Setup

* `Fork` and `clone` this repository
* Run `npm install` in the root directory
* Run `npm start` to spin up a development server ( keep the development server running to debug stages )

## Stage 1

### Summary

In this stage we will fix context issues using `.bind` and `this`. If we inspect our application, we can see that when we try to interact with the components nothing is working correctly and we are getting an error that `this.setState` is not a function.

### Instructions

Using the browser's developer tools, figure out where `.bind` needs to be applied in `App.js` and `EmployeeEditor.js`.

<details>

<summary> Detailed Instructions </summary>

<br />

* Open `src/Stage 1/App.js`.
* Open `src/Stage 1/components/EmployeeEdtior.js`.

The first error that you should encounter is when clicking on an employee. This error is happening when the `selectEmployee` method on `App` gets called from the `employeeList` component. What's happening here? We're losing our context of `this`. 

First let's cover the data flow to figure out why our context is getting lost. Inside of `App.js` we can see on line 31 we are rendering in our `EmployeeList` component with two props. One of those props being our `selectEmployee` method on `App`. This means that inside of the `employeeList` component it can access the method through `this.props.selectEmployee`. We are then using the `selectEmployee` prop on line 11 in `EmployeeList.js` in combination with an `onClick` event. 

Because of this current setup when the `selectEmployee` method gets called from the `employeeList` component `this` does not refer to the `App` class which has a `setState` method. `this` refers to the props on the `EmployeeList` component. We can prove that by adding a `console.log(this)` before `this.setState({})` gets called in the `selectEmployee` method. The log should look similiar to:

```js
{
  employees: [],
  selectEmployee: function
}
```

So if the `App` component has the method of `setState` how can we keep our context of `this` when calling the method in `EmployeeList`? We can `bind` it when the context of `this` equals the `App` component. In `App.js` at the bottom of the `constructor` method we can `bind` `this` to our class method.


```jsx
constructor() {
  super();
  this.state = {
    employees: [ new Employee(0, 'Bernice Ortiz', 4824931093, 'CEO'), new Employee(1, 'Marnie Barnett', 3094812387, 'CTO'), new Employee(2, 'Phillip Weaver', 7459831843, 'Manager'), new Employee(3, 'Teresa Osborne', 3841238745, 'Director of Engineering'), new Employee(4, 'Dollie Berry', 4873459812, 'Front-End Developer'), new Employee(5, 'Harriett Williamson', 6571249801, 'Front-End Developer'), new Employee(6, 'Ruby Estrada', 5740923478, 'Back-End Developer'), new Employee(7, 'Lou White', 8727813498, 'Full-Stack Developer'), new Employee(8, 'Eve Sparks', 8734567810, 'Product Manager'), new Employee(9, 'Lois Brewer', 8749823456, 'Sales Manager') ],
    selectedEmployee: null
  };

  this.selectEmployee = this.selectEmployee.bind( this );
}
```

Now our `selectEmployee` method should be working properly and updating the `EmployeeEditor` component on the right.

The next error we should encounter is that the `save` and `cancel` buttons in the `EmployeeEditor` component are not working. Based on the error message in the browser debugger, it appears that `this` is equal to `null` when inside of the `save` and `cancel` methods. Since state exists on the component, we want to use `bind` when `this` equals the component. Just like with the `selectEmployee` method we can `bind` `this` to the `save` and `cancel` methods at the bottom of the `constructor` method in the `EmployeeEditor` component.

```jsx
constructor() {
  super();
  this.state = {
    employee: null,
    originalEmployee: null,
    notModified: true
  };

  this.save = this.save.bind( this );
  this.cancel = this.cancel.bind( this );
}
```

This will fix our `cancel` button context issue however you'll notice that `save` still has a context issue. This is because it calls a method passed down as a prop called `refreshList`. `refreshList` handles updating the `EmployeeList` names on the left hand side. If we add a `console.log(this)` in the `refreshList` method we'll see it has a similiar issue of `this` referring to the object of props. If we `.bind` `this` to the method at the bottom of the `constructor` method in `App.js`, just like we did for `selectEmployee`, then `this` will have the correct context.

```jsx
constructor() {
  super();
  this.state = {
    employees: [ new Employee(0, 'Bernice Ortiz', 4824931093, 'CEO'), new Employee(1, 'Marnie Barnett', 3094812387, 'CTO'), new Employee(2, 'Phillip Weaver', 7459831843, 'Manager'), new Employee(3, 'Teresa Osborne', 3841238745, 'Director of Engineering'), new Employee(4, 'Dollie Berry', 4873459812, 'Front-End Developer'), new Employee(5, 'Harriett Williamson', 6571249801, 'Front-End Developer'), new Employee(6, 'Ruby Estrada', 5740923478, 'Back-End Developer'), new Employee(7, 'Lou White', 8727813498, 'Full-Stack Developer'), new Employee(8, 'Eve Sparks', 8734567810, 'Product Manager'), new Employee(9, 'Lois Brewer', 8749823456, 'Sales Manager') ],
    selectedEmployee: null
  };

  this.selectEmployee = this.selectEmployee.bind( this );
  this.refresh = this.refresh.bind( this );
}
```

</details>

## Stage 2

In this stage we will re-create our `componentWillReceiveProps` life cycle method in the `EmployeeEditor` component. This life cycle method handles updating our `state` in `EmployeeEditor.js` when the `selected` prop gets updated from the `EmployeeList` component.

### Instructions

Create a `componentWillReceiveProps` method in `EmployeeEditor.js` that has one parameter: `props`. The method should be written after the `constructor` method and will update the following `state` properties using `setState`: `employee`, `originalEmployee`, and `notModified`. `employee` should be updated to a copy of the `selected` object from `props`, `originalEmployee` should be updated to the `selected` object from `props`, and `notModified` should be updated to `true`.

<details>

<summary> Detailed Instructions </summary>

<br />

Open `EmployeeEditor.js` from `src/Stage 2/components/EmployeeEditor.js` and look for the `//componentWillReceiveProps` comment. Let's create our `componentWillReceiveProps` method there with one parameter called `props`.

```jsx
componentWillReceiveProps(props) {

}
```

This life cycle method will be called whenever the `props` for `EmployeeEditor` get updated after the initial render. We'll use the parameter `props` to catch the updated props object and use it with `this.setState` to update our state. Remember that we want to update `employee` and `originalEmployee` on state with the `selected` prop and update `notModified` to `true`. We also want to make sure that `employee` is a copy of the `selected` object. Since our `EmployeeEditor` component is only rendered with two `props`, our `props` parameter in `componentWillReceiveProps` will look like: 

```js
{
  selected: { } // This is an object of 1 employee ( the one that was selected from the list )
  refreshList: function // This is a method from App.js that will refresh the list of employees
}
```

Let's dive into why we are using `employee` and `originalEmployee`, or in other words why a copy and a original of the same object. In JavaScript, if I set a variable equal to an already defined object they both reference the same object. For example:

```js
var obj1 = {
  name: 'James'
}

var obj2 = obj1;
obj2.name = 'Override';

console.log(obj1.name); // 'Override'
```

Even though I created a new variable, `obj2` and changed the `name` property on `obj2`, `obj2` and `obj1`'s `name` property was updated to `'Override'`. This would be bad for an `onChange` event that updates a state property every time a user types because we don't want changes to be final until the user presses the `Save` button. To get around this issue, we can use `Object.assign()` to make a copy of an object into a new object; effectively separating the two. 

```js
var obj1 = {
  name: 'James'
}

var obj2 = Object.assign({}, obj1);
obj2.name = 'Override';

console.log(obj1.name); // 'James'
```

There is a down side to `Object.assign` in this scenario however, which is why we are also using a state property called `originalEmployee`. When using `Object.assign`, we only get a copy of the properties on the object but not the `prototypes`. We will need those `prototypes` for a later stage so we'll just use `originalEmployee` to store the original object. As a bonus, since we have an original copy of the object, canceling changes is as easy as setting `employee` equal to a copy of `originalEmployee`.

So getting back to the problem at hand, our `componentWillReceiveProps` method. Let's use `this.setState` to update `employee` to be a copy of `props.selected`, `originalEmployee` to be `props.selected`, `notModified` to be true. We reset `notModified` to true so when a user selects a new employee the Save and Cancel button wont be enabled until they make a change again.

```js
componentWillReceiveProps(props) {
  this.setState({ employee: Object.assign({}, props.selected), originalEmployee: props.selected, notModified: true });
}
```

</details>

## Stage 3

### Summary

In this stage we will re-create our `handleChange` method in `EmployeeEditor.js`.

### Instructions

Create a `handleChange` method on the `EmployeeEditor` component that takes in what property to change and what value to give that property as parameters. Also we want to update `notModified` on state from `true` to `false` since a modification has occured. 

<details>

<summary> Detailed Instructions </summary>

<br />

Open `EmployeeEditor.js` in `src/Stage 3/components/EmployeeEditor.js` and look for the `// handleChange` comment. Let's create the skeleton of the method there.

```jsx
handleChange(prop, val) {

}
```

In this method, we'll want to change the `notModified` property on state from `true` to `false`. When we update `notModified` to `false` the Save and Cancel buttons will no longer be disabled ( allowing a user to click on them ). We also only need to update this property if it is `true`, so let's add an if statement to wrap our `setState` call.

```jsx
handleChange(prop, val) {
  if ( this.state.notModified ) {
    this.setState({ notModified: false })
  }
}
```

Next, we'll want our method to update the `employee` object on state, we should never mutate state directly so we'll have to make a copy of our `employee` property on state before modifying it and finally updating it with `this.setState`. Lets create a variable called `employeeCopy` that equals a copy of the `employee` property on state.

```jsx
handleChange(prop, val) {
  if ( this.state.notModified ) {
    this.setState({ notModified: false })
  }

  var employeeCopy = Object.assign({}, this.state.employee);
}
```

We can then use bracket notation to take our string, `prop`, to access that property on the `employeeCopy` object and update its value with `val`.

```jsx
handleChange(prop, val) {
  if ( this.state.notModified ) {
    this.setState({ notModified: false })
  }

  var employeeCopy = Object.assign({}, this.state.employee);
  employeeCopy[prop] = val;
}
```

Then to update state is as easy as updating `employee` to our `employeeCopy` variable.


```jsx
handleChange(prop, val) {
  if ( this.state.notModified ) {
    this.setState({ notModified: false })
  }

  var employeeCopy = Object.assign({}, this.state.employee);
  employeeCopy[prop] = val;
  this.setState({ employee: employeeCopy });
}
```

</details>

## Stage 4

### Summary

In this stage we will re-create our `Employee` model in `Employee.js`. 

### Instructions

Create a class called `Employee` in `src/Stage 4/models/Employee.js`. This class should have a constructor method that takes an `id`, `name`, `phone`, and `title` parameter. It should then assign those onto the class. This class should also have three methods: `updateName`, `updatePhone`, and `updateTitle`. Each method will take in a string as a parameter and then update the corresponding property on the class with the string.

<details>

<summary> Detailed Instructions </summary>

<br />

Open `Employee.js` in `src/Stage 4/models/Employee.js`. We'll start by adding our `constructor` method where the `// constructor` comment is. This method gets called when a `new Employee` class is created. We'll be making new employees with four items. An `id`, a `name`, a `phone`, and a `title`. Therefore we'll want to make a `constructor` method with four parameters to capture those items.

```js
constructor(id, name, phone, title) {
  
}
```

Then we can assign them to the class by using `this`. 

```js
constructor(id, name, phone, title) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.title = title;
}
```

Now all we need are three methods, one to update the `name`, one to update the `phone`, and one to update the `title`. For simplicity, I broke these out into three methods, they'll be very similiar to each other. All three methods will take in a `string` parameter and then update the corresponding property on the class to that `string`. 

```js
constructor(id, name, phone, title) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.title = title;
}

updateName(name) {
  this.name = name;
}

updatePhone(phone) {
  this.phone = phone;
}

updateTitle(title) {
  this.title = title;
}
```

</details>

## Stage 5

### Summary

In this stage we will re-create our `save` and `cancel` methods in the `EmployeeEditor` component.

### Instructions

Create a `save` method after the `handleChange` method that calls all three `update` methods on the `Employee` model. Remember that `originalEmployee` has access to the methods and `employee` doesn't because it is a copy. Use the values on `state` when calling the `update` methods. This method should also set `notModified` on state to `true` and finally call the `refreshList` method off of props. Then create a `cancel` method after the `save` method that updates `employee` to a copy of the `originalEmployee` and updates `notModified` to `true` on state. 

<details>

<summary> Detailed Instructions </summary>

<br />

Open `EmployeeEditor.js` in `src/Stage 5/components/EmployeeEditor.js`. Let's begin with our `save` method. Look for the `// save` comment and let's create our `save` method skeleton. 

```js
save() {

}
```

In this `save` method, we will want to use the `prototypes` on the `Employee` class to update our values. Since there are only three properties to update let's just call all three update methods regardless of which one has changed. It would be more code to check which one to update. 

```js
save() {
  this.state.originalEmployee.updateName(this.state.employee.name);
  this.state.originalEmployee.updatePhone(this.state.employee.phone);
  this.state.originalEmployee.updateTitle(this.state.employee.title);
}
```

Then we'll need to set `notModified` back to `true` since we have now updated that employee and no modifications have happened since saving. We'll also need to call `refreshList` so that our `EmployeeList` will re-render with the name change if there is one.

```js
save() {
  this.state.originalEmployee.updateName(this.state.employee.name);
  this.state.originalEmployee.updatePhone(this.state.employee.phone);
  this.state.originalEmployee.updateTitle(this.state.employee.title);
  this.setState({ notModified: true });
  this.props.refreshList();
}
```

Now let's create our cancel method skeleton where the `// cancel` comment is.

```js
cancel() {

}
```

In this method, we'll want to make a copy of the `originalEmployee` property on state and assign it to a variable. Then we'll use `setState` to update our `employee` with the new variable we just made and also set `notModified` to `true`.

```js
cancel() {
  var employeeCopy = Object.assign({}, this.state.originalEmployee);
  this.setState({ employee: employeeCopy, notModified: true });
}
```

</details>

## Stage 6

### Summary

In this stage we will re-create our `selectEmployee` and `refresh` methods on the `App` component.

### Instructions

Create a `selectEmployee` method after the `constructor` method that takes an `employee` as a parameter. The method should then use `setState` to update the `selectedEmployee` property on state to the passed in `employee`. Then create a `refresh` method after the `selectedEmployee` method. This method should just call `setState` with the argument of `this.state`.

<details>

<summary> Detailed Instruction </summary>

<br />

Open `App.js` in `src/Stage 6/`. Let's begin with the `selectEmployee` method, look for the `// selectEmployee` comment and let's create the skeleton of our method. This method will have one parameter being the object of the employee that was selected.

```js
selectEmployee(employee) {

}
```

All we need this method to do is update the `selectedEmployee` property on state. We'll do that by using `this.setState`.

```js
selectEmployee(employee) {
  this.setState({ selectedEmployee: employee });
}
```

Next let's create the skeleton of our `refresh` method. Look for the `// refresh` comment.

```js
refresh() {

}
```

This method is another simple one that will refresh our state, effectively updating all our components, by calling `this.setState` and passing in the current state as the object. Since we are updating our employees using methods on their class our state does not automatically trigger a re-render. 

```js
refresh() {
  this.setState(this.state);
}
```

</details> 

## Stage 7

### Summary

In this stage we will re-create our `constructor` methods and state in `App.js` and `EmployeeEditor.js`.

### Instructions

Create a `constructor` method that calls `super();` and creates an empty state object ( `this.state = {}` ) in both `App.js` and `EmployeeEditor.js`. Then use the bullet lists to fill in the state properties:

<b> State properties for `App.js` </b>
* employees: ( code snippet below )
* selectedEmployee: null

<details>

<summary> <code> employees array </code> </summary>

```js
[ new Employee(0, 'Bernice Ortiz', 4824931093, 'CEO'), new Employee(1, 'Marnie Barnett', 3094812387, 'CTO'), new Employee(2, 'Phillip Weaver', 7459831843, 'Manager'), new Employee(3, 'Teresa Osborne', 3841238745, 'Director of Engineering'), new Employee(4, 'Dollie Berry', 4873459812, 'Front-End Developer'), new Employee(5, 'Harriett Williamson', 6571249801, 'Front-End Developer'), new Employee(6, 'Ruby Estrada', 5740923478, 'Back-End Developer'), new Employee(7, 'Lou White', 8727813498, 'Full-Stack Developer'), new Employee(8, 'Eve Sparks', 8734567810, 'Product Manager'), new Employee(9, 'Lois Brewer', 8749823456, 'Sales Manager') ]
```

</details>

<br />

<b> State properties for `EmployeeEditor.js` </b>
* employee: null
* originalEmployee: null
* notModified: true

<details>

<summary> Detailed Instructions </summary>

<br />

* Open `App.js` ( `src/Stage 7/` )
* Open `EmployeeEditor.js` ( `src/Stage 7/components/EmployeeEditor.js` )

In `App.js` look for the `// constructor` comment a create the skeleton for the `constructor` method. Remember it should call `super()` and then create an empty `state` object.

```js
constructor() {
  super();
  this.state = {

  };
}
```

Then using the bullet list above we can add our properties we need to state.

```js
constructor() {
  super();
  this.state = {
    employees: [ new Employee(0, 'Bernice Ortiz', 4824931093, 'CEO'), new Employee(1, 'Marnie Barnett', 3094812387, 'CTO'), new Employee(2, 'Phillip Weaver', 7459831843, 'Manager'), new Employee(3, 'Teresa Osborne', 3841238745, 'Director of Engineering'), new Employee(4, 'Dollie Berry', 4873459812, 'Front-End Developer'), new Employee(5, 'Harriett Williamson', 6571249801, 'Front-End Developer'), new Employee(6, 'Ruby Estrada', 5740923478, 'Back-End Developer'), new Employee(7, 'Lou White', 8727813498, 'Full-Stack Developer'), new Employee(8, 'Eve Sparks', 8734567810, 'Product Manager'), new Employee(9, 'Lois Brewer', 8749823456, 'Sales Manager') ],
    selectedEmployee: null
  };
}
```

Now let's do the same exact steps for `EmployeeEditor.js`

```js
constructor() {
  super();
  this.state = {
    employee: null,
    originalEmployee: null,
    notModified: true
  };
}
```

</details>

## Stage 8

In this stage we will `render` our child components in `App.js`.

### Instructions

Import the `Header`, `EmployeeList`, and `EmployeeEditor` components into `App.js`. Then `render` the `Header` component nested under the `div` with the `id` of `app` and `render` the `EmployeeList` and `EmployeeEditor` components nested under the `div` with the `id` of `main-container`. 

<details>

<summary> Detailed Instructions </summary>

<br />

In `src/Stage 8/App.js` let's begin by importing our three components. Based on the file structure inside of stage 8, we can see there is a components folder at the same level of `App.js`. Therefore, we will be importing our components from `'./components/'`. Let's `import` our components in `App.js` where it says `// Components`.

```jsx
import Header from './components/Header/Header';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor/EmployeeEditor';
```

Now that `App.js` has access to these components, we can then `render` them. Let's `render` the `Header` component nested inside of the `div` with the `id` of `app`. And `render` the `EmployeeList` and `EmployeeEditor` component nested in the `div` with the `id` of `main-container`.

```jsx
return (
  <div id="app">
    <Header />
    <div className="main-container">
      <EmployeeList />
      <EmployeeEditor />
    </div>
  </div>
)
```

Now we need to add the `props` so our child components can still function correctly. For `EmployeeList` to function correctly, it will need two props: `employees` and `selectEmployee`. `employees` should equal the array of employees kept on state in `App.js` and `selectEmployee` should equal the method on `App.js` that calls `setState` to update the selected employee.

```jsx
return (
  <div id="app">
    <Header />
    <div className="main-container">
      <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
      <EmployeeEditor />
    </div>
  </div>
)
```

For `EmployeeEditor` to function correctly it will need two props: `selected` and `refreshList`. `selected` should equal the `selectedEmployee` property on `App.js`'s state and `refreshList` should equal the method on `App.js` that calls `setState(this.state)`.

```jsx
return (
  <div id="app">
    <Header />
    <div className="main-container">
      <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
      <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh.bind(this) } />
    </div>
  </div>
)
```

</details>

## Stage 9

### Summary

In this stage we will `render` our list of employees in the `EmployeeList` component by mapping over the prop `employees`.

### Instructions

Map over `this.props.employee` to return `<li>` elements. Use the `id` of the employee as the `key` for the element, add an `onClick` to each `<li>` to call `selectEmployee` with the current employee as an argument, and set the text value of the `<li>` to the `name` of the employee. Also add the `className` of `listText` to each `<li>` element.

<details>

<summary> Detailed Instructions </summary>

<br />

Open `EmployeeList.js` from `src/Stage 9/components/EmployeeList.js` and look for the `// Map over this.props.employees` comment. 

```jsx
<ul className="listContainer">
  { 
    // Map over this.props.employees
  }
</ul>
```

Let's remove the comment and make the skeleton for our mapping. Let's call the parameter for the mapping's callback function `employee` and `return` nothing.

```jsx
<ul className="listContainer">
  { 
    this.props.employees.map((employee) => {
      return (

      )
    })
  }
</ul>
```

Now each item in the `this.props.employee` array will be referenced in our callback function as `employee` and we can add JSX inside of our return. Let's have our callback return a `<li>` element that has a `key` attribute equal to the `employee.id` and `className` of `listText`. 

```jsx
<ul className="listContainer">
  { 
    this.props.employees.map((employee) => {
      return (
        <li className="listText" key={employee.id}></li>
      )
    })
  }
</ul>
```

We'll also want to add an `onClick` attribute that uses an arrow function that calls the `selectEmployee` method from props with the current `employee`. 

```jsx
<ul className="listContainer">
  { 
    this.props.employees.map((employee) => {
      return (
        <li className="listText" key={employee.id} onClick={ () => { this.props.selectEmployee(employee) }}></li>
      )
    })
  }
</ul>
```

And finally we want the text of the `<li>` element to be the name of the `employee`.

```jsx
<ul className="listContainer">
  { 
    this.props.employees.map((employee) => {
      return (
        <li className="listText" key={employee.id} onClick={ () => { this.props.selectEmployee(employee) }}> { employee.name } </li>
      )
    })
  }
</ul>
```

</details>

## Black Diamond ( Stage 10 )

Re-create the project from Stages 1 - 9 without looking back at code solutions. If you have to look back at a certain stage, restart from Stage 1 again.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>