# Contributing

**The issue tracker is only for bug reports and enhancement suggestions.**

If you wish to contribute to the COVID Heroes codebase or documentation, feel free to fork the repository and submit a
pull request. We use Prettier to enforce a consistent coding style, so having that set up in your editor of choice
is a great boon to your development process.

## Setup

To get ready to work on the codebase, please do the following:

1. Fork & clone the repository, and make sure you're on the **master** branch
2. Run `yarn`
3. Configure .env variables by cloning the `.env.example` file and renaming to `.env`
4. Make your changes.
5. Run `yarn test`.
6. [Submit a pull request](https://github.com/camasscioly/covidheroes.net/compare)

## Pull Request Guidelines

- Checkout a topic branch from a base branch, e.g. `master`, and merge back against that branch.

- If adding a new feature:

  - Add an accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing a bug:

  - If you are resolving a special issue, add `fix/close #xxxx[,#xxxx]` (#xxxx is the issue id) in your PR body for a better release log, e.g.

  ```
  Handle routes correctly

  close #28
  ```

  - Provide a detailed description of the bug in the PR. Live demo preferred.

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

- Make sure tests pass!

- Commit messages must follow the [commit message convention](https://chris.beams.io/posts/git-commit/) so that changelogs can be automatically generated. Commit messages are automatically validated before commit.

- No need to worry about code style as long as you have installed the dev dependencies - modified files are automatically formatted with Prettier on save.
