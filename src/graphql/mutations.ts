/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const githubOauth = /* GraphQL */ `
  mutation GithubOauth($code: String!) {
    githubOauth(code: $code) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const createGithubProfile = /* GraphQL */ `
  mutation CreateGithubProfile(
    $input: CreateGithubProfileInput!
    $condition: ModelGithubProfileConditionInput
  ) {
    createGithubProfile(input: $input, condition: $condition) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateGithubProfile = /* GraphQL */ `
  mutation UpdateGithubProfile(
    $input: UpdateGithubProfileInput!
    $condition: ModelGithubProfileConditionInput
  ) {
    updateGithubProfile(input: $input, condition: $condition) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteGithubProfile = /* GraphQL */ `
  mutation DeleteGithubProfile(
    $input: DeleteGithubProfileInput!
    $condition: ModelGithubProfileConditionInput
  ) {
    deleteGithubProfile(input: $input, condition: $condition) {
      githubName
      email
      bearerToken
      id
      createdAt
      updatedAt
    }
  }
`;
export const createRepoStats = /* GraphQL */ `
  mutation CreateRepoStats(
    $input: CreateRepoStatsInput!
    $condition: ModelRepoStatsConditionInput
  ) {
    createRepoStats(input: $input, condition: $condition) {
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
export const updateRepoStats = /* GraphQL */ `
  mutation UpdateRepoStats(
    $input: UpdateRepoStatsInput!
    $condition: ModelRepoStatsConditionInput
  ) {
    updateRepoStats(input: $input, condition: $condition) {
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
export const deleteRepoStats = /* GraphQL */ `
  mutation DeleteRepoStats(
    $input: DeleteRepoStatsInput!
    $condition: ModelRepoStatsConditionInput
  ) {
    deleteRepoStats(input: $input, condition: $condition) {
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
