# ScrollX UI Contribution Guide

Thank you for your interest in contributing to **ScrollX UI**! Follow the steps below to set up the project and start contributing.

## ⭐ Star & Fork the Repository

1. **Star** this repository to show your support.
2. **Fork** the repository to create a copy under your GitHub account.

## 📝 Open an Issue

Before making any contributions, **open an issue** describing the feature or bug fix you want to work on.

- Clearly explain your idea or problem.
- Wait for approval from the maintainers before proceeding.

## 📥 Clone the Repository

After forking, clone the repository to your local machine:

```sh
git clone https://github.com/your-username/ScrollX-UI.git
```

Alternatively, you can create a **GitHub Codespace** from your forked repository.

## ⚙️ Install Dependencies

Ensure you have **pnpm** installed on your system. If not, install it first:

```sh
npm install -g pnpm
```

then in powershell run

```sh
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

Then, navigate to the project directory and install dependencies

```sh
cd ScrollX-UI
pnpm install
```

## 🚀 Run the Project

To start the development server and preview the website in your browser, use:

```sh
pnpm dev
```

To stop the server, press **Ctrl + C**

https://github.com/user-attachments/assets/48c9346f-2638-4fc7-9fab-e216df4913cc

## 🛠️ Creating a Contribution Branch

Before making any changes, create a new **branch**:
Use an appropriate naming convention for your **branch**

## Branch Naming

When creating branches for your contributions, please follow the following naming convention:

`feat/<feature-name>`

For example, if you are working on a feature related to adding a new component, your branch name could be `feat/add-new-component`. This naming convention helps us to easily track and associate contributions with their respective features.

```sh
git checkout -b feat/<your-branch-name>
```

## 📂 Adding Your Contributions

All contributions must be made as React components in the src/components/ui/ directory &
src\content\docs\components

## 📤 Commit & Push Changes

After adding your files, **stage** and **commit** them:

```sh
git add .
```

```sh
git commit -m "feat: Added Text Split Effect"
```

Push your branch to **GitHub**:

```sh
git push origin your-branch-name
```

## 🔄 Create a Pull Request

**1.** Go to your forked repository on GitHub.

**2.** Click on the **Compare & pull request** button.

**3.** Provide a **clear description** of your contribution.

**4.** Submit the pull request for **review**.

## Once approved, your changes will be merged into the main repository.

## 🎉 Thank You!

We appreciate your contributions to **ScrollX UI**. Happy coding! **🚀**
