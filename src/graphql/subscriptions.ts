/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGithubProfile = /* GraphQL */ `
  subscription OnCreateGithubProfile(
    $filter: ModelSubscriptionGithubProfileFilterInput
  ) {
    onCreateGithubProfile(filter: $filter) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGithubProfile = /* GraphQL */ `
  subscription OnUpdateGithubProfile(
    $filter: ModelSubscriptionGithubProfileFilterInput
  ) {
    onUpdateGithubProfile(filter: $filter) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGithubProfile = /* GraphQL */ `
  subscription OnDeleteGithubProfile(
    $filter: ModelSubscriptionGithubProfileFilterInput
  ) {
    onDeleteGithubProfile(filter: $filter) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRepoStats = /* GraphQL */ `
  subscription OnCreateRepoStats(
    $filter: ModelSubscriptionRepoStatsFilterInput
  ) {
    onCreateRepoStats(filter: $filter) {
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
export const onUpdateRepoStats = /* GraphQL */ `
  subscription OnUpdateRepoStats(
    $filter: ModelSubscriptionRepoStatsFilterInput
  ) {
    onUpdateRepoStats(filter: $filter) {
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
export const onDeleteRepoStats = /* GraphQL */ `
  subscription OnDeleteRepoStats(
    $filter: ModelSubscriptionRepoStatsFilterInput
  ) {
    onDeleteRepoStats(filter: $filter) {
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
