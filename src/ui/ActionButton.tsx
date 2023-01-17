import styled from 'styled-components';

const buttonStyle = `
position: relative;
width: 240px;
height: 42px;
padding: 4px;
border: 1px solid #eee;
color: #333;
font-weight: 500;
background-color: #fff;
border-radius: 4px;
font-size: 16px;

text-decoration: none;

display: flex;
align-items: center;
text-align: center;
margin-right: 16px;

:hover {
  background-color: #ddd;
  cursor: pointer;
}

:disabled {
  background-color: #ccc;
}
`;

const ActionButton = styled.button`
  ${buttonStyle}
`;

const Anchor = styled.a`
  ${buttonStyle}
`;

const Image = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;

export default Object.assign(ActionButton, { Image, Anchor });
