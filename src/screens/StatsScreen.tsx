import React, { useState, useEffect, useMemo } from 'react';
import useGithubAPI from '../util/useGithubAPI';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import S from 'subsecond';
import TopBar from '../components/TopBar';
import chunkArray from '../util/chunkArray';
import { DateTime } from 'luxon';
import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import {
  CreateGithubProfileMutation,
  CreateGithubProfileMutationVariables,
  CreateRepoStatsInput,
  CreateRepoStatsMutation,
  CreateRepoStatsMutationVariables,
  GetRepoStatsQuery,
  GetRepoStatsQueryVariables,
  GithubOauthMutation,
  GithubOauthMutationVariables,
  UpdateRepoStatsMutation,
  UpdateRepoStatsMutationVariables,
} from '../API';
import { useMutation } from '@apollo/client';
import Card from '../ui/Card';
import { Helmet } from 'react-helmet-async';
import ActionButton from '../ui/ActionButton';
import github from '../assets/github.png';
import getOauthURL from '../util/getOauthURL';
import useQueryParams from '../util/useQueryParams';

const Page = styled.div`
  background-color: #f9f8f7;
`;

const Sections = styled.div`
  max-width: 736px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 48px;
`;

const Separator = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 16px 0;
`;

const Link = styled.a`
  text-decoration: none;

  color: #1368e3;
  margin-right: 12px;
`;

// and more comments for testing

const ALL_REPO_STATS_FIELDS = gql`
  fragment AllRepoStatsFields on RepoStats {
    repoName
    lastGeneratedBy
    lastGeneratedAt
    longestVariableNames
    mostLinesFunctions {
      functionName
      lineLength
    }
    averageLinesFunction
    numberOfFunctions
    mostLinesFiles {
      fileName
      lineLength
    }
    numberOfFiles
    numberOfLines
    numberOfTopLevelStatements
    numberOfImportDeclarations
    numberOfExportDeclarations
    mostUsedVariables {
      variableName
      timesUsed
    }
    numberOfAnonymousFunctions
    numberOfFunctionsWithReturn
    numberOfAsyncFunctions
    numberOfStatements {
      ifStatements
      ifElseStatements
      elseStatements
      forStatements
      forInStatements
      forOfStatements
      whileStatements
      doWhileStatements
      switchStatements
      conditionalStatements
    }
    numberOfBinaryOperators {
      equalEqual
      equalEqualEqual
      notEqual
      notEqualEqual
      lessThan
      lessThanEqual
      greaterThan
      greaterThanEqual
      plus
      minus
      times
      divide
    }
    numberOfJSXElements
    numberOfJSXAttributes
    numberOfDivs
  }
`;

const CREATE_REPO_STATS_MUTATION = gql`
  mutation StatsScreenCreateRepoStatsMutation($input: CreateRepoStatsInput!) {
    createRepoStats(input: $input) {
      repoName
      ...AllRepoStatsFields
    }
  }
  ${ALL_REPO_STATS_FIELDS}
` as TypedDocumentNode<
  CreateRepoStatsMutation,
  CreateRepoStatsMutationVariables
>;

const UPDATE_REPO_STATS_MUTATION = gql`
  mutation StatsScreenUpdateRepoStatsMutation($input: UpdateRepoStatsInput!) {
    updateRepoStats(input: $input) {
      repoName
      ...AllRepoStatsFields
    }
  }
  ${ALL_REPO_STATS_FIELDS}
` as TypedDocumentNode<
  UpdateRepoStatsMutation,
  UpdateRepoStatsMutationVariables
>;

const GITHUB_OAUTH_MUTATION = gql`
  mutation HomeScreenGithubOauthMutation($code: String!) {
    githubOauth(code: $code) {
      email
      githubName
      bearerToken
    }
  }
