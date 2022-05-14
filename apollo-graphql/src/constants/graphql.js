import gql from "graphql-tag";

export const GET_ANGGOTA_QUERY = gql`
  query MyQuery {
    anggota {
      id
      nama
    }
  }
`;

// export const MUTATE_ANGGOTA = gql`
//   mutation MyMutation {
//     insert_anggota(objects: {nama: "Tono"}) {
//       returning {
//         id
//         nama
//       }
//     }
//   }
// `;
// export const FRAGMENT_ANGGOTA = gql`
// fragment list on List {
//     id
//     nama
// }
// `
