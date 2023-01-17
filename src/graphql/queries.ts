/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGithubProfile = /* GraphQL */ `
  query GetGithubProfile($id: ID!) {
    getGithubProfile(id: $id) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const listGithubProfiles = /* GraphQL */ `
  query ListGithubProfiles(
    $filter: ModelGithubProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGithubProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        githubName
        email
        bearerToken
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRepoStats = /* GraphQL */ `
  query GetRepoStats($repoName: String!) {
    getRepoStats(repoName: $repoName) {
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
        lessThan
        lessThanEqual
        greaterThan
        greaterThanEqual
        notEqual
        notEqualEqual
        plus
        minus
        times
        divide
      }
      numberOfJSXElements
      numberOfJSXAttributes
      numberOfDivs
      createdAt
      updatedAt
    }
  }
`;
export const listRepoStats = /* GraphQL */ `
  query ListRepoStats(
    $repoName: String
    $filter: ModelRepoStatsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRepoStats(
      repoName: $repoName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          lessThan
          lessThanEqual
          greaterThan
          greaterThanEqual
          notEqual
          notEqualEqual
          plus
          minus
          times
          divide
        }
        numberOfJSXElements
        numberOfJSXAttributes
        numberOfDivs
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
