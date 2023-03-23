import React, { useState } from 'react';
import { gql, TypedDocumentNode, useQuery } from '@apollo/client';
import { ListRepoStatsQuery, ListRepoStatsQueryVariables } from '../API';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import rocket from '../assets/rocket.png';
import TopBar from '../components/TopBar';
import Card from '../ui/Card';
import isNotNullish from '../util/isNotNullish';

const Container = styled.div`
  background-color: #f9f8f7;
`;

const Link = styled.a`
  text-decoration: none;

  color: #1368e3;
  margin-right: 12px;
`;

const Sections = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding-bottom: 52px;
`;

const Section = styled.div`
  margin: 32px 16px;
`;

const Title = styled.div`
  font-size: 52px;
  color: #222;
`;

const Subtitle = styled.div`
  font-size: 28px;
  color: #4e4554;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 24px;
  margin-bottom: 24px;
`;

const ActionButton = styled.button`
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

const ButtonImage = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;

const TextInputLabel = styled.label`
  color: #333;
  font-size: 16px;
`;

const TextInput = styled.input`
  width: calc(100% - 32px);
  padding: 8px 16px;

  font-size: 24px;
  color: #4e4554;

  outline: none;
  border: 1px solid #ddd;
  border-radius: 4px;

  :focus {
    box-shadow: 0px 1px 5px 1px #ddd;
  }
`;

const TextInputSection = styled.div`
  margin-top: 48px;
  margin-bottom: 24px;
`;

const HorizontalRule = styled.div`
  border-bottom: 2px solid #ddd;
  margin: 48px;
`;

const TextBlock = styled.div`
  font-size: 18px;
  line-height: 1.8em;
  color: #222;
`;

const Header = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: #222;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const QUERY = gql`
  query HomeScreenQuery {
    listRepoStats(limit: 10) {
      items {
        repoName
        lastGeneratedAt
        numberOfFiles
        numberOfLines
      }
    }
  }
` as TypedDocumentNode<ListRepoStatsQuery, ListRepoStatsQueryVariables>;

export default function HomeScreen(): JSX.Element {
  const navigate = useNavigate();
  const [selectedRepo, setSelectedRepo] = useState<string>('');

  const { data: query } = useQuery(QUERY);

  // testing something pls ignore
  return (
    <Container>
      <TopBar />
      <Sections>
        <Section>
          <Title>JS/TS code stats</Title>
          <Subtitle>
            Some stuff about your javascript code you probably didn't already
            know.
          </Subtitle>
          <TextInputSection>
            <TextInputLabel>
              Github repo:
              <TextInput
                onChange={(e) => setSelectedRepo(e.target.value)}
                placeholder="https://github.com/facebook/react OR facebook/react"
                type="text"
                value={selectedRepo}
              />
            </TextInputLabel>
          </TextInputSection>
          <ActionButtons>
            <ActionButton
              disabled={selectedRepo.split('/').length <= 1}
              onClick={() =>
                navigate('/' + selectedRepo.split('/').slice(-2).join('/'))
              }
              type="button"
            >
              <ButtonImage src={rocket} />{' '}
              <div style={{ width: '100%' }}>Go!</div>
            </ActionButton>
          </ActionButtons>
        </Section>
        <HorizontalRule />
        <Section>
          <Header>Recently viewed repositories</Header>
          {query?.listRepoStats?.items == null ? (
            <Card>
              <Card.MainPoint>loading</Card.MainPoint>
            </Card>
          ) : (
            <>
              {query.listRepoStats.items.filter(isNotNullish).map((repo) => (
                <Card
                  onClick={() => navigate(`/${repo.repoName}`)}
                  style={{
                    cursor: 'pointer',
                    margin: '0',
                    marginBottom: '16px',
                  }}
                >
                  <Card.MainPoint>{repo.repoName}</Card.MainPoint>
                  <Card.SubPoint>
                    Files: <Card.Emphasis>{repo.numberOfFiles}</Card.Emphasis> |
                    Lines: <Card.Emphasis>{repo.numberOfLines}</Card.Emphasis>
                  </Card.SubPoint>
                  <Link href={`/${repo.repoName}`}>Go to page &gt;</Link>
                </Card>
              ))}
            </>
          )}
        </Section>
        <HorizontalRule />
        <Section>
          <Header>How does this work?</Header>
          <TextBlock>
            It uses the github API to download all javascript and typescript
            files in a repository one by one. Then it runs some static analysis
            code locally across all of that code it downloaded. The results are
            cached so that much computation only has to happen once. This could
            be done much more efficiently by cloning a git repo in a container
            and running static analysis off of that code with fs access, but
            that would require servers and I didn't want to pay for any servers.
          </TextBlock>
        </Section>
        <Section>
          <Header>Why is it asking me to sign in?</Header>
          <TextBlock>
            Github only provides 50 requests to unauthenticated users. Once you
            run out of those you can connect your github account with oauth to
            get another 5000 requests. This app only ever reads files from your
            repositories. If you tell it to, the app is able to grab files from
            private repos on your authenticated account. The stats that are
            stored are just vague metadata so I can't imagine it being any sort
            of security risk.
          </TextBlock>
        </Section>
        <Section>
          <Header>Why only javascript/typescript?</Header>
          <TextBlock>
            That's what the static analysis library I'm using has support for. I
            don't have any easy way to query other types of code. Feel free to
            fork this project and make your own version for ruby or whatever,
            that would be cool.
          </TextBlock>
        </Section>
        <Section>
          <Header>Why don't you have [x] statistic?</Header>
          <TextBlock>
            The ones that I chose are the intersection between easy to compute
            with static analysis tools and interesting enough to make me say,
            'huh, kinda cool'. If you want something else,{' '}
            <a href="https://github.com/Subsecond-LLC/repo-stats/issues">
              add a github issue
            </a>
            .
          </TextBlock>
        </Section>

        <Section>
          <Header>Why does this exist?</Header>
          <TextBlock>
            Mainly, I wanted to practice using{' '}
            <a
              href="https://github.com/Subsecond-LLC/Subsecond"
              rel="noreferrer"
              target="_blank"
            >
              Subsecond
            </a>
            , a static analysis and codemod library. I think it will also be
            cool to collect a bunch of stats about different repositories, then
            eventually do a larger analysis over all repos cached by this
            project. I'll link that here if I ever end up making that.
          </TextBlock>
        </Section>
      </Sections>
    </Container>
  );
}