` as TypedDocumentNode<GithubOauthMutation, GithubOauthMutationVariables>;

// doing this as a side effect because I don't want to deal with dynamo api on lambda side
const CREATE_GITHUB_PROFILE_MUTATION = gql`
  mutation HomeScreenCreateGithubProfileMutation(
    $input: CreateGithubProfileInput!
  ) {
    createGithubProfile(input: $input) {
      email
      githubName
      bearerToken
    }
  }
` as TypedDocumentNode<
  CreateGithubProfileMutation,
  CreateGithubProfileMutationVariables
>;

const QUERY = gql`
  query StatsScreenQuery($repoName: String!) {
    getRepoStats(repoName: $repoName) {
      repoName
      ...AllRepoStatsFields
    }
  }
  ${ALL_REPO_STATS_FIELDS}
` as TypedDocumentNode<GetRepoStatsQuery, GetRepoStatsQueryVariables>;

export default function StatsScreen(): JSX.Element {
  const { code } = useQueryParams<{ code: string }>();
  const { userName, repoName } = useParams<{
    userName: string;
    repoName: string;
  }>();
  const navigate = useNavigate();

  const [repoStats, setRepoStats] = useState<CreateRepoStatsInput | null>(null);

  const { data: query, loading } = useQuery(QUERY, {
    variables: { repoName: `${userName}/${repoName}` },
  });
  const [createRepoStatsMutation] = useMutation(CREATE_REPO_STATS_MUTATION);
  const [updateRepoStatsMutation] = useMutation(UPDATE_REPO_STATS_MUTATION);
  const [githubOauthMutation] = useMutation(GITHUB_OAUTH_MUTATION);
  const [createGithubProfileMutation] = useMutation(
    CREATE_GITHUB_PROFILE_MUTATION
  );

  const [loadingMessage, setLoadingMessage] = useState<string | null>(
    'Attempting to get a cached copy of the stats.'
  );

  const [isGithubSignInNeeded, setIsGithubSignInNeeded] =
    useState<boolean>(false);
  const [shouldRegenerate, setShouldRegenerate] = useState<boolean>(false);

  const [repo] = useGithubAPI<{ default_branch: string }>(
    `/repos/${userName}/${repoName}`,
    {
      skip: userName == null || repoName == null,
    }
  );

  const defaultBranch = repo?.default_branch;

  const [tree] = useGithubAPI<{ tree: any; sha: string }>(
    `/repos/${userName}/${repoName}/git/trees/${defaultBranch}?recursive=true`,
    {
      skip: userName == null || repoName == null || defaultBranch == null,
    }
  );

  const files: { path: string; url: string }[] = useMemo(
    () => tree?.tree ?? [],
    [tree]
  );

  const githubName = useMemo(() => localStorage.getItem('githubName'), []);

  const isAuthorized = code != null;

  useEffect(() => {
    if (!isAuthorized) return;

    // okay we're back, now send the req
    (async () => {
      const result = await githubOauthMutation({ variables: { code } });
      if (result.data?.githubOauth == null) throw new Error('Oauth failed');
      const { githubOauth } = result.data;

      localStorage.setItem('bearerToken', githubOauth.bearerToken ?? '');
      localStorage.setItem('githubName', githubOauth.githubName ?? '');

      await createGithubProfileMutation({
        variables: {
          input: {
            bearerToken: githubOauth.bearerToken,
            email: githubOauth.email,
            githubName: githubOauth.githubName,
          },
        },
      });
      navigate(`/${userName}/${repoName}`);
      window.location.href = window.location.href;
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // don't regen if we don't need to
      if (loading) return;
      if (query?.getRepoStats != null && !shouldRegenerate) {
        setLoadingMessage(null);
        return;
      }

      const hasAlreadyBeenCreated = repoStats != null;
      setRepoStats(null);
      setShouldRegenerate(false);

      const fileContents: {
        path: string;
        content: string;
      }[] = [];

      // if we haven't loaded in the files yet, do it now
      const jsFiles = files.filter(
        (file) => file.path.match(/\.[jt]sx?$/) != null
      );

      // check to see if we can do this..
      if (githubName == null && (jsFiles.length === 0 || jsFiles.length > 40)) {
        setIsGithubSignInNeeded(true);
        return;
      }

      if (jsFiles.length === 0) return;

      const fileBunches = chunkArray(jsFiles, 10);
      const bearerToken = localStorage.getItem('bearerToken');

      for (const fileBunch of fileBunches) {
        await Promise.all(
          fileBunch.map(async (file) => {
            setLoadingMessage(`loading ${file.path}`);

            const response = await fetch(file.url, {
              headers: {
                ...(bearerToken != null && {
                  Authorization: `Bearer ${bearerToken}`,
                }),
                Accept: 'application/json',
              },
            });

            const fileContent = Buffer.from(
              (await response.json()).content,
              'base64'
            ).toString('utf8');

            fileContents.push({ path: file.path, content: fileContent });
          })
        );
      }

      setLoadingMessage(null);
      try {
        S.load(
          Object.fromEntries(
            fileContents.map((content) => [content.path, content.content])
          )
        );

        const programs = S('Program');

        const numberOfTopLevelStatements = programs.children().length;
        const numberOfFiles = programs.length;
        const numberOfLines = programs
          .map((p) => p.lines())
          .reduce((acc, lines) => acc + lines, 0);
        const mostLinesFiles = programs
          .map<{ fileName: string; lineLength: number }>((pg) => ({
            fileName: pg.fileName(),
            lineLength: pg.lines(),
          }))
          .sort((a, b) => b.lineLength - a.lineLength)
          .slice(0, 5);

        const numberOfImportDeclarations = S('ImportDeclaration').length;
        const numberOfExportDeclarations = S(
          'ExportDeclaration, ExportDefaultDeclaration'
        ).length;

        const variableNames = S('Identifier, JSXIdentifier').map(
          (iden) => iden.text().split(':')[0]
        );

        const longestVariableNames = [...new Set(variableNames)]
          .sort((a, b) => b.length - a.length)
          .slice(0, 5);

        const nameLookup: Record<string, number> = {};
        for (const name of variableNames) {
          // not null check because of overwriting stuff like 'toString'
          if (typeof nameLookup[name] !== 'number') nameLookup[name] = 1;
          else nameLookup[name]++;
        }

        // most used variable names
        const mostUsedVariables = Object.entries(nameLookup)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([variableName, timesUsed]) => ({ variableName, timesUsed }));

        const functions = S('FunctionDeclaration, ArrowFunctionExpression');

        const numberOfFunctions = functions.length;
        const averageLinesFunction =
          functions.map((fn) => fn.lines()).reduce((acc, fn) => acc + fn, 0) /
          numberOfFunctions;

        const functionsLines = functions.map<{
          functionName: string;
          lineLength: number;
        }>((fn) => ({
          functionName: fn.name().length === 0 ? '(anonymous)' : fn.name(),
          lineLength: fn.lines(),
        }));

        // longest functions
        const mostLinesFunctions = functionsLines
          .sort((a, b) => b.lineLength - a.lineLength)
          .slice(0, 5);

        const numberOfAnonymousFunctions = functions
          .map((fn) => fn.type() === 'ArrowFunctionExpression')
          .filter((n) => n).length;

        const numberOfAsyncFunctions = functions
          .map((fn) => fn.attr('async'))
          .filter((n) => n).length;

        const numberOfFunctionsWithReturn = functions
          .map(
            (fn) =>
              fn.children('BlockStatement').children('ReturnStatement').length
          )
          .filter((n) => n).length;

        const binaryOperators = S('BinaryExpression').map((be) =>
          be.attr('operator')
        );

        const operatorLookup: Record<string, number | undefined> = {};
        for (const op of binaryOperators) {
          if (operatorLookup[op] == null) operatorLookup[op] = 1;
          else operatorLookup[op] = (operatorLookup[op] ?? 0) + 1;
        }

        const ifs = S('IfStatement');
        const ifStatements = ifs.length;
        const ifElseStatements = ifs.filter(
          (f) => f.attr('alternate')?.type === 'IfStatement'
        ).length;
        const elseStatements = ifs.filter(
          (f) => f.attr('alternate')?.type === 'BlockStatement'
        ).length;
        const forStatements = S('ForStatement').length;
        const forInStatements = S('ForInStatement').length;
        const forOfStatements = S('ForOfStatement').length;
        const whileStatements = S('WhileStatement').length;
        const doWhileStatements = S('DoWhileStatement').length;
        const switchStatements = S('SwitchStatement').length;
        const conditionalStatements = S('ConditionalExpression').length;

        const numberOfJSXElements = S('JSXElement').length;
        const numberOfJSXAttributes = S('JSXAttribute').length;
        const numberOfDivs = S('JSXElement.div').length;

        const stats = {
          repoName: `${userName}/${repoName}`,
          lastGeneratedBy: githubName ?? '(unknown)',
          lastGeneratedAt: DateTime.now().toUTC().toISO(),
          longestVariableNames,
          mostLinesFunctions,
          averageLinesFunction,
          numberOfFunctions,
          mostLinesFiles,
          numberOfFiles,
          numberOfLines,
          numberOfTopLevelStatements,
          numberOfImportDeclarations,
          numberOfExportDeclarations,
          mostUsedVariables,
          numberOfAnonymousFunctions,
          numberOfFunctionsWithReturn,
          numberOfAsyncFunctions,
          numberOfStatements: {
            ifStatements,
            ifElseStatements,
            elseStatements,
            forStatements,
            forInStatements,
            forOfStatements,
            whileStatements,
            doWhileStatements,
            switchStatements,
            conditionalStatements,
          },
          numberOfBinaryOperators: {
            equalEqual: operatorLookup['=='] ?? 0,
            equalEqualEqual: operatorLookup['==='] ?? 0,
            notEqual: operatorLookup['!='] ?? 0,
            notEqualEqual: operatorLookup['!=='] ?? 0,
            lessThan: operatorLookup['<'] ?? 0,
            lessThanEqual: operatorLookup['<='] ?? 0,
            greaterThan: operatorLookup['>'] ?? 0,
            greaterThanEqual: operatorLookup['>='] ?? 0,
            plus: operatorLookup['+'] ?? 0,
            minus: operatorLookup['-'] ?? 0,
            times: operatorLookup['*'] ?? 0,
            divide: operatorLookup['/'] ?? 0,
          },
          numberOfJSXElements,
          numberOfJSXAttributes,
          numberOfDivs,
        };

        setRepoStats(stats);
        if (!hasAlreadyBeenCreated) {
          await createRepoStatsMutation({ variables: { input: stats } });
          return;
        }

        await updateRepoStatsMutation({ variables: { input: stats } });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [files, loading, shouldRegenerate]);

  const stats = repoStats ?? query?.getRepoStats;
  return (
    <Page>
      <Helmet prioritizeSeoTags>
        <title>
          {userName}/{repoName}: JS/TS Github repo code stats
        </title>
        <meta
          content={`Code stats for ${userName}/${repoName}. Stuff like longest variable name, how many if statements, and other things you probably wouldn't know otherwise.`}
          name="description"
        />
        <meta
          content={`${userName}/${repoName}: JS/TS Github repo code stats`}
          property="og:title"
        />
        <meta
          content="https://stats.subsecond.app/repo.png"
          property="og:image"
        />
        <meta
          content={`https://stats.subsecond.app/${userName}/${repoName}`}
          property="og:url"
        />
        <meta
          content={`Code stats for ${userName}/${repoName}. Stuff like longest variable name, how many if statements, and other things you probably wouldn't know otherwise.`}
          property="og:description"
        />
      </Helmet>
      <TopBar />
      {isGithubSignInNeeded ? (
        <Sections>
          <Card>
            <Card.MainPoint>
              Sorry, you're going to need to sign in with Github to get these
              stats.
            </Card.MainPoint>
            <Card.SubPoint>
              This is either because this repo is private, or you don't have
              enough unauthenticated github requests to download this entire
              repo. (Github only gives you 50 without signing in)
            </Card.SubPoint>
            {!isAuthorized ? (
              <ActionButton.Anchor
                href={getOauthURL(`${userName}/${repoName}`)}
                style={{ marginTop: '24px' }}
              >
                <ActionButton.Image src={github} />
                <div style={{ width: '100%' }}>Sign in with Github</div>
              </ActionButton.Anchor>
            ) : (
              <ActionButton disabled style={{ marginTop: '24px' }}>
                <ActionButton.Image src={github} />
                <div style={{ width: '100%' }}>Signing in, one sec...</div>
              </ActionButton>
            )}
          </Card>
        </Sections>
      ) : stats == null || loadingMessage != null ? (
        <Sections>
          <Card>
            <Card.MainPoint>
              Loading stats for{' '}
              <Card.Emphasis>
                {userName}/{repoName}
              </Card.Emphasis>
            </Card.MainPoint>
            <Card.SubPoint>
              Sorry, this might take a couple minutes.
            </Card.SubPoint>
            <Card.SubPoint>
              All of the computation is done locally on your computer because I
              didn't want to pay for servers.
            </Card.SubPoint>
            <Separator />
            <Card.MainPoint>{loadingMessage}</Card.MainPoint>
          </Card>
        </Sections>
      ) : (
        <Sections>
          <Card>
            <Card.MainPoint>
              Stats for <Card.Emphasis>{stats.repoName}</Card.Emphasis>
            </Card.MainPoint>
            <Card.SubPoint>
              These stats were generated{' '}
              {DateTime.fromISO(stats.lastGeneratedAt).toRelative()}.{' '}
              <button onClick={() => setShouldRegenerate(true)} type="button">
                Regenerate
              </button>
            </Card.SubPoint>
            <Card.SubPoint>
              Share link:{' '}
              <Link
                href={`https://stats.subsecond.app/${userName}/${repoName}`}
              >
                stats.subsecond.app/{userName}/{repoName}
              </Link>
            </Card.SubPoint>
          </Card>
          <Card>
            <Card.Title>First let's look at files</Card.Title>
            <Card.MainPoint>
              <Card.Emphasis>{stats.numberOfLines}</Card.Emphasis> lines of code
            </Card.MainPoint>
            <Card.MainPoint>
              across <Card.Emphasis>{stats.numberOfFiles}</Card.Emphasis> files.
            </Card.MainPoint>
            <Card.SubPoint>
              On average{' '}
              <Card.Emphasis>
                {Math.round(stats.numberOfLines / stats.numberOfFiles)}
              </Card.Emphasis>{' '}
              lines per file.
            </Card.SubPoint>
            <Separator />
            <Card.Subtitle>Here's the files with the most code:</Card.Subtitle>
            <Card.MainPoint>
              1. {stats.mostLinesFiles[0].fileName} &ndash;{' '}
              <Card.Emphasis>
                {stats.mostLinesFiles[0].lineLength}
              </Card.Emphasis>{' '}
              lines
            </Card.MainPoint>
            {stats.mostLinesFiles.slice(1).map((mostLinesFile, i) => (
              <Card.SubPoint>
                {i + 2}. {mostLinesFile.fileName} &ndash;{' '}
                <Card.Emphasis>{mostLinesFile.lineLength}</Card.Emphasis> lines
              </Card.SubPoint>
            ))}
          </Card>
          <Card>
            <Card.Title>Here's the longest variable names:</Card.Title>
            <Card.MainPoint>
              1. {stats.longestVariableNames[0]} &ndash;{' '}
              <Card.Emphasis>
                {stats.longestVariableNames[0].length}
              </Card.Emphasis>{' '}
              letters
            </Card.MainPoint>
            {stats.longestVariableNames
              .slice(1)
              .map((longestVariableName, i) => (
                <Card.SubPoint>
                  {i + 2}. {longestVariableName} &ndash;{' '}
                  <Card.Emphasis>{longestVariableName.length}</Card.Emphasis>{' '}
                  letters
                </Card.SubPoint>
              ))}
            <Separator />
            <Card.Subtitle>And the most used variables:</Card.Subtitle>
            <Card.MainPoint>
              1. {stats.mostUsedVariables[0].variableName} &ndash; used{' '}
              <Card.Emphasis>
                {stats.mostUsedVariables[0].timesUsed}
              </Card.Emphasis>{' '}
              times
            </Card.MainPoint>
            {stats.mostUsedVariables.slice(1).map((mostUsedVariable, i) => (
              <Card.SubPoint>
                {i + 2}. {mostUsedVariable.variableName} &ndash; used{' '}
                <Card.Emphasis>{mostUsedVariable.timesUsed}</Card.Emphasis>{' '}
                times
              </Card.SubPoint>
            ))}
          </Card>
          <Card>
            <Card.Title>Let's talk about functions</Card.Title>
            <Card.MainPoint>
              This codebase defines{' '}
              <Card.Emphasis>{stats.numberOfFunctions}</Card.Emphasis> different
              functions.
            </Card.MainPoint>
            <Separator />
            <Card.Subtitle>Of those functions:</Card.Subtitle>
            <Card.SubPoint>
              <Card.Emphasis>{stats.numberOfAnonymousFunctions}</Card.Emphasis>{' '}
              (
              {Math.round(
                100 *
                  (stats.numberOfAnonymousFunctions / stats.numberOfFunctions)
              )}
              %) are anonymous functions.
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>{stats.numberOfAsyncFunctions}</Card.Emphasis> (
              {Math.round(
                100 * (stats.numberOfAsyncFunctions / stats.numberOfFunctions)
              )}
              %) are async functions.
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>{stats.numberOfFunctionsWithReturn}</Card.Emphasis>{' '}
              (
              {Math.round(
                100 *
                  (stats.numberOfFunctionsWithReturn / stats.numberOfFunctions)
              )}
              %) have an explicit <code>return</code>.
            </Card.SubPoint>
            <Separator />
            <Card.Subtitle>These are the longest functions:</Card.Subtitle>
            <Card.MainPoint>
              1.{' '}
              {stats.mostLinesFunctions[0].functionName === '(anonymous)'
                ? '(anonymous)'
                : `${stats.mostLinesFunctions[0].functionName}()`}{' '}
              -{' '}
              <Card.Emphasis>
                {stats.mostLinesFunctions[0].lineLength}
              </Card.Emphasis>{' '}
              lines
            </Card.MainPoint>
            {stats.mostLinesFunctions.slice(1).map((mostLinesFunction, i) => (
              <Card.SubPoint>
                {i + 2}.{' '}
                {mostLinesFunction.functionName === '(anonymous)'
                  ? '(anonymous)'
                  : `${mostLinesFunction.functionName}()`}{' '}
                - <Card.Emphasis>{mostLinesFunction.lineLength}</Card.Emphasis>{' '}
                lines
              </Card.SubPoint>
            ))}
            <Card.SubPoint>
              The average function has{' '}
              <Card.Emphasis>
                {Math.round(stats.averageLinesFunction)}
              </Card.Emphasis>{' '}
              lines.
            </Card.SubPoint>
          </Card>
          <Card>
            <Card.Title>How about JSX elements?</Card.Title>
            {stats.numberOfJSXElements === 0 ? (
              <>
                <Card.MainPoint>
                  This project doesn't have any jsx tags in it, oops.
                </Card.MainPoint>
                <Card.SubPoint>
                  Thats a bit embarrasing for us, let's move on...
                </Card.SubPoint>
              </>
            ) : (
              <>
                <Card.MainPoint>
                  There are a total of{' '}
                  <Card.Emphasis>{stats.numberOfJSXElements}</Card.Emphasis> JSX
                  Elements in this project.
                </Card.MainPoint>
                <Card.MainPoint>
                  Along with{' '}
                  <Card.Emphasis>{stats.numberOfJSXAttributes}</Card.Emphasis>{' '}
                  JSX Attributes.
                </Card.MainPoint>
                <Card.SubPoint>
                  On average{' '}
                  <Card.Emphasis>
                    {(
                      stats.numberOfJSXAttributes / stats.numberOfJSXElements
                    ).toFixed(1)}
                  </Card.Emphasis>{' '}
                  attributes per element.
                </Card.SubPoint>
                <Separator />
                <Card.MainPoint>
                  Of those elements,{' '}
                  <Card.Emphasis>{stats.numberOfDivs}</Card.Emphasis> of them
                  are divs.
                </Card.MainPoint>
                <Card.SubPoint>
                  That makes{' '}
                  {Math.round(
                    100 * (stats.numberOfDivs / stats.numberOfJSXElements)
                  )}
                  % of all elements, I've seen worse...
                </Card.SubPoint>
              </>
            )}
          </Card>
          <Card>
            <Card.Title>What type of math are you up to?</Card.Title>
            <Card.SubPoint>
              <Card.Emphasis>+</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.plus}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>-</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.minus}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>*</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.times}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>/</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.divide}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Separator />
            <Card.Subtitle>What about comparasons?</Card.Subtitle>
            <Card.SubPoint>
              <Card.Emphasis>==</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.equalEqual}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>===</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.equalEqualEqual}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>!=</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.notEqual}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>!==</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.notEqualEqual}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>&gt;</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.greaterThan}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>&gt;=</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.greaterThanEqual}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>&lt;</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.lessThan}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
            <Card.SubPoint>
              <Card.Emphasis>&lt;=</Card.Emphasis> used{' '}
              <Card.Emphasis>
                {stats.numberOfBinaryOperators.lessThanEqual}
              </Card.Emphasis>{' '}
              times
            </Card.SubPoint>
          </Card>
          <Card>
            <Card.Title>Finally, statements</Card.Title>
            {Object.entries(stats.numberOfStatements)
              .filter((s) => s[0] !== '__typename')
              .sort((a, b) => b[1] - a[1])
              .map(([name, amount], i) =>
                i === 0 ? (
                  <Card.MainPoint>
                    1. {name.slice(0, -10)}: used{' '}
                    <Card.Emphasis>{amount}</Card.Emphasis> times
                  </Card.MainPoint>
                ) : (
                  <Card.SubPoint>
                    {i + 1}. {name.slice(0, -10)}: used{' '}
                    <Card.Emphasis>{amount}</Card.Emphasis> times
                  </Card.SubPoint>
                )
              )}
            <Separator />
            {stats.numberOfImportDeclarations !== 0 && (
              <>
                <Card.MainPoint>
                  A grand total of{' '}
                  <Card.Emphasis>
                    {stats.numberOfImportDeclarations}
                  </Card.Emphasis>{' '}
                  import statements.
                </Card.MainPoint>
                <Card.SubPoint>
                  Averaging{' '}
                  <Card.Emphasis>
                    {(
                      stats.numberOfImportDeclarations / stats.numberOfFiles
                    ).toFixed(1)}
                  </Card.Emphasis>{' '}
                  imports per file.
                </Card.SubPoint>
              </>
            )}
          </Card>
        </Sections>
      )}
    </Page>
  );
}
