/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GithubProfile = {
  __typename: "GithubProfile",
  githubName: string,
  email: string,
  bearerToken: string,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type CreateGithubProfileInput = {
  githubName: string,
  email: string,
  bearerToken: string,
  id?: string | null,
};

export type ModelGithubProfileConditionInput = {
  githubName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  bearerToken?: ModelStringInput | null,
  and?: Array< ModelGithubProfileConditionInput | null > | null,
  or?: Array< ModelGithubProfileConditionInput | null > | null,
  not?: ModelGithubProfileConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateGithubProfileInput = {
  githubName?: string | null,
  email?: string | null,
  bearerToken?: string | null,
  id: string,
};

export type DeleteGithubProfileInput = {
  id: string,
};

export type CreateRepoStatsInput = {
  repoName: string,
  lastGeneratedBy: string,
  lastGeneratedAt: string,
  longestVariableNames: Array< string >,
  mostLinesFunctions: Array< FunctionLineLengthInput >,
  averageLinesFunction: number,
  numberOfFunctions: number,
  mostLinesFiles: Array< FileLineLengthInput >,
  numberOfFiles: number,
  numberOfLines: number,
  numberOfTopLevelStatements: number,
  numberOfImportDeclarations: number,
  numberOfExportDeclarations: number,
  mostUsedVariables: Array< VariableUsageInput >,
  numberOfAnonymousFunctions: number,
  numberOfFunctionsWithReturn: number,
  numberOfAsyncFunctions: number,
  numberOfStatements: StatementsInput,
  numberOfBinaryOperators: BinaryOperatorsInput,
  numberOfJSXElements: number,
  numberOfJSXAttributes: number,
  numberOfDivs: number,
};

export type FunctionLineLengthInput = {
  functionName: string,
  lineLength: number,
};

export type FileLineLengthInput = {
  fileName: string,
  lineLength: number,
};

export type VariableUsageInput = {
  variableName: string,
  timesUsed: number,
};

export type StatementsInput = {
  ifStatements: number,
  ifElseStatements: number,
  elseStatements: number,
  forStatements: number,
  forInStatements: number,
  forOfStatements: number,
  whileStatements: number,
  doWhileStatements: number,
  switchStatements: number,
  conditionalStatements: number,
};

export type BinaryOperatorsInput = {
  equalEqual: number,
  equalEqualEqual: number,
  lessThan: number,
  lessThanEqual: number,
  greaterThan: number,
  greaterThanEqual: number,
  notEqual: number,
  notEqualEqual: number,
  plus: number,
  minus: number,
  times: number,
  divide: number,
};

export type ModelRepoStatsConditionInput = {
  lastGeneratedBy?: ModelStringInput | null,
  lastGeneratedAt?: ModelStringInput | null,
  longestVariableNames?: ModelStringInput | null,
  averageLinesFunction?: ModelFloatInput | null,
  numberOfFunctions?: ModelIntInput | null,
  numberOfFiles?: ModelIntInput | null,
  numberOfLines?: ModelIntInput | null,
  numberOfTopLevelStatements?: ModelIntInput | null,
  numberOfImportDeclarations?: ModelIntInput | null,
  numberOfExportDeclarations?: ModelIntInput | null,
  numberOfAnonymousFunctions?: ModelIntInput | null,
  numberOfFunctionsWithReturn?: ModelIntInput | null,
  numberOfAsyncFunctions?: ModelIntInput | null,
  numberOfJSXElements?: ModelIntInput | null,
  numberOfJSXAttributes?: ModelIntInput | null,
  numberOfDivs?: ModelIntInput | null,
  and?: Array< ModelRepoStatsConditionInput | null > | null,
  or?: Array< ModelRepoStatsConditionInput | null > | null,
  not?: ModelRepoStatsConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type RepoStats = {
  __typename: "RepoStats",
  repoName: string,
  lastGeneratedBy: string,
  lastGeneratedAt: string,
  longestVariableNames: Array< string >,
  mostLinesFunctions:  Array<FunctionLineLength >,
  averageLinesFunction: number,
  numberOfFunctions: number,
  mostLinesFiles:  Array<FileLineLength >,
  numberOfFiles: number,
  numberOfLines: number,
  numberOfTopLevelStatements: number,
  numberOfImportDeclarations: number,
  numberOfExportDeclarations: number,
  mostUsedVariables:  Array<VariableUsage >,
  numberOfAnonymousFunctions: number,
  numberOfFunctionsWithReturn: number,
  numberOfAsyncFunctions: number,
  numberOfStatements: Statements,
  numberOfBinaryOperators: BinaryOperators,
  numberOfJSXElements: number,
  numberOfJSXAttributes: number,
  numberOfDivs: number,
  createdAt: string,
  updatedAt: string,
};

export type FunctionLineLength = {
  __typename: "FunctionLineLength",
  functionName: string,
  lineLength: number,
};

export type FileLineLength = {
  __typename: "FileLineLength",
  fileName: string,
  lineLength: number,
};

export type VariableUsage = {
  __typename: "VariableUsage",
  variableName: string,
  timesUsed: number,
};

export type Statements = {
  __typename: "Statements",
  ifStatements: number,
  ifElseStatements: number,
  elseStatements: number,
  forStatements: number,
  forInStatements: number,
  forOfStatements: number,
  whileStatements: number,
  doWhileStatements: number,
  switchStatements: number,
  conditionalStatements: number,
};

export type BinaryOperators = {
  __typename: "BinaryOperators",
  equalEqual: number,
  equalEqualEqual: number,
  lessThan: number,
  lessThanEqual: number,
  greaterThan: number,
  greaterThanEqual: number,
  notEqual: number,
  notEqualEqual: number,
  plus: number,
  minus: number,
  times: number,
  divide: number,
};

export type UpdateRepoStatsInput = {
  repoName: string,
  lastGeneratedBy?: string | null,
  lastGeneratedAt?: string | null,
  longestVariableNames?: Array< string > | null,
  mostLinesFunctions?: Array< FunctionLineLengthInput > | null,
  averageLinesFunction?: number | null,
  numberOfFunctions?: number | null,
  mostLinesFiles?: Array< FileLineLengthInput > | null,
  numberOfFiles?: number | null,
  numberOfLines?: number | null,
  numberOfTopLevelStatements?: number | null,
  numberOfImportDeclarations?: number | null,
  numberOfExportDeclarations?: number | null,
  mostUsedVariables?: Array< VariableUsageInput > | null,
  numberOfAnonymousFunctions?: number | null,
  numberOfFunctionsWithReturn?: number | null,
  numberOfAsyncFunctions?: number | null,
  numberOfStatements?: StatementsInput | null,
  numberOfBinaryOperators?: BinaryOperatorsInput | null,
  numberOfJSXElements?: number | null,
  numberOfJSXAttributes?: number | null,
  numberOfDivs?: number | null,
};

export type DeleteRepoStatsInput = {
  repoName: string,
};

export type ModelGithubProfileFilterInput = {
  githubName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  bearerToken?: ModelStringInput | null,
  and?: Array< ModelGithubProfileFilterInput | null > | null,
  or?: Array< ModelGithubProfileFilterInput | null > | null,
  not?: ModelGithubProfileFilterInput | null,
};

export type ModelGithubProfileConnection = {
  __typename: "ModelGithubProfileConnection",
  items:  Array<GithubProfile | null >,
  nextToken?: string | null,
};

export type ModelRepoStatsFilterInput = {
  repoName?: ModelStringInput | null,
  lastGeneratedBy?: ModelStringInput | null,
  lastGeneratedAt?: ModelStringInput | null,
  longestVariableNames?: ModelStringInput | null,
  averageLinesFunction?: ModelFloatInput | null,
  numberOfFunctions?: ModelIntInput | null,
  numberOfFiles?: ModelIntInput | null,
  numberOfLines?: ModelIntInput | null,
  numberOfTopLevelStatements?: ModelIntInput | null,
  numberOfImportDeclarations?: ModelIntInput | null,
  numberOfExportDeclarations?: ModelIntInput | null,
  numberOfAnonymousFunctions?: ModelIntInput | null,
  numberOfFunctionsWithReturn?: ModelIntInput | null,
  numberOfAsyncFunctions?: ModelIntInput | null,
  numberOfJSXElements?: ModelIntInput | null,
  numberOfJSXAttributes?: ModelIntInput | null,
  numberOfDivs?: ModelIntInput | null,
  and?: Array< ModelRepoStatsFilterInput | null > | null,
  or?: Array< ModelRepoStatsFilterInput | null > | null,
  not?: ModelRepoStatsFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelRepoStatsConnection = {
  __typename: "ModelRepoStatsConnection",
  items:  Array<RepoStats | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionGithubProfileFilterInput = {
  githubName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  bearerToken?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGithubProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionGithubProfileFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionRepoStatsFilterInput = {
  repoName?: ModelSubscriptionStringInput | null,
  lastGeneratedBy?: ModelSubscriptionStringInput | null,
  lastGeneratedAt?: ModelSubscriptionStringInput | null,
  longestVariableNames?: ModelSubscriptionStringInput | null,
  averageLinesFunction?: ModelSubscriptionFloatInput | null,
  numberOfFunctions?: ModelSubscriptionIntInput | null,
  numberOfFiles?: ModelSubscriptionIntInput | null,
  numberOfLines?: ModelSubscriptionIntInput | null,
  numberOfTopLevelStatements?: ModelSubscriptionIntInput | null,
  numberOfImportDeclarations?: ModelSubscriptionIntInput | null,
  numberOfExportDeclarations?: ModelSubscriptionIntInput | null,
  numberOfAnonymousFunctions?: ModelSubscriptionIntInput | null,
  numberOfFunctionsWithReturn?: ModelSubscriptionIntInput | null,
  numberOfAsyncFunctions?: ModelSubscriptionIntInput | null,
  numberOfJSXElements?: ModelSubscriptionIntInput | null,
  numberOfJSXAttributes?: ModelSubscriptionIntInput | null,
  numberOfDivs?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionRepoStatsFilterInput | null > | null,
  or?: Array< ModelSubscriptionRepoStatsFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type GithubOauthMutationVariables = {
  code: string,
};

export type GithubOauthMutation = {
  githubOauth?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGithubProfileMutationVariables = {
  input: CreateGithubProfileInput,
  condition?: ModelGithubProfileConditionInput | null,
};

export type CreateGithubProfileMutation = {
  createGithubProfile?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGithubProfileMutationVariables = {
  input: UpdateGithubProfileInput,
  condition?: ModelGithubProfileConditionInput | null,
};

export type UpdateGithubProfileMutation = {
  updateGithubProfile?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGithubProfileMutationVariables = {
  input: DeleteGithubProfileInput,
  condition?: ModelGithubProfileConditionInput | null,
};

export type DeleteGithubProfileMutation = {
  deleteGithubProfile?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRepoStatsMutationVariables = {
  input: CreateRepoStatsInput,
  condition?: ModelRepoStatsConditionInput | null,
};

export type CreateRepoStatsMutation = {
  createRepoStats?:  {
    __typename: "RepoStats",
    repoName: string,
    lastGeneratedBy: string,
    lastGeneratedAt: string,
    longestVariableNames: Array< string >,
    mostLinesFunctions:  Array< {
      __typename: "FunctionLineLength",
      functionName: string,
      lineLength: number,
    } >,
    averageLinesFunction: number,
    numberOfFunctions: number,
    mostLinesFiles:  Array< {
      __typename: "FileLineLength",
      fileName: string,
      lineLength: number,
    } >,
    numberOfFiles: number,
    numberOfLines: number,
    numberOfTopLevelStatements: number,
    numberOfImportDeclarations: number,
    numberOfExportDeclarations: number,
    mostUsedVariables:  Array< {
      __typename: "VariableUsage",
      variableName: string,
      timesUsed: number,
    } >,
    numberOfAnonymousFunctions: number,
    numberOfFunctionsWithReturn: number,
    numberOfAsyncFunctions: number,
    numberOfStatements:  {
      __typename: "Statements",
      ifStatements: number,
      ifElseStatements: number,
      elseStatements: number,
      forStatements: number,
      forInStatements: number,
      forOfStatements: number,
      whileStatements: number,
      doWhileStatements: number,
      switchStatements: number,
      conditionalStatements: number,
    },
    numberOfBinaryOperators:  {
      __typename: "BinaryOperators",
      equalEqual: number,
      equalEqualEqual: number,
      lessThan: number,
      lessThanEqual: number,
      greaterThan: number,
      greaterThanEqual: number,
      notEqual: number,
      notEqualEqual: number,
      plus: number,
      minus: number,
      times: number,
      divide: number,
    },
    numberOfJSXElements: number,
    numberOfJSXAttributes: number,
    numberOfDivs: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRepoStatsMutationVariables = {
  input: UpdateRepoStatsInput,
  condition?: ModelRepoStatsConditionInput | null,
};

export type UpdateRepoStatsMutation = {
  updateRepoStats?:  {
    __typename: "RepoStats",
    repoName: string,
    lastGeneratedBy: string,
    lastGeneratedAt: string,
    longestVariableNames: Array< string >,
    mostLinesFunctions:  Array< {
      __typename: "FunctionLineLength",
      functionName: string,
      lineLength: number,
    } >,
    averageLinesFunction: number,
    numberOfFunctions: number,
    mostLinesFiles:  Array< {
      __typename: "FileLineLength",
      fileName: string,
      lineLength: number,
    } >,
    numberOfFiles: number,
    numberOfLines: number,
    numberOfTopLevelStatements: number,
    numberOfImportDeclarations: number,
    numberOfExportDeclarations: number,
    mostUsedVariables:  Array< {
      __typename: "VariableUsage",
      variableName: string,
      timesUsed: number,
    } >,
    numberOfAnonymousFunctions: number,
    numberOfFunctionsWithReturn: number,
    numberOfAsyncFunctions: number,
    numberOfStatements:  {
      __typename: "Statements",
      ifStatements: number,
      ifElseStatements: number,
      elseStatements: number,
      forStatements: number,
      forInStatements: number,
      forOfStatements: number,
      whileStatements: number,
      doWhileStatements: number,
      switchStatements: number,
      conditionalStatements: number,
    },
    numberOfBinaryOperators:  {
      __typename: "BinaryOperators",
      equalEqual: number,
      equalEqualEqual: number,
      lessThan: number,
      lessThanEqual: number,
      greaterThan: number,
      greaterThanEqual: number,
      notEqual: number,
      notEqualEqual: number,
      plus: number,
      minus: number,
      times: number,
      divide: number,
    },
    numberOfJSXElements: number,
    numberOfJSXAttributes: number,
    numberOfDivs: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRepoStatsMutationVariables = {
  input: DeleteRepoStatsInput,
  condition?: ModelRepoStatsConditionInput | null,
};

export type DeleteRepoStatsMutation = {
  deleteRepoStats?:  {
    __typename: "RepoStats",
    repoName: string,
    lastGeneratedBy: string,
    lastGeneratedAt: string,
    longestVariableNames: Array< string >,
    mostLinesFunctions:  Array< {
      __typename: "FunctionLineLength",
      functionName: string,
      lineLength: number,
    } >,
    averageLinesFunction: number,
    numberOfFunctions: number,
    mostLinesFiles:  Array< {
      __typename: "FileLineLength",
      fileName: string,
      lineLength: number,
    } >,
    numberOfFiles: number,
    numberOfLines: number,
    numberOfTopLevelStatements: number,
    numberOfImportDeclarations: number,
    numberOfExportDeclarations: number,
    mostUsedVariables:  Array< {
      __typename: "VariableUsage",
      variableName: string,
      timesUsed: number,
    } >,
    numberOfAnonymousFunctions: number,
    numberOfFunctionsWithReturn: number,
    numberOfAsyncFunctions: number,
    numberOfStatements:  {
      __typename: "Statements",
      ifStatements: number,
      ifElseStatements: number,
      elseStatements: number,
      forStatements: number,
      forInStatements: number,
      forOfStatements: number,
      whileStatements: number,
      doWhileStatements: number,
      switchStatements: number,
      conditionalStatements: number,
    },
    numberOfBinaryOperators:  {
      __typename: "BinaryOperators",
      equalEqual: number,
      equalEqualEqual: number,
      lessThan: number,
      lessThanEqual: number,
      greaterThan: number,
      greaterThanEqual: number,
      notEqual: number,
      notEqualEqual: number,
      plus: number,
      minus: number,
      times: number,
      divide: number,
    },
    numberOfJSXElements: number,
    numberOfJSXAttributes: number,
    numberOfDivs: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetGithubProfileQueryVariables = {
  id: string,
};

export type GetGithubProfileQuery = {
  getGithubProfile?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGithubProfilesQueryVariables = {
  filter?: ModelGithubProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGithubProfilesQuery = {
  listGithubProfiles?:  {
    __typename: "ModelGithubProfileConnection",
    items:  Array< {
      __typename: "GithubProfile",
      githubName: string,
      email: string,
      bearerToken: string,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRepoStatsQueryVariables = {
  repoName: string,
};

export type GetRepoStatsQuery = {
  getRepoStats?:  {
    __typename: "RepoStats",
    repoName: string,
    lastGeneratedBy: string,
    lastGeneratedAt: string,
    longestVariableNames: Array< string >,
    mostLinesFunctions:  Array< {
      __typename: "FunctionLineLength",
      functionName: string,
      lineLength: number,
    } >,
    averageLinesFunction: number,
    numberOfFunctions: number,
    mostLinesFiles:  Array< {
      __typename: "FileLineLength",
      fileName: string,
      lineLength: number,
    } >,
    numberOfFiles: number,
    numberOfLines: number,
    numberOfTopLevelStatements: number,
    numberOfImportDeclarations: number,
    numberOfExportDeclarations: number,
    mostUsedVariables:  Array< {
      __typename: "VariableUsage",
      variableName: string,
      timesUsed: number,
    } >,
    numberOfAnonymousFunctions: number,
    numberOfFunctionsWithReturn: number,
    numberOfAsyncFunctions: number,
    numberOfStatements:  {
      __typename: "Statements",
      ifStatements: number,
      ifElseStatements: number,
      elseStatements: number,
      forStatements: number,
      forInStatements: number,
      forOfStatements: number,
      whileStatements: number,
      doWhileStatements: number,
      switchStatements: number,
      conditionalStatements: number,
    },
    numberOfBinaryOperators:  {
      __typename: "BinaryOperators",
      equalEqual: number,
      equalEqualEqual: number,
      lessThan: number,
      lessThanEqual: number,
      greaterThan: number,
      greaterThanEqual: number,
      notEqual: number,
      notEqualEqual: number,
      plus: number,
      minus: number,
      times: number,
      divide: number,
    },
    numberOfJSXElements: number,
    numberOfJSXAttributes: number,
    numberOfDivs: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRepoStatsQueryVariables = {
  repoName?: string | null,
  filter?: ModelRepoStatsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRepoStatsQuery = {
  listRepoStats?:  {
    __typename: "ModelRepoStatsConnection",
    items:  Array< {
      __typename: "RepoStats",
      repoName: string,
      lastGeneratedBy: string,
      lastGeneratedAt: string,
      longestVariableNames: Array< string >,
      mostLinesFunctions:  Array< {
        __typename: "FunctionLineLength",
        functionName: string,
        lineLength: number,
      } >,
      averageLinesFunction: number,
      numberOfFunctions: number,
      mostLinesFiles:  Array< {
        __typename: "FileLineLength",
        fileName: string,
        lineLength: number,
      } >,
      numberOfFiles: number,
      numberOfLines: number,
      numberOfTopLevelStatements: number,
      numberOfImportDeclarations: number,
      numberOfExportDeclarations: number,
      mostUsedVariables:  Array< {
        __typename: "VariableUsage",
        variableName: string,
        timesUsed: number,
      } >,
      numberOfAnonymousFunctions: number,
      numberOfFunctionsWithReturn: number,
      numberOfAsyncFunctions: number,
      numberOfStatements:  {
        __typename: "Statements",
        ifStatements: number,
        ifElseStatements: number,
        elseStatements: number,
        forStatements: number,
        forInStatements: number,
        forOfStatements: number,
        whileStatements: number,
        doWhileStatements: number,
        switchStatements: number,
        conditionalStatements: number,
      },
      numberOfBinaryOperators:  {
        __typename: "BinaryOperators",
        equalEqual: number,
        equalEqualEqual: number,
        lessThan: number,
        lessThanEqual: number,
        greaterThan: number,
        greaterThanEqual: number,
        notEqual: number,
        notEqualEqual: number,
        plus: number,
        minus: number,
        times: number,
        divide: number,
      },
      numberOfJSXElements: number,
      numberOfJSXAttributes: number,
      numberOfDivs: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateGithubProfileSubscriptionVariables = {
  filter?: ModelSubscriptionGithubProfileFilterInput | null,
};

export type OnCreateGithubProfileSubscription = {
  onCreateGithubProfile?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGithubProfileSubscriptionVariables = {
  filter?: ModelSubscriptionGithubProfileFilterInput | null,
};

export type OnUpdateGithubProfileSubscription = {
  onUpdateGithubProfile?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGithubProfileSubscriptionVariables = {
  filter?: ModelSubscriptionGithubProfileFilterInput | null,
};

export type OnDeleteGithubProfileSubscription = {
  onDeleteGithubProfile?:  {
    __typename: "GithubProfile",
    githubName: string,
    email: string,
    bearerToken: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRepoStatsSubscriptionVariables = {
  filter?: ModelSubscriptionRepoStatsFilterInput | null,
};

export type OnCreateRepoStatsSubscription = {
  onCreateRepoStats?:  {
    __typename: "RepoStats",
    repoName: string,
    lastGeneratedBy: string,
    lastGeneratedAt: string,
    longestVariableNames: Array< string >,
    mostLinesFunctions:  Array< {
      __typename: "FunctionLineLength",
      functionName: string,
      lineLength: number,
    } >,
    averageLinesFunction: number,
    numberOfFunctions: number,
    mostLinesFiles:  Array< {
      __typename: "FileLineLength",
      fileName: string,
      lineLength: number,
    } >,
    numberOfFiles: number,
    numberOfLines: number,
    numberOfTopLevelStatements: number,
    numberOfImportDeclarations: number,
    numberOfExportDeclarations: number,
    mostUsedVariables:  Array< {
      __typename: "VariableUsage",
      variableName: string,
      timesUsed: number,
    } >,
    numberOfAnonymousFunctions: number,
    numberOfFunctionsWithReturn: number,
    numberOfAsyncFunctions: number,
    numberOfStatements:  {
      __typename: "Statements",
      ifStatements: number,
      ifElseStatements: number,
      elseStatements: number,
      forStatements: number,
      forInStatements: number,
      forOfStatements: number,
      whileStatements: number,
      doWhileStatements: number,
      switchStatements: number,
      conditionalStatements: number,
    },
    numberOfBinaryOperators:  {
      __typename: "BinaryOperators",
      equalEqual: number,
      equalEqualEqual: number,
      lessThan: number,
      lessThanEqual: number,
      greaterThan: number,
      greaterThanEqual: number,
      notEqual: number,
      notEqualEqual: number,
      plus: number,
      minus: number,
      times: number,
      divide: number,
    },
    numberOfJSXElements: number,
    numberOfJSXAttributes: number,
    numberOfDivs: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRepoStatsSubscriptionVariables = {
  filter?: ModelSubscriptionRepoStatsFilterInput | null,
};

export type OnUpdateRepoStatsSubscription = {
  onUpdateRepoStats?:  {
    __typename: "RepoStats",
    repoName: string,
    lastGeneratedBy: string,
    lastGeneratedAt: string,
    longestVariableNames: Array< string >,
    mostLinesFunctions:  Array< {
      __typename: "FunctionLineLength",
      functionName: string,
      lineLength: number,
    } >,
    averageLinesFunction: number,
    numberOfFunctions: number,
    mostLinesFiles:  Array< {
      __typename: "FileLineLength",
      fileName: string,
      lineLength: number,
    } >,
    numberOfFiles: number,
    numberOfLines: number,
    numberOfTopLevelStatements: number,
    numberOfImportDeclarations: number,
    numberOfExportDeclarations: number,
    mostUsedVariables:  Array< {
      __typename: "VariableUsage",
      variableName: string,
      timesUsed: number,
    } >,
    numberOfAnonymousFunctions: number,
    numberOfFunctionsWithReturn: number,
    numberOfAsyncFunctions: number,
    numberOfStatements:  {
      __typename: "Statements",
      ifStatements: number,
      ifElseStatements: number,
      elseStatements: number,
      forStatements: number,
      forInStatements: number,
      forOfStatements: number,
      whileStatements: number,
      doWhileStatements: number,
      switchStatements: number,
      conditionalStatements: number,
    },
    numberOfBinaryOperators:  {
      __typename: "BinaryOperators",
      equalEqual: number,
      equalEqualEqual: number,
      lessThan: number,
      lessThanEqual: number,
      greaterThan: number,
      greaterThanEqual: number,
      notEqual: number,
      notEqualEqual: number,
      plus: number,
      minus: number,
      times: number,
      divide: number,
    },
    numberOfJSXElements: number,
    numberOfJSXAttributes: number,
    numberOfDivs: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRepoStatsSubscriptionVariables = {
  filter?: ModelSubscriptionRepoStatsFilterInput | null,
};

export type OnDeleteRepoStatsSubscription = {
  onDeleteRepoStats?:  {
    __typename: "RepoStats",
    repoName: string,
    lastGeneratedBy: string,
    lastGeneratedAt: string,
    longestVariableNames: Array< string >,
    mostLinesFunctions:  Array< {
      __typename: "FunctionLineLength",
      functionName: string,
      lineLength: number,
    } >,
    averageLinesFunction: number,
    numberOfFunctions: number,
    mostLinesFiles:  Array< {
      __typename: "FileLineLength",
      fileName: string,
      lineLength: number,
    } >,
    numberOfFiles: number,
    numberOfLines: number,
    numberOfTopLevelStatements: number,
    numberOfImportDeclarations: number,
    numberOfExportDeclarations: number,
    mostUsedVariables:  Array< {
      __typename: "VariableUsage",
      variableName: string,
      timesUsed: number,
    } >,
    numberOfAnonymousFunctions: number,
    numberOfFunctionsWithReturn: number,
    numberOfAsyncFunctions: number,
    numberOfStatements:  {
      __typename: "Statements",
      ifStatements: number,
      ifElseStatements: number,
      elseStatements: number,
      forStatements: number,
      forInStatements: number,
      forOfStatements: number,
      whileStatements: number,
      doWhileStatements: number,
      switchStatements: number,
      conditionalStatements: number,
    },
    numberOfBinaryOperators:  {
      __typename: "BinaryOperators",
      equalEqual: number,
      equalEqualEqual: number,
      lessThan: number,
      lessThanEqual: number,
      greaterThan: number,
      greaterThanEqual: number,
      notEqual: number,
      notEqualEqual: number,
      plus: number,
      minus: number,
      times: number,
      divide: number,
    },
    numberOfJSXElements: number,
    numberOfJSXAttributes: number,
    numberOfDivs: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
