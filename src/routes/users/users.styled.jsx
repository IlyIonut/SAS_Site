import styled from "styled-components";

export const UsersPageContainer = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    place-content: center;
    flex-wrap: wrap;
    flex-direction: column;
`


export const UsersContainer = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
align-content:flex-center;
gap:20px;
margin-top:40px;
`
// export const Row = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   margin-right: -15px;
//   margin-left: -15px;
// `;

// export const Column = styled.div`
//   position: relative;
//   width: 100%;
//   min-height: 1px;
//   padding-right: 15px;
//   padding-left: 15px;
// `;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  align-content:space-around;
  width: 100%;
`;

export const Input = styled.input`
    width:180px;
    font-size:16px;
    margin-left:20px;
    padding:12px 0;
    border-radius: 20px;
    outline:none;
`

export const SearchBox = styled.div`
  padding-top: 50px;
  border-radius: 9999px;
  border-color: black;
`;

export const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropdownToggle = styled.button`
    background-color: #04aa6d;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;

  &:hover + ${DropdownMenu} {
    display: block;
  }

  &:focus + ${DropdownMenu} {
    display: block;
  }
`;

export const DropdownMenuItem = styled.li`
  padding: 3px 20px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const DropdownMenuItemLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
`;

export const SelectMenu = styled.select`
   appearance: none;
   border: 0;
   outline: 0;
   font: inherit;
   /* Personalize */
   width: 16em;
   height: 3em;
   padding: 0 4em 0 1em;
   color: grey;
   border-radius: 0.25em;
   box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
   cursor: pointer;
 `
 
export const OptionMenu = styled.option`
   padding:0 30px 0 10px;
   min-height:40px;
   display:flex;
   align-items:center;
   background:white;
   border-top:#222 solid 1px;
   position:absolute;
   top:0;
   width: 100%;
   pointer-events:none;
   order:2;
   z-index:1;
   transition:background .4s ease-in-out;
   box-sizing:border-box;
   overflow:hidden;
   white-space:nowrap;
   
   &:hover {
   background:#666;
 }
 `