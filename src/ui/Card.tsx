import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  width: calc(100% - 64px);
  max-width: 700px;
  margin: 16px;
  margin-bottom: 0;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 7px 1px #eee;
  overflow-wrap: break-word;
`;
const Title = styled.h2`
  margin: 0;
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

const Subtitle = styled.h3`
  margin: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

const MainPoint = styled.div`
  font-size: 20px;
  color: #333;
`;

const Emphasis = styled.span`
  font-weight: bold;
`;

const SubPoint = styled.div`
  font-size: 16px;
  color: #555;
`;

export default Object.assign(Card, {
  Title,
  Subtitle,
  MainPoint,
  Emphasis,
  SubPoint,
});
