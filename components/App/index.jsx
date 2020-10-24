import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import { filterListHelper } from './filterListHelper.jsx'
import hoistNonReactStatic from 'hoist-non-react-statics'
import axios from 'axios'

import './app.scss'

function ShowEmployeeSalaryDetails(props) {
  console.log('show employee Salary', props)
  return (
    <div>
      <div>Employee Age:{props.employ.age} </div>
    </div>
  )
}

function ShowEmployeeBasicDetails(props) {
  console.log('show employee Basic', props)
  return (
    <div>
      <div>Employee Name:{props.employ.name} </div>
    </div>
  )
}
function ChildrenRender(props) {
  console.log('children', props)
  return (
    <div>
      <div>Children:{props.children} </div>
    </div>
  )
}

function RandomArticlesDetails(props) {
  console.log('random articles', props.data[0]?.title)
  return (
    <div>
      {/* <strong>Random Articles:</strong> */}
      {props.data &&
        props.data?.map((a, b) => {
          return (
            <li key={b} style={{ listStyle: 'none' }}>
              {a.title}
            </li>
          )
        })}
    </div>
  )
}

const getEmployeeData = () => {
  return {
    name: 'Mayank',
    age: 30,
    designation: 'Developer',
    salary: 30000,
    bonus: 2000,
  }
}

var HigherOrderComponent = (WrappedComponent) => {
  class EmployeeComponents extends React.Component {
    constructor() {
      super()
      this.state = { employ: getEmployeeData(), data: '' }
    }

    async componentDidMount() {
      let articles = await axios(`https://jsonmock.hackerrank.com/api/articles`)
      console.log('articles', articles.data.data)
      this.setState({
        data: articles.data.data,
      })
      // console.log("pages", this.state);
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.state}>
            children of the wrapped component
          </WrappedComponent>
        </div>
      )
    }
  }
  return hoistNonReactStatic(EmployeeComponents, WrappedComponent)
}

var EmployeeBasicDetails = HigherOrderComponent(ShowEmployeeBasicDetails)

var EmployeeSalaryDetails = HigherOrderComponent(ShowEmployeeSalaryDetails)

var RandomArticles = HigherOrderComponent(RandomArticlesDetails)

var Children = HigherOrderComponent(ChildrenRender)

ReactDOM.render(
  <div>
    <h2>Employee Basic Details Component:</h2>
    <EmployeeBasicDetails />
    <br></br>
    <h2>Employee Salary Details Component:</h2>
    <EmployeeSalaryDetails />
    <h2>Random Articles:</h2>
    <RandomArticles />
    <h2>Children:</h2>
    <Children />
  </div>,
  document.getElementById('mount')
)
