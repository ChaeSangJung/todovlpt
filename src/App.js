import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import Counter from "./components/Counter";
import CountUser from "./components/CountUser";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <div style={{display: "none"}}>
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead />
          <TodoList />
        </TodoTemplate>
      </div>
      <Counter />
      <CountUser />
    </>
  );
}

export default App;