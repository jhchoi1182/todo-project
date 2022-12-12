import React from "react";
import {
  deleteTodo,
  toggleStatusTodo,
} from "../../../redux/modules/todosSlice.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ListOfList = ({ todo, backgroundColor, borderColor }) => {
  const dispatch = useDispatch();
  const onDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const onToggleStatusTodo = (id) => {
    dispatch(toggleStatusTodo(id));
  };
  return (
    <StTodoContainer
      borderColor={borderColor}
      backgroundColor={backgroundColor}
    >
      <StLink to={`/${todo.id}`} key={todo.id}>
        <div>상세보기</div>
      </StLink>
      <div>
        <h2 className="todo-title">{todo.title}</h2>
        <div>{todo.body}</div>
      </div>
      <StDialogFooter>
        <StButton borderColor="red" onClick={() => onDeleteTodo(todo.id)}>
          삭제하기
        </StButton>
        <StButton
          borderColor="green"
          onClick={() => onToggleStatusTodo(todo.id)}
        >
          {todo.isDone ? "취소" : "완료"}
        </StButton>
      </StDialogFooter>
    </StTodoContainer>
  );
};

const StTodoContainer = styled.div`
  width: 330px;
  height: 180px;
  border: 4px solid ${({ borderColor }) => borderColor};
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: teal;
  display: flex;
  justify-content: right;
`;

const StDialogFooter = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 12px;
  margin-top: 24px;
`;

const StButton = styled.button`
  border: 2px solid ${({ borderColor }) => borderColor};
  font-size: 13px;
  height: 40px;
  width: 50%;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

export default ListOfList;
