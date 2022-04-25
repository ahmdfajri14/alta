import gql from "graphql-tag";

export const GET_LIST_TODO = gql`
  query {
    todolist_todo {
      id
      text
      is_done
    }
  }
`;
