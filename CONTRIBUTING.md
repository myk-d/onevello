# Contributing to OneVello

Thank you for your interest in contributing to OneVello! To maintain code quality and ensure the security of our users' data, we ask that you follow these guidelines.

---

## Git Workflow Rules

### Branch Naming Rules

Always create your feature or bugfix branch from the `development` branch. Use your initials, the GitHub Issue ID (Task Identifier), and a short description.

**Format**: `initials/issueNumber-description`  
**Example**: `md/142-add-purple-theme`

### Commit Naming Rules

We enforce the **Conventional Commits** format. Please write clear, informative messages.

**Format**: `type: description`  
**Types**:

- `feat`: A new feature (e.g., adding a new color theme)
- `fix`: A bug fix (e.g., fixing alignment in the datetime picker)
- `docs`: Documentation-only changes (e.g., updating README)
- `style`: Code style updates (formatting, missing semi-colons, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or updating tests
- `chore`: Other changes (e.g., build process, updating dependencies)

**Examples**:

- `feat: add purple and red themes to switcher`
- `fix: prevent layout shift on input error state`

_❌ Avoid uninformative messages like: "fix stuff", "update code", "misc changes"._

### Pull Request Naming Rules

When your changes are ready, open a PR **only against the `development` branch**.

**Format**: `#IssueId: Short Description`  
**Example**: `#142: Implement multi-theme selection system`

---

## Development Workflow Step-by-Step

1. **Clone & Setup**: Clone the repository, create your local `.env.local` file based on `.env.example`, and fill in your Firebase development credentials.
2. **Branch out**: Create a branch from `development` using the naming rules above.
3. **Make your changes**:
    - **Frontend Quality Checks**:
        - Verify responsiveness across mobile, tablet, and desktop views.
        - Check appearance and functionality in at least two browsers (e.g., Chrome, Firefox, or Safari).
4. **Clean up code**:
    - Remove any `console.log`, `debugger`, or commented-out code blocks before committing.
    - Ensure your code passes linting and formatting (Prettier/ESLint should run automatically on commit).
5. **Commit & Push**: Commit using the Conventional Commits format and push to your remote fork/repository.
6. **Open a Pull Request**:
    - Ensure the target branch is set to **`development`**.
    - Fill out the PR template, summarizing your work.
    - **Crucial for UI changes**: Attach screenshots or a short GIF showcasing the changes in both Light and Dark modes.
7. **Review**: Request a review from the repository maintainer. Address any feedback or comments provided.
8. **Merge**: Once approved, the repository maintainer will merge your PR into the `development` branch for testing before the next automated production release.

---

## Getting Started & Local Setup

To run OneVello locally, ensure you have the following prerequisites installed on your system.

### Prerequisites

- **Node.js**: Version 18.x or higher (LTS recommended)
- **Package Manager**: `npm` (comes with Node.js) or `yarn` / `pnpm`

---

### Step-by-Step Installation

#### 1. Clone the Repository

First, fork the repository and clone your fork locally:

```bash
git clone [https://github.com/myk-d/onevello](https://github.com/myk-d/onevello)
cd onevello

```

#### 2. Install Dependencies

Run the installation command to fetch all required NPM packages:

```bash
npm install
```

#### 3. Setup Environment Variables

Copy the provided environment example file to create your local config:

```bash
cp .env.example .env.local
```

Now, open the `.env.local` file and fill in your own Firebase project credentials for development testing (`development_messages` collection).

#### 4. Run the Development Server

Start the local Vite development server:

```bash
npm run dev
```

Once started, the application will be available at: **`http://localhost:5173`**

---

### Available Scripts

- `npm run dev` - Starts the development server with hot-reload.
- `npm run build` - Compiles and optimizes the application for production deployment.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs ESLint to check for code style issues.

---

## License and Contributor Grant

By contributing to OneVello, you agree that:

1. Your contributions will be licensed under the project's **GNU GPLv3 License**.
2. You grant the project owner (@myk-d) a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable license to use, reproduce, modify, display, and distribute your contributions under alternative commercial licenses for corporate or enterprise versions of OneVello.

This allows the project to remain free and open-source for the community while remaining viable for future commercial support and self-hosted enterprise deployment.

---

## Need Help?

If you encounter any issues during the setup, feel free to open a public GitHub Issue. If you suspect you have found a security vulnerability, please refer strictly to our [SECURITY.md](SECURITY.md) guidelines and do not post it publicly.
